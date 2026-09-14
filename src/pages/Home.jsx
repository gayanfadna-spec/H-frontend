import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import useProductStore from '../store/useProductStore';
import useCategoryStore from '../store/useCategoryStore';
import SEOComponent from '../components/SEOComponent';
import { 
  FiTruck, 
  FiShield, 
  FiRefreshCw, 
  FiCreditCard, 
  FiArrowRight, 
  FiInstagram,
  FiCheckCircle
} from 'react-icons/fi';
import toast from 'react-hot-toast';

const curatedCategories = [
  {
    title: 'Fine Jewelry',
    subtitle: '18K Gold Plated & Sterling Silver',
    tag: 'jewelry',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
    colSpan: 'md:col-span-2 md:row-span-2 h-[420px] md:h-full'
  },
  {
    title: 'Timepieces',
    subtitle: 'Sapphire Crystal & Leather',
    tag: 'watches',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
    colSpan: 'md:col-span-1 h-[260px]'
  },
  {
    title: 'Leather Goods',
    subtitle: 'Wallets, Belts & Crossbody Bags',
    tag: 'bags',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
    colSpan: 'md:col-span-1 h-[260px]'
  },
  {
    title: 'Sunglasses',
    subtitle: 'UV400 Polarized Designer Frames',
    tag: 'sunglasses',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
    colSpan: 'md:col-span-1 h-[260px]'
  },
  {
    title: 'Everyday Tech',
    subtitle: 'Minimal Phone Cases & Organizers',
    tag: 'accessories',
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80',
    colSpan: 'md:col-span-1 h-[260px]'
  }
];

const instagramPosts = [
  {
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80',
    tag: '@anuki.f',
    caption: 'Golden hour with the ShopStore pendant ✨'
  },
  {
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80',
    tag: '@kaveesha.m',
    caption: 'Understated luxury for Colombo workdays.'
  },
  {
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=600&q=80',
    tag: '@dinu.r',
    caption: 'Obsessed with the leather craftsmanship.'
  },
  {
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    tag: '@shenali.p',
    caption: 'Simple, chic and timeless.'
  }
];

