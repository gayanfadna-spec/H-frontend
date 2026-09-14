import { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

const backgroundImages = [
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1491336477066-31156b5e4f35?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
];

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 3D Tilt Effect Setup
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-500, 500], [15, -15]);
  const rotateY = useTransform(x, [-500, 500], [-15, 15]);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    
    // Relative to the center of the hero section
    x.set(mouseX - width / 2);
    y.set(mouseY - height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 5000); 

    return () => clearInterval(timer);
  }, []);

  return (
    <div 
      className="relative h-screen w-full flex items-center justify-start overflow-hidden bg-white px-6 md:px-16 lg:px-24"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1200 }}
    >
      <div className="absolute inset-0 z-0">
        {backgroundImages.map((img, index) => (
          <img 
            key={img}
            src={img} 
            alt={`Accessories ${index + 1}`} 
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-white/10 to-transparent z-10 pointer-events-none"></div>
      </div>
      
      <motion.div 
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        transition={{ type: "spring", stiffness: 400, damping: 40 }}
        className="relative z-10 text-left max-w-lg bg-white/40 backdrop-blur-xl p-6 md:p-8 rounded-2xl shadow-2xl border border-white/50"
      >
        <motion.h1 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-4 md:mb-6 leading-tight"
        >
          Shop Smart <br/><span className="text-premium-accent italic">Live Easy</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-base md:text-lg text-gray-800 mb-6 font-medium leading-relaxed"
        >
          Discover our exclusive collection of premium accessories designed for the modern connoisseur.
        </motion.p>

        <motion.p 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-base md:text-lg text-gray-900 mb-10 font-bold flex items-center gap-2"
        >
          Call Us: <span className="text-premium-accent">0702809286</span>
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <Link 
            to="/shop" 
            className="inline-block bg-premium-accent text-white px-8 py-3 font-semibold tracking-wider hover:bg-gray-900 hover:text-white transition-all duration-300 border border-premium-accent hover:border-gray-900 shadow-lg rounded hover:shadow-xl uppercase"
          >
            Explore Collection
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
