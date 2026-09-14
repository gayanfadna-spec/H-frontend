import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiShield, FiTruck, FiClock } from 'react-icons/fi';

const slides = [
  {
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=2000&q=85",
    tag: "CURATED FINE JEWELRY • 2026 EDIT",
    title: "Timeless Adornments.",
    subtitle: "Understated Elegance.",
    description: "Explore handcrafted 18k gold-plated jewelry, bespoke rings, and minimalist necklaces designed to elevate your everyday silhouette.",
    cta: "Explore Jewelry",
    link: "/shop?category=jewelry"
  },
  {
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=2000&q=85",
    tag: "PRECISION TIMEPIECES • LUXURY ACCENTS",
    title: "Minimalist Watches.",
    subtitle: "Effortless Sophistication.",
    description: "Modern horology meets minimalist design. Built with premium movements, sapphire crystal, and genuine leather straps.",
    cta: "Discover Watches",
    link: "/shop?category=watches"
  },
  {
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=2000&q=85",
    tag: "ARTISAN LEATHER • EVERYDAY LUXURY",
    title: "Handcrafted Bags.",
    subtitle: "Built For The Journey.",
    description: "Full-grain leather totes, compact crossbody bags, and slim RFID-blocking wallets crafted for discerning professionals across Sri Lanka.",
    cta: "Shop Leather Goods",
    link: "/shop?category=bags"
  }
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full min-h-[85vh] lg:min-h-[90vh] flex flex-col justify-between overflow-hidden bg-[#F9F7F5]">

      {/* Background Slideshow with Crossfade */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={slides[current].image}
              alt={slides[current].title}
              className="w-full h-full object-cover object-center filter brightness-[0.92]"
            />
            {/* Elegant editorial gradient overlay for maximum contrast and soft mood */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A]/85 via-[#1A1A1A]/50 to-transparent sm:w-4/5 lg:w-3/5" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/60 via-transparent to-transparent sm:hidden" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Hero Content Container */}
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10 my-auto py-20 lg:py-28">
        <div className="max-w-2xl text-left">

          {/* Subtle Tag / Season Badge */}
          <motion.div
            key={`tag-${current}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#C9A87C] text-[10px] sm:text-xs font-semibold tracking-[0.22em] uppercase mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A87C]" />
            {slides[current].tag}
          </motion.div>

          {/* Editorial Headline */}
          <motion.h1
            key={`title-${current}`}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-4"
          >
            {slides[current].title} <br />
            <span className="text-[#C9A87C] font-normal italic">
              {slides[current].subtitle}
            </span>
          </motion.h1>

          {/* Subtitle / Description */}
          <motion.p
            key={`desc-${current}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-stone-200 text-sm sm:text-base md:text-lg max-w-xl font-light leading-relaxed mb-8"
          >
            {slides[current].description}
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
          >
            <Link
              to="/shop"
              className="inline-flex items-center justify-center gap-3 bg-[#C9A87C] text-[#1A1A1A] hover:bg-white px-8 py-4 rounded-full text-xs font-bold tracking-[0.16em] uppercase transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-[1.02] group"
            >
              <span>Shop Collection</span>
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to={slides[current].link}
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/30 px-7 py-4 rounded-full text-xs font-semibold tracking-[0.16em] uppercase transition-all duration-300"
            >
              <span>{slides[current].cta}</span>
            </Link>
          </motion.div>

          {/* Slider Pagination Pills */}
          <div className="flex items-center gap-2.5 mt-12">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`h-1.5 transition-all duration-500 rounded-full focus:outline-none ${index === current
                    ? 'w-10 bg-[#C9A87C]'
                    : 'w-2.5 bg-white/40 hover:bg-white/70'
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

        </div>
      </div>

      {/* Floating Trust Strip at the Bottom */}
      <div className="relative z-10 bg-[#1A1A1A]/90 backdrop-blur-md border-t border-white/10 py-4 px-6">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 text-center md:text-left text-white/90 text-xs">

          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="p-2 rounded-lg bg-white/5 text-[#C9A87C]">
              <FiTruck size={18} />
            </div>
            <div>
              <p className="font-semibold text-stone-100 tracking-wide">Islandwide Delivery</p>
              <p className="text-stone-400 text-[11px]">Prompt door delivery across all 25 districts</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="p-2 rounded-lg bg-white/5 text-[#C9A87C]">
              <FiShield size={18} />
            </div>
            <div>
              <p className="font-semibold text-stone-100 tracking-wide">Authentic & Verified</p>
              <p className="text-stone-400 text-[11px]">100% genuine craftsmanship guaranteed</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="p-2 rounded-lg bg-white/5 text-[#C9A87C]">
              <FiClock size={18} />
            </div>
            <div>
              <p className="font-semibold text-stone-100 tracking-wide">Customer Support</p>
              <p className="text-stone-400 text-[11px]">Call or WhatsApp our team: 070 280 9286</p>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};

export default Hero;

