import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FiHeart, FiShoppingCart, FiEye } from 'react-icons/fi';
import useCartStore from '../store/useCartStore';
import useWishlistStore from '../store/useWishlistStore';
import toast from 'react-hot-toast';
import { getImageUrl } from '../utils/getImageUrl';

const ProductCard = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const addToWishlist = useWishlistStore((state) => state.addToWishlist);
  const wishlistItems = useWishlistStore((state) => state.wishlistItems);
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, 1);
    toast.success(`${product.name} added to cart`);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    const isAdded = addToWishlist(product);
    if (isAdded) {
      toast.success(`${product.name} added to wishlist`);
    } else {
      toast.success(`${product.name} removed from wishlist`);
    }
  };

  const isWishlisted = wishlistItems.some((item) => item._id === product._id);

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 relative border border-gray-100"
    >
      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {product.isNewArrival && <span className="bg-premium-dark text-white text-xs font-bold px-3 py-1 uppercase tracking-wider">New</span>}
        {product.originalPrice && product.originalPrice > product.price && (
          <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 uppercase tracking-wider">
            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
          </span>
        )}
      </div>

      {/* Image Container */}
      <div className="relative h-80 overflow-hidden bg-gray-100">
        <Link to={`/product/${product._id}`}>
          <img 
            src={getImageUrl(product.images[0])} 
            alt={product.name} 
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
          />
        </Link>
        
        {/* Quick Actions (Hover on Desktop, Always visible on mobile) */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-0 lg:translate-y-4 group-hover:translate-y-0 z-20">
          <button 
            onClick={handleWishlist}
            className={`p-3 rounded-full transition-colors shadow-lg backdrop-blur-sm ${isWishlisted ? 'bg-premium-accent text-white' : 'bg-white/90 lg:bg-white text-premium-dark hover:bg-premium-accent hover:text-white'}`} 
            title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
          >
            <FiHeart size={20} className={isWishlisted ? "fill-current" : ""} />
          </button>
          <button 
            onClick={handleAddToCart}
            className="bg-white/90 lg:bg-white p-3 rounded-full text-premium-dark hover:bg-premium-accent hover:text-white transition-colors shadow-lg backdrop-blur-sm" 
            title="Add to Cart"
          >
            <FiShoppingCart size={20} />
          </button>
          <Link to={`/product/${product._id}`} className="bg-white/90 lg:bg-white p-3 rounded-full text-premium-dark hover:bg-premium-accent hover:text-white transition-colors shadow-lg backdrop-blur-sm" title="Quick View">
            <FiEye size={20} />
          </Link>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 text-center">
        <p className="text-gray-500 text-sm uppercase tracking-widest mb-1">{product.brand}</p>
        <Link to={`/product/${product._id}`}>
          <h3 className="text-lg font-semibold text-premium-dark mb-1 hover:text-premium-accent transition-colors truncate">
            {product.name}
          </h3>
        </Link>
        <div className="flex justify-center items-center gap-3">
          <span className="text-xl font-bold text-premium-dark">LKR {product.price.toFixed(2)}</span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-sm text-gray-400 line-through">LKR {product.originalPrice.toFixed(2)}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
