import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEOComponent from '../components/SEOComponent';
import { FiCheckCircle, FiTruck, FiShield, FiHeart, FiArrowRight } from 'react-icons/fi';

const values = [
  {
    icon: <FiShield size={24} />,
    title: "Artisan Quality",
    desc: "We rigorously inspect every clasp, watch movement, leather stitch, and gemstone before it ever leaves our Colombo facility."
  },
  {
    icon: <FiHeart size={24} />,
    title: "Understated Luxury",
    desc: "Inspired by global minimalism, our accessories are designed to enhance your everyday wardrobe without unnecessary extravagance."
  },
  {
    icon: <FiTruck size={24} />,
    title: "Islandwide Commitment",
    desc: "From central Colombo to the Jaffna peninsula, we deliver directly to your doorstep with trusted courier partners and Cash on Delivery."
  },
  {
    icon: <FiCheckCircle size={24} />,
    title: "Hassle-Free Care",
    desc: "Enjoy peace of mind with 7-day hassle-free exchanges and prompt customer service via phone, email, and WhatsApp."
  }
];

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-[#F9F7F5] min-h-screen pt-8 pb-24"
    >
      <SEOComponent 
        title="About Us | ShopStore.lk" 
        description="Learn about ShopStore.lk, Sri Lanka's premier destination for curated fashion accessories, jewelry, timepieces, and leather goods." 
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        {/* Editorial Hero */}
        <div className="text-center max-w-3xl mx-auto my-12 sm:my-16">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C9A87C] block mb-2">
            The ShopStore Legacy
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#1A1A1A] mb-6 leading-tight">
            Elevating everyday style for modern Sri Lanka.
          </h1>
          <p className="text-stone-600 text-sm sm:text-base font-light leading-relaxed max-w-2xl mx-auto">
            ShopStore.lk was founded with a singular conviction: fine fashion accessories shouldn't be reserved for special occasions or inaccessible boutiques. We bring timeless jewelry, precision watches, and handcrafted leather essentials straight to fashion-conscious Sri Lankans.
          </p>
        </div>

        {/* Feature Visual Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center mb-20">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-stone-200">
            <img 
              src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80" 
              alt="Artisan jewelry craft" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#C9A87C] block">Handcrafted Detail</span>
              <p className="text-lg font-bold">18K Gold Plating & Precision Quartz</p>
            </div>
          </div>

          <div className="space-y-6">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C9A87C]">
              Our Philosophy
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A]">
              Curated for the modern connoisseur.
            </h2>
            <p className="text-stone-600 text-sm leading-relaxed font-light">
              In a world flooded with disposable fast fashion, ShopStore.lk champions longevity and deliberate design. Every ring, cuff, watch, and wallet in our catalog is chosen for balance, weight, and enduring beauty.
            </p>
            <p className="text-stone-600 text-sm leading-relaxed font-light">
              Headquartered in Colombo, our team works closely with certified artisan makers and reputable manufacturers to deliver accessories that resist tarnishing, wear comfortably in our tropical climate, and stand the test of time.
            </p>
            <div className="pt-2">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#1A1A1A] hover:bg-[#C9A87C] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-md"
              >
                <span>Explore the Catalog</span>
                <FiArrowRight />
              </Link>
            </div>
          </div>
        </div>

        {/* Pillars / Values Grid */}
        <div className="mb-20">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C9A87C] block mb-1">
              What We Stand For
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A]">
              Built On Trust & Integrity
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-stone-200/80 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#F9F7F5] border border-stone-200 flex items-center justify-center text-[#C9A87C] mb-6">
                    {v.icon}
                  </div>
                  <h3 className="text-base font-bold text-[#1A1A1A] uppercase tracking-wider mb-2">
                    {v.title}
                  </h3>
                  <p className="text-xs text-stone-500 font-light leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Islandwide Coverage Banner */}
        <div className="bg-[#1A1A1A] text-white p-8 sm:p-14 rounded-3xl relative overflow-hidden shadow-2xl">
          <div className="max-w-2xl">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C9A87C] block mb-2">
              Serving All of Sri Lanka
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold mb-4 leading-tight">
              Doorstep courier delivery across all 25 districts.
            </h2>
            <p className="text-stone-300 text-sm font-light leading-relaxed mb-8">
              Whether you reside in Western Province, Central Highlands, or the Southern Coastal belt, your order is packaged with utmost care and delivered in 2-4 business days.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/shop"
                className="px-8 py-3.5 rounded-full bg-[#C9A87C] hover:bg-white text-[#1A1A1A] text-xs font-bold uppercase tracking-wider transition-all duration-300"
              >
                Shop Now
              </Link>
              <Link
                to="/contact"
                className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 border border-white/20"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default About;
