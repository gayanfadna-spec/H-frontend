import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiHeart, FiShoppingBag, FiEye } from 'react-icons/fi';
import useCartStore from '../store/useCartStore';
import useWishlistStore from '../store/useWishlistStore';
import toast from 'react-hot-toast';
import { getImageUrl } from '../utils/getImageUrl';

const ProductCard = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const addToWishlist = useWishlistStore((state) => state.addToWishlist);
  const wishlistItems = useWishlistStore((state) => state.wishlistItems);
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  if (!product) return null;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    toast.success(`${product.name} added to your bag`, {
      style: {
        background: '#1A1A1A',
        color: '#F9F7F5',
        borderRadius: '12px',
        fontSize: '13px'
      },
      iconTheme: {
        primary: '#C9A87C',
        secondary: '#1A1A1A'
      }
    });
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const isAdded = addToWishlist(product);
    if (isAdded) {
      toast.success('Saved to your wishlist');
    } else {
      toast.success('Removed from your wishlist');
    }
  };

  const isWishlisted = wishlistItems.some((item) => item._id === product._id);
  const discountPercent = product.originalPrice && product.originalPrice > product.price 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  const primaryImage = product.images && product.images.length > 0 
    ? getImageUrl(product.images[0]) 
    : 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80';
  
  const secondaryImage = product.images && product.images.length > 1 
    ? getImageUrl(product.images[1]) 
    : primaryImage;

  return (
    <div 
      className="group relative bg-white rounded-2xl overflow-hidden border border-stone-200/70 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Badges */}
      <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5 pointer-events-none">
        {product.isNewArrival && (
          <span className="bg-[#1A1A1A] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest shadow-sm">
            New
          </span>
        )}
        {discountPercent > 0 && (
          <span className="bg-[#C9A87C] text-[#1A1A1A] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
            -{discountPercent}% OFF
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button 
        onClick={handleWishlist}
        className={`absolute top-3 right-3 z-20 p-2.5 rounded-full transition-all duration-300 shadow-sm ${
          isWishlisted 
            ? 'bg-[#C9A87C] text-white' 
            : 'bg-white/80 hover:bg-white text-stone-700 hover:text-[#C9A87C] backdrop-blur-sm'
        }`}
        title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        aria-label="Wishlist"
      >
        <FiHeart size={16} className={isWishlisted ? "fill-current" : ""} />
      </button>

      {/* Image Container with Soft Hover Zoom */}
      <Link to={`/product/${product._id}`} className="block relative aspect-[4/5] overflow-hidden bg-stone-100">
        <img 
          src={isHovered && secondaryImage ? secondaryImage : primaryImage} 
          alt={product.name} 
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Quick Add Overlay on Desktop */}
        <div className="hidden lg:flex absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/50 via-black/20 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out items-center gap-2">
          <button
            onClick={handleAddToCart}
            className="flex-1 py-2.5 bg-white hover:bg-[#1A1A1A] text-[#1A1A1A] hover:text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-2"
          >
            <FiShoppingBag size={14} /> Quick Add
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate(`/product/${product._id}`);
            }}
            className="p-2.5 bg-white/90 hover:bg-white text-stone-800 rounded-xl transition-colors shadow-md"
            title="View Details"
          >
            <FiEye size={15} />
          </button>
        </div>
      </Link>

      {/* Product Details */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-grow">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-500">
              {product.brand || 'ShopStore'}
            </span>
            {product.countInStock > 0 ? (
              <span className="flex items-center gap-1 text-[10px] font-medium text-emerald-600">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> In Stock
              </span>
            ) : (
              <span className="text-[10px] font-medium text-rose-500">Out of Stock</span>
            )}
          </div>

          <Link to={`/product/${product._id}`}>
            <h3 className="text-sm sm:text-base font-medium text-[#1A1A1A] hover:text-[#C9A87C] transition-colors line-clamp-1 mb-2">
              {product.name}
            </h3>
          </Link>
        </div>

        <div>
          {/* Price */}
          <div className="flex items-baseline gap-2 pt-2 border-t border-stone-100">
            <span className="text-base sm:text-lg font-bold text-[#1A1A1A]">
              LKR {Number(product.price).toLocaleString()}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-stone-400 line-through">
                LKR {Number(product.originalPrice).toLocaleString()}
              </span>
            )}
          </div>

          {/* Mobile Quick Add Button */}
          <button
            onClick={handleAddToCart}
            className="lg:hidden mt-3 w-full py-2 bg-stone-100 hover:bg-[#1A1A1A] hover:text-white text-[#1A1A1A] text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-1.5"
          >
            <FiShoppingBag size={13} /> Add to Bag
          </button>
        </div>
      </div>

    </div>
  );
};

export default ProductCard;

