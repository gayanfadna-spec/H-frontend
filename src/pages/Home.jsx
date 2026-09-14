import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import useProductStore from '../store/useProductStore';
import useCategoryStore from '../store/useCategoryStore';

const Home = () => {
  const { products, loading, error, fetchProducts } = useProductStore();
  const { categories, fetchCategories } = useCategoryStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      
      {/* Featured Categories */}
      <section className="py-16 md:py-24 bg-premium-light">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 md:mb-12 uppercase tracking-widest text-premium-dark flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
            Curated <span className="font-serif capitalize italic text-5xl md:text-6xl text-premium-accent tracking-normal">Collections</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: 'Fashion',
                description: 'Items like jewelry, belts, scarves, hats, sunglasses, and handbags that add detail and visual impact to clothing.',
                image: 'https://images.unsplash.com/photo-1509319117193-57bab727e09d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
              },
              {
                title: 'Electronics and Tech',
                description: 'Add-ons like protective cases, charging cables, power banks, and smart straps used for mobile phones, laptops, and smartwatches.',
                image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
              },
              {
                title: 'Functional and Travel',
                description: 'Practical items such as wallets, umbrellas, keychains.',
                image: 'https://images.unsplash.com/photo-1628149462151-51bf23cd3ee5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
              }
            ].map((cat, idx) => {
              const matchedCategory = categories?.find(c => c.name === cat.title);
              const categoryId = matchedCategory ? matchedCategory._id : '';

              return (
                <motion.div 
                  key={idx}
                  whileHover={{ y: -10 }}
                  onClick={() => navigate(`/shop?category=${categoryId}`)}
                  className="relative h-96 group overflow-hidden bg-white cursor-pointer rounded-sm flex flex-col justify-end"
                >
                  <img 
                    src={cat.image} 
                    alt={cat.title} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 transition-colors duration-500"></div>
                  
                  <div className="relative z-10 p-6 md:p-8 text-left h-full flex flex-col justify-end">
                    <h3 className="text-2xl font-semibold text-white tracking-wider mb-2">{cat.title}</h3>
                    
                    {/* The description is initially hidden or small, and reveals nicely on hover */}
                    <p className="text-gray-300 text-sm mb-4 opacity-0 h-0 group-hover:opacity-100 group-hover:h-auto transition-all duration-500 ease-in-out overflow-hidden line-clamp-3">
                      {cat.description}
                    </p>

                    <span className="text-premium-accent text-sm uppercase tracking-widest flex items-center lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 lg:transform lg:translate-y-4 lg:group-hover:translate-y-0">
                      Shop Now <span className="ml-2">&rarr;</span>
                    </span>
                  </div>
                </motion.div>
              );
            })}
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
