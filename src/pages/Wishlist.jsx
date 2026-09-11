import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import ProductCard from '../components/ProductCard';
import useWishlistStore from '../store/useWishlistStore';

const Wishlist = () => {
  const wishlistItems = useWishlistStore((state) => state.wishlistItems);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-24 pb-24 bg-premium-light min-h-screen"
    >
      <div className="container mx-auto px-6">
        <Link to="/shop" className="inline-flex items-center text-gray-500 hover:text-premium-accent transition-colors mb-8 uppercase tracking-widest text-sm font-semibold">
          <FiArrowLeft className="mr-2" /> Continue Shopping
        </Link>
        
        <h1 className="text-4xl font-bold mb-10 uppercase tracking-widest text-premium-dark border-b pb-4">
          Your Wishlist
        </h1>

        {wishlistItems.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-premium-dark mb-4">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-8">Save items you love here to easily find them later.</p>
            <Link to="/shop" className="bg-premium-dark text-white px-8 py-3 font-semibold tracking-wider hover:bg-premium-accent transition-colors uppercase">
              Explore Collection
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
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
