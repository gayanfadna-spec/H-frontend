import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiInstagram, FiFacebook, FiPhone, FiMail, FiMapPin, FiArrowRight, FiCheck } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }
    setSubscribed(true);
    toast.success('Thank you for subscribing to ShopStore.lk private drops!');
  };

  return (
    <footer className="bg-[#1A1A1A] text-stone-300 pt-16 sm:pt-20 pb-12 border-t border-stone-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-16 border-b border-stone-800">
          
          {/* Brand Col (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <Link to="/" className="flex items-center gap-2.5 group inline-block">
              <div className="w-9 h-9 rounded-xl bg-white/10 text-[#C9A87C] border border-white/20 flex items-center justify-center font-bold tracking-tighter text-base shadow-sm group-hover:bg-[#C9A87C] group-hover:text-white transition-all duration-300">
                SS
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-extrabold tracking-[0.22em] text-white font-sans leading-none">
                  SHOPSTORE<span className="text-[#C9A87C]">.LK</span>
                </span>
                <span className="text-[9px] tracking-[0.28em] text-stone-400 uppercase font-medium mt-0.5">
                  Sri Lanka
                </span>
              </div>
            </Link>

            <p className="text-xs text-stone-400 font-light leading-relaxed max-w-sm">
              Sri Lanka's premier destination for curated fashion & lifestyle accessories. Handcrafted jewelry, minimalist timepieces, and artisan leather goods delivered islandwide.
            </p>

            <div className="space-y-2 text-xs text-stone-400 pt-2">
              <div className="flex items-center gap-2.5">
                <FiPhone className="text-[#C9A87C]" size={14} />
                <a href="tel:0702809286" className="hover:text-white font-medium transition-colors">
                  070 280 9286 (Hotline & WhatsApp)
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <FiMail className="text-[#C9A87C]" size={14} />
                <a href="mailto:support@shopstore.lk" className="hover:text-white font-medium transition-colors">
                  support@shopstore.lk
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <FiMapPin className="text-[#C9A87C]" size={14} />
                <span>Colombo, Western Province, Sri Lanka</span>
              </div>
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white">
              Collections
            </h3>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li><Link to="/shop" className="hover:text-[#C9A87C] transition-colors">Shop All</Link></li>
              <li><Link to="/shop?category=jewelry" className="hover:text-[#C9A87C] transition-colors">Fine Jewelry</Link></li>
              <li><Link to="/shop?category=watches" className="hover:text-[#C9A87C] transition-colors">Luxury Watches</Link></li>
              <li><Link to="/shop?category=bags" className="hover:text-[#C9A87C] transition-colors">Leather Bags & Wallets</Link></li>
              <li><Link to="/shop?category=sunglasses" className="hover:text-[#C9A87C] transition-colors">Designer Eyewear</Link></li>
              <li><Link to="/wishlist" className="hover:text-[#C9A87C] transition-colors">My Wishlist</Link></li>
            </ul>
          </div>

          {/* Client Concierge (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white">
              Client Care
            </h3>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li><Link to="/about" className="hover:text-[#C9A87C] transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-[#C9A87C] transition-colors">Contact Concierge</Link></li>
              <li><Link to="/profile" className="hover:text-[#C9A87C] transition-colors">Track Order</Link></li>
              <li><Link to="/cart" className="hover:text-[#C9A87C] transition-colors">Shopping Bag</Link></li>
              <li><span className="text-stone-500 cursor-default">Islandwide Delivery</span></li>
              <li><span className="text-stone-500 cursor-default">7-Day Exchanges</span></li>
            </ul>
          </div>

          {/* Newsletter Column (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white">
              Privilege Newsletter
            </h3>
            <p className="text-xs text-stone-400 font-light leading-relaxed">
              Subscribe to receive early invitations to private sales and 10% off your initial purchase.
            </p>

            {subscribed ? (
              <div className="p-3 bg-white/5 border border-[#C9A87C]/40 rounded-2xl flex items-center gap-2 text-xs text-[#C9A87C]">
                <FiCheck size={16} />
                <span>You are on our private guest list.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="relative flex items-center">
                <input 
                  type="email" 
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-4 pr-28 py-3 bg-white/5 rounded-full border border-stone-700 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#C9A87C]"
                  required
                />
                <button 
                  type="submit"
                  className="absolute right-1.5 px-4 py-2 bg-[#C9A87C] hover:bg-white text-[#1A1A1A] text-[11px] font-bold uppercase tracking-wider rounded-full transition-colors"
                >
                  Join
                </button>
              </form>
            )}

            <div className="pt-2 flex items-center gap-4">
              <span className="text-xs text-stone-500 font-medium">Follow us:</span>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#C9A87C] text-stone-300 hover:text-[#1A1A1A] flex items-center justify-center transition-colors"
                title="Instagram"
              >
                <FiInstagram size={15} />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#C9A87C] text-stone-300 hover:text-[#1A1A1A] flex items-center justify-center transition-colors"
                title="Facebook"
              >
                <FiFacebook size={15} />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Payment Badges */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-stone-500">
          <div>
            &copy; {new Date().getFullYear()} ShopStore.lk. All rights reserved. Designed for Sri Lanka with luxury craft.
          </div>

          {/* Payment Method Badges */}
          <div className="flex items-center gap-2 flex-wrap justify-center text-[10px] uppercase font-bold tracking-wider text-stone-400">
            <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10">Cash on Delivery</span>
            <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10">Visa</span>
            <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10">Mastercard</span>
            <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10">Bank Transfer</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

