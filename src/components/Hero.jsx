import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-premium-dark">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
          alt="Luxury Fashion" 
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-premium-dark via-transparent to-premium-dark/30"></div>
      </div>
      
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold text-white tracking-wide mb-4 md:mb-6 leading-tight"
        >
          Elevate Your <span className="text-premium-accent italic">Aura</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light"
        >
          Discover our exclusive collection of premium accessories designed for the modern connoisseur.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <Link 
            to="/shop" 
            className="inline-block bg-premium-accent text-white px-10 py-4 font-semibold tracking-wider hover:bg-white hover:text-premium-dark transition-all duration-300 border border-premium-accent hover:border-white uppercase"
          >
            Explore Collection
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