const Home = () => {
  const { products, loading, error, fetchProducts } = useProductStore();
  const { categories, fetchCategories } = useCategoryStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }
    setNewsletterSubscribed(true);
    toast.success('Thank you! Welcome to the ShopStore VIP club');
  };

  const filteredProducts = products.filter((item) => {
    if (activeTab === 'new') return item.isNewArrival;
    if (activeTab === 'sale') return item.originalPrice && item.originalPrice > item.price;
    return true;
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-[#F9F7F5] min-h-screen"
    >
      <SEOComponent 
        title="Curated Fashion & Lifestyle Accessories | ShopStore.lk" 
        description="Discover handcrafted jewelry, luxury watches, leather goods, and premium lifestyle accessories with islandwide delivery across Sri Lanka. Shop smart, live easy." 
      />
      
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Trust Badges Section */}
      <section className="py-12 md:py-16 border-y border-stone-200/70 bg-white">
        <div className="container mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            
            <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-[#F9F7F5] transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-[#F9F7F5] border border-stone-200 flex items-center justify-center text-[#C9A87C] flex-shrink-0">
                <FiTruck size={22} />
              </div>
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#1A1A1A]">Islandwide Delivery</h4>
                <p className="text-xs text-stone-500 mt-0.5">Reliable doorstep courier across all 25 districts</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-[#F9F7F5] transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-[#F9F7F5] border border-stone-200 flex items-center justify-center text-[#C9A87C] flex-shrink-0">
                <FiCreditCard size={22} />
              </div>
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#1A1A1A]">Cash on Delivery</h4>
                <p className="text-xs text-stone-500 mt-0.5">Pay via Cash on Delivery or Card online</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-[#F9F7F5] transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-[#F9F7F5] border border-stone-200 flex items-center justify-center text-[#C9A87C] flex-shrink-0">
                <FiShield size={22} />
              </div>
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#1A1A1A]">Quality Guaranteed</h4>
                <p className="text-xs text-stone-500 mt-0.5">Every accessory is hand-checked for perfection</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-[#F9F7F5] transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-[#F9F7F5] border border-stone-200 flex items-center justify-center text-[#C9A87C] flex-shrink-0">
                <FiRefreshCw size={22} />
              </div>
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#1A1A1A]">Hassle-Free Exchange</h4>
                <p className="text-xs text-stone-500 mt-0.5">Easy 7-day exchange on all orders</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Curated Categories Grid */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-6 sm:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C9A87C] block mb-2">
                Curated Collections
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1A1A1A]">
                Explore By Category
              </h2>
            </div>
            <Link 
              to="/shop" 
              className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#1A1A1A] hover:text-[#C9A87C] transition-colors"
            >
              <span>View All Categories</span>
              <FiArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 min-h-[560px]">
            {curatedCategories.map((cat, idx) => (
              <div 
                key={idx}
                onClick={() => navigate(`/shop?category=${cat.tag}`)}
                className={`group relative overflow-hidden rounded-3xl cursor-pointer bg-stone-100 ${cat.colSpan}`}
              >
                <img 
                  src={cat.image} 
                  alt={cat.title} 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/85 via-[#1A1A1A]/30 to-transparent group-hover:from-[#1A1A1A]/90 transition-colors duration-300" />
                
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 flex flex-col justify-end">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#C9A87C] mb-1">
                    {cat.subtitle}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                    {cat.title}
                  </h3>
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/90 group-hover:text-[#C9A87C] transition-colors">
                    <span>Explore Collection</span>
                    <FiArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Trending & New Arrivals Section */}
      <section className="py-20 lg:py-28 bg-white border-t border-stone-200/70">
        <div className="container mx-auto px-6 sm:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C9A87C] block mb-2">
              Selected Essentials
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1A1A1A] mb-6">
              Trending Accessories
            </h2>

            {/* Segmented Filter Tabs */}
            <div className="inline-flex p-1 rounded-full bg-[#F9F7F5] border border-stone-200">
              {[
                { id: 'all', label: 'All Curated' },
                { id: 'new', label: 'New Arrivals' },
                { id: 'sale', label: 'Special Offers' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-[#1A1A1A] text-[#F9F7F5] shadow-sm'
                      : 'text-stone-600 hover:text-[#1A1A1A]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="h-96 rounded-2xl bg-stone-100" />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12 text-rose-500">{error}</div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-16 text-stone-500">
              <p>No products found for this selection.</p>
              <button 
                onClick={() => setActiveTab('all')} 
                className="mt-4 px-6 py-2 rounded-full bg-[#1A1A1A] text-white text-xs uppercase tracking-wider"
              >
                View All Items
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
              {filteredProducts.slice(0, 8).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}

          <div className="mt-14 text-center">
            <Link
              to="/shop"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#1A1A1A] hover:bg-[#C9A87C] text-white text-xs font-bold uppercase tracking-[0.18em] transition-all duration-300 shadow-md hover:shadow-xl"
            >
              <span>Explore All Accessories</span>
              <FiArrowRight />
            </Link>
          </div>

        </div>
      </section>

      {/* 5. Editorial Brand Story Banner */}
      <section className="py-20 lg:py-28 bg-[#1A1A1A] text-white relative overflow-hidden">
        <div className="container mx-auto px-6 sm:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            <div className="space-y-6">
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C9A87C]">
                The ShopStore.lk Philosophy
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                Designed for everyday elegance, crafted to last.
              </h2>
              <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed">
                Founded with a mission to bring world-class fashion accessories to Sri Lanka, ShopStore.lk bridges the gap between affordable luxury and uncompromised craftsmanship. From delicate rings to precision watches, every piece is inspected to empower your self-expression.
              </p>
              
              <div className="pt-4 flex flex-wrap items-center gap-6">
                <div className="border-l-2 border-[#C9A87C] pl-4">
                  <span className="block text-2xl font-bold text-white">25+</span>
                  <span className="text-xs text-stone-400 uppercase tracking-wider">Districts Covered</span>
                </div>
                <div className="border-l-2 border-[#C9A87C] pl-4">
                  <span className="block text-2xl font-bold text-white">100%</span>
                  <span className="text-xs text-stone-400 uppercase tracking-wider">Verified Authenticity</span>
                </div>
                <div className="border-l-2 border-[#C9A87C] pl-4">
                  <span className="block text-2xl font-bold text-white">5,000+</span>
                  <span className="text-xs text-stone-400 uppercase tracking-wider">Happy Shoppers</span>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#C9A87C] hover:text-white transition-colors"
                >
                  <span>Read Our Full Story</span>
                  <FiArrowRight />
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                <img 
                  src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80" 
                  alt="ShopStore craftsmanship" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="hidden sm:block absolute -bottom-6 -left-6 bg-[#C9A87C] text-[#1A1A1A] p-6 rounded-2xl shadow-xl max-w-xs">
                <p className="text-xs font-extrabold uppercase tracking-wider mb-1">Sri Lanka Islandwide</p>
                <p className="text-xs font-medium text-stone-900 leading-snug">
                  Fast courier door delivery in 2 to 4 business days.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Instagram / Community Photo Grid */}
      <section className="py-20 lg:py-28 bg-[#F9F7F5]">
        <div className="container mx-auto px-6 sm:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C9A87C] block mb-2">
              Customer Community
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1A1A1A] mb-3">
              Styled by You
            </h2>
            <p className="text-sm text-stone-500">
              Tag <span className="font-semibold text-[#1A1A1A]">@shopstore.lk</span> on Instagram with your favorite look to be featured.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {instagramPosts.map((post, index) => (
              <div key={index} className="group relative aspect-square rounded-2xl overflow-hidden bg-stone-200">
                <img 
                  src={post.image} 
                  alt={post.caption} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center text-white">
                  <FiInstagram size={24} className="mb-2 text-[#C9A87C]" />
                  <span className="text-xs font-bold tracking-wider mb-1">{post.tag}</span>
                  <p className="text-[11px] text-stone-200 line-clamp-2">{post.caption}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. Newsletter Signup */}
      <section className="py-20 bg-white border-t border-stone-200/70">
        <div className="container mx-auto px-6 sm:px-8">
          <div className="max-w-3xl mx-auto text-center bg-[#F9F7F5] border border-stone-200 p-8 sm:p-14 rounded-3xl shadow-sm">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C9A87C] block mb-2">
              Exclusive Privilege
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1A1A1A] mb-4">
              Receive 10% Off Your First Order
            </h2>
            <p className="text-sm text-stone-600 max-w-md mx-auto mb-8 font-light leading-relaxed">
              Subscribe to unlock private sales, early access to new limited drops, and styling inspiration.
            </p>

            {newsletterSubscribed ? (
              <div className="inline-flex items-center gap-2 p-4 bg-emerald-50 text-emerald-800 rounded-2xl text-sm font-semibold">
                <FiCheckCircle size={20} className="text-emerald-600" />
                <span>You are on the VIP guest list! Check your inbox shortly.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email address..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-grow px-5 py-3.5 rounded-full bg-white border border-stone-300 text-sm text-[#1A1A1A] placeholder-stone-400 focus:outline-none focus:border-[#C9A87C] shadow-sm"
                  required
                />
                <button 
                  type="submit"
                  className="px-8 py-3.5 rounded-full bg-[#1A1A1A] hover:bg-[#C9A87C] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-md flex-shrink-0"
                >
                  Join Club
                </button>
              </form>
            )}

            <p className="text-[11px] text-stone-400 mt-4">
              We respect your privacy. Unsubscribe anytime with one click.
            </p>
          </div>
        </div>
      </section>

    </motion.div>
  );
};

export default Home;

