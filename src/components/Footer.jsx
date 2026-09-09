import { Link } from 'react-router-dom';
import { FiInstagram, FiTwitter, FiFacebook } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-premium-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-2xl font-bold tracking-widest uppercase mb-4 text-premium-accent">Aura Luxe</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Discover the finest collection of premium accessories designed to elevate your everyday style. Luxury is in the details.
          </p>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><Link to="/shop" className="hover:text-premium-accent transition-colors">Shop All</Link></li>
            <li><Link to="/categories" className="hover:text-premium-accent transition-colors">Categories</Link></li>
            <li><Link to="/about" className="hover:text-premium-accent transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-premium-accent transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Customer Care</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><Link to="/faq" className="hover:text-premium-accent transition-colors">FAQ</Link></li>
            <li><Link to="/shipping" className="hover:text-premium-accent transition-colors">Shipping & Returns</Link></li>
            <li><Link to="/terms" className="hover:text-premium-accent transition-colors">Terms of Service</Link></li>
            <li><Link to="/privacy" className="hover:text-premium-accent transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
          <p className="text-gray-400 text-sm mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
          <div className="flex border-b border-gray-600 pb-2">
            <input type="email" placeholder="Enter your email" className="bg-transparent outline-none flex-grow text-sm text-white placeholder-gray-500" />
            <button className="text-premium-accent font-semibold hover:text-white transition-colors text-sm tracking-wider">SUBSCRIBE</button>
          </div>
          <div className="flex space-x-5 mt-6">
            <a href="#" className="text-gray-400 hover:text-premium-accent transition-colors"><FiInstagram size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-premium-accent transition-colors"><FiTwitter size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-premium-accent transition-colors"><FiFacebook size={20} /></a>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-6 mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Aura Luxe. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
