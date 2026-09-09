import { motion } from 'framer-motion';
import { useEffect } from 'react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import useProductStore from '../store/useProductStore';

const Home = () => {
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
    >
      <Hero />
      
      {/* Featured Categories Placeholder */}
      <section className="py-16 md:py-24 bg-premium-light">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 md:mb-12 uppercase tracking-widest text-premium-dark">
            Curated <span className="text-premium-accent italic">Collections</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {['Watches', 'Jewelry', 'Handbags'].map((cat, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="relative h-72 md:h-96 group overflow-hidden bg-white cursor-pointer rounded-sm"
              >
                <div className="absolute inset-0 bg-gray-200 group-hover:scale-105 transition-transform duration-700"></div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
                <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 text-left">
                  <h3 className="text-xl md:text-2xl font-semibold text-white tracking-wider mb-2">{cat}</h3>
                  <span className="text-premium-accent text-xs md:text-sm uppercase tracking-widest flex items-center lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 lg:transform lg:translate-y-4 lg:group-hover:translate-y-0">
                    Shop Now <span className="ml-2">&rarr;</span>
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 md:mb-12 uppercase tracking-widest text-premium-dark">
            Trending <span className="text-premium-accent italic">Now</span>
          </h2>
          
          {loading ? (
            <div className="text-premium-accent text-xl">Loading premium collections...</div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {products.slice(0, 4).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
