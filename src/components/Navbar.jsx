import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiShoppingCart, FiHeart, FiUser, FiMenu, FiX, FiLogOut } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import useCartStore from '../store/useCartStore';
import useAuthStore from '../store/useAuthStore';
import useWishlistStore from '../store/useWishlistStore';

const Navbar = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  const userInfo = useAuthStore((state) => state.userInfo);
  const wishlistItems = useWishlistStore((state) => state.wishlistItems);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const logoutHandler = () => {
    logout();
    setDropdownOpen(false);
    navigate('/login');
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 border-b ${
        scrolled 
          ? 'bg-premium-accent backdrop-blur-xl shadow-lg border-premium-accent py-3 text-premium-dark' 
          : 'bg-transparent border-transparent py-6 text-gray-800'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className={`flex items-center group transition-all duration-300 ${scrolled ? 'bg-white rounded-full px-4 py-1 shadow-md' : ''}`}>
          <img 
            src="/logo.svg" 
            alt="Shopstore.lk Logo" 
            className="h-14 md:h-16 w-auto object-contain group-hover:opacity-90 transition-opacity duration-300"
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-10 items-center">
          {[
            { name: 'Home', path: '/' },
            { name: 'Shop', path: '/shop' },
            { name: 'Categories', path: '/categories' },
            { name: 'About', path: '/about' }
          ].map((link) => (
            <Link 
              key={link.name}
              to={link.path} 
              className={`relative text-sm uppercase tracking-widest font-bold hover:text-red-600 transition-colors py-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-red-600 after:transition-all after:duration-300 hover:after:w-full ${scrolled ? 'text-premium-dark' : 'text-gray-800'}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Icons */}
        <div className="hidden md:flex space-x-3 items-center">
          <button className={`p-2 hover:bg-white/20 rounded-full transition-all ${scrolled ? 'text-premium-dark hover:text-white' : 'text-gray-800 hover:text-premium-accent hover:bg-premium-accent/10'}`}>
            <FiSearch size={20} />
          </button>
          
          <Link to="/wishlist" className={`p-2 hover:bg-white/20 rounded-full transition-all relative ${scrolled ? 'text-premium-dark hover:text-white' : 'text-gray-800 hover:text-premium-accent hover:bg-premium-accent/10'}`}>
            <FiHeart size={20} />
            {wishlistItems.length > 0 && (
              <span className={`absolute top-0 right-0 text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center border shadow-sm ${scrolled ? 'bg-white text-premium-dark border-transparent' : 'bg-premium-accent text-white border-white'}`}>
                {wishlistItems.length}
              </span>
            )}
          </Link>
          
          <Link to="/cart" className={`p-2 hover:bg-white/20 rounded-full transition-all relative ${scrolled ? 'text-premium-dark hover:text-white' : 'text-gray-800 hover:text-premium-accent hover:bg-premium-accent/10'}`}>
            <FiShoppingCart size={20} />
            {cartItems.length > 0 && (
              <span className={`absolute top-0 right-0 text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center border shadow-sm ${scrolled ? 'bg-white text-premium-dark border-transparent' : 'bg-premium-accent text-white border-white'}`}>
                {cartItems.reduce((a, c) => a + c.qty, 0)}
              </span>
            )}
          </Link>
          
          {userInfo ? (
            <div className="relative text-premium-dark">
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)} 
                className={`flex items-center gap-2 ml-2 px-3 py-2 rounded-full border transition-all text-sm font-bold tracking-wide uppercase ${scrolled ? 'border-premium-dark/50 text-premium-dark hover:bg-white/20 hover:text-white hover:border-white' : 'border-gray-200 text-gray-800 hover:border-premium-accent hover:text-premium-accent'}`}
              >
                <FiUser size={16} />
                {userInfo.name.split(' ')[0]}
              </button>
              
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-3 w-56 bg-white border border-gray-100 shadow-2xl rounded-xl overflow-hidden flex flex-col z-50 text-gray-800"
                  >
                    <div className="px-5 py-4 border-b border-gray-50 bg-gray-50/50">
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Signed in as</p>
                      <p className="text-sm font-bold text-gray-800 truncate">{userInfo.email}</p>
                    </div>
                    <Link 
                      to="/profile" 
                      onClick={() => setDropdownOpen(false)}
                      className="px-5 py-3 text-sm font-medium text-gray-700 hover:bg-premium-accent/5 hover:text-premium-accent transition-colors flex items-center gap-3"
                    >
                      <FiUser size={16} /> Profile & Orders
                    </Link>
                    {userInfo.isAdmin && (
                      <Link 
                        to="/admin/dashboard" 
                        onClick={() => setDropdownOpen(false)}
                        className="px-5 py-3 text-sm font-medium text-gray-700 hover:bg-premium-accent/5 hover:text-premium-accent transition-colors flex items-center gap-3"
                      >
                        <FiMenu size={16} /> Admin Dashboard
                      </Link>
                    )}
                    <div className="p-2">
                      <button 
                        onClick={logoutHandler}
                        className="w-full px-3 py-2 text-sm font-semibold text-red-500 bg-red-50 hover:bg-red-500 hover:text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <FiLogOut size={16} /> Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link to="/login" className={`ml-2 px-5 py-2 text-sm font-bold uppercase tracking-wider rounded-full transition-colors shadow-md hover:shadow-lg ${scrolled ? 'bg-premium-dark text-white hover:bg-white hover:text-premium-dark' : 'bg-premium-dark text-white hover:bg-premium-accent'}`}>
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2 text-gray-800" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl overflow-hidden flex flex-col items-center border-t border-gray-100"
          >
            <div className="py-8 flex flex-col space-y-6 w-full px-8">
              {[
                { name: 'Home', path: '/' },
                { name: 'Shop', path: '/shop' },
                { name: 'Categories', path: '/categories' },
                { name: 'Cart', path: '/cart' },
              ].map((link) => (
                <Link 
                  key={link.name}
                  to={link.path} 
                  onClick={() => setIsOpen(false)} 
                  className="text-xl font-semibold tracking-wide text-gray-800 hover:text-premium-accent border-b border-gray-100 pb-4"
                >
                  {link.name}
                </Link>
              ))}
              
              {userInfo ? (
                <>
                  <Link to="/profile" onClick={() => setIsOpen(false)} className="text-xl font-semibold tracking-wide text-gray-800 hover:text-premium-accent border-b border-gray-100 pb-4">Profile</Link>
                  {userInfo.isAdmin && (
                    <Link to="/admin/dashboard" onClick={() => setIsOpen(false)} className="text-xl font-semibold tracking-wide text-gray-800 hover:text-premium-accent border-b border-gray-100 pb-4">Admin Dashboard</Link>
                  )}
                  <button onClick={() => { logoutHandler(); setIsOpen(false); }} className="text-xl font-semibold tracking-wide text-red-500 text-left pt-2">Logout</button>
                </>
              ) : (
                <Link to="/login" onClick={() => setIsOpen(false)} className="mt-4 py-3 bg-premium-dark text-white text-center font-bold uppercase tracking-widest rounded-lg">Login / Register</Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
