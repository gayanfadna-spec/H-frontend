import { motion } from 'framer-motion';
import { useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import useProductStore from '../store/useProductStore';

const Shop = () => {
  const { products, loading, error, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-24 pb-12 bg-premium-light min-h-screen"
    >
      <div className="container mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 uppercase tracking-widest text-premium-dark text-center">
          The <span className="text-premium-accent italic">Collection</span>
        </h1>
        
        {/* Basic Filters (Placeholder for future) */}
        <div className="flex flex-wrap justify-between items-center mb-10 pb-6 border-b border-gray-200">
          <div className="flex space-x-4 mb-4 md:mb-0">
            <button className="text-premium-dark font-medium border-b-2 border-premium-accent pb-1">All</button>
            <button className="text-gray-500 hover:text-premium-dark transition-colors pb-1">Watches</button>
            <button className="text-gray-500 hover:text-premium-dark transition-colors pb-1">Jewelry</button>
            <button className="text-gray-500 hover:text-premium-dark transition-colors pb-1">Bags</button>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Sort By:</span>
            <select className="bg-transparent text-premium-dark outline-none font-medium text-sm cursor-pointer">
              <option>New Arrivals</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-premium-accent text-xl animate-pulse">Curating pieces...</div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 p-10 bg-red-50 rounded-lg">{error}</div>
        ) : products.length === 0 ? (
          <div className="text-center text-gray-500 p-10">No products found in the collection.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Shop;
