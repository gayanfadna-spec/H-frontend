import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiHeart, FiArrowRight } from 'react-icons/fi';
import ProductCard from '../components/ProductCard';
import useWishlistStore from '../store/useWishlistStore';
import SEOComponent from '../components/SEOComponent';

const Wishlist = () => {
  const wishlistItems = useWishlistStore((state) => state.wishlistItems);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="pt-8 pb-24 bg-[#F9F7F5] min-h-screen"
    >
      <SEOComponent 
        title="My Wishlist | ShopStore.lk" 
        description="View your saved fashion and lifestyle accessories. ShopStore.lk islandwide delivery in Sri Lanka." 
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        {/* Back Link */}
        <Link 
          to="/shop" 
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-stone-500 hover:text-[#C9A87C] transition-colors mb-6 font-semibold"
        >
          <FiArrowLeft size={14} /> Back to Collection
        </Link>
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-6 border-b border-stone-200">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C9A87C] block mb-1">
              Saved Pieces
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A1A]">
              Your Personal Wishlist
            </h1>
          </div>
          <span className="text-xs text-stone-500 mt-2 sm:mt-0 font-medium">
            {wishlistItems.length} {wishlistItems.length === 1 ? 'accessory' : 'accessories'} saved
          </span>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="bg-white p-12 sm:p-20 text-center rounded-3xl border border-stone-200/80 shadow-sm max-w-xl mx-auto">
            <div className="w-20 h-20 rounded-full bg-[#F9F7F5] border border-stone-200 flex items-center justify-center text-[#C9A87C] mx-auto mb-6">
              <FiHeart size={30} />
            </div>
            <h2 className="text-2xl font-extrabold text-[#1A1A1A] mb-3">Your Wishlist is Empty</h2>
            <p className="text-sm text-stone-500 font-light leading-relaxed mb-8 max-w-sm mx-auto">
              Tap the heart icon on any jewelry, watch, or bag while browsing to save it to your wishlist.
            </p>
            <Link 
              to="/shop" 
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#1A1A1A] hover:bg-[#C9A87C] text-white text-xs font-bold uppercase tracking-[0.16em] transition-all duration-300 shadow-md"
            >
              <span>Explore Collection</span>
              <FiArrowRight />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {wishlistItems.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

      </div>
    </motion.div>
  );
};

export default Wishlist;

