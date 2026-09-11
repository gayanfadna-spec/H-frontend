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
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-widest uppercase flex items-center gap-2">
          <span className="text-premium-accent">AURA</span>
          <span className="text-premium-dark">Luxe</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8 items-center">
          <Link to="/" className="hover:text-premium-accent transition-colors font-medium">Home</Link>
          <Link to="/shop" className="hover:text-premium-accent transition-colors font-medium">Shop</Link>
          <Link to="/categories" className="hover:text-premium-accent transition-colors font-medium">Categories</Link>
          <Link to="/about" className="hover:text-premium-accent transition-colors font-medium">About</Link>
        </div>

        {/* Icons */}
        <div className="hidden md:flex space-x-6 items-center">
          <button className="hover:text-premium-accent transition-colors"><FiSearch size={22} /></button>
          <Link to="/wishlist" className="hover:text-premium-accent transition-colors relative">
            <FiHeart size={22} />
            {wishlistItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-premium-accent text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {wishlistItems.length}
              </span>
            )}
          </Link>
          <Link to="/cart" className="hover:text-premium-accent transition-colors relative">
            <FiShoppingCart size={22} />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-premium-accent text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {cartItems.reduce((a, c) => a + c.qty, 0)}
              </span>
            )}
          </Link>
          
          {userInfo ? (
            <div className="relative">
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)} 
                className="hover:text-premium-accent transition-colors flex items-center gap-1 font-medium"
              >
                {userInfo.name.split(' ')[0]}
              </button>
              
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-4 w-48 bg-white border border-gray-100 shadow-lg rounded-md overflow-hidden flex flex-col"
                  >
                    <Link 
                      to="/profile" 
                      onClick={() => setDropdownOpen(false)}
                      className="px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Profile & Orders
                    </Link>
                    {userInfo.isAdmin && (
                      <Link 
                        to="/admin/dashboard" 
                        onClick={() => setDropdownOpen(false)}
                        className="px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors border-t border-gray-100"
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <button 
                      onClick={logoutHandler}
                      className="px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors border-t border-gray-100 text-left flex items-center gap-2"
                    >
                      <FiLogOut /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link to="/login" className="hover:text-premium-accent transition-colors"><FiUser size={22} /></Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-2xl" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg overflow-hidden flex flex-col items-center"
          >
            <div className="py-6 flex flex-col space-y-4 w-full px-6">
              <Link to="/" onClick={() => setIsOpen(false)} className="font-medium text-lg hover:text-premium-accent border-b pb-2">Home</Link>
              <Link to="/shop" onClick={() => setIsOpen(false)} className="font-medium text-lg hover:text-premium-accent border-b pb-2">Shop</Link>
              <Link to="/cart" onClick={() => setIsOpen(false)} className="font-medium text-lg hover:text-premium-accent border-b pb-2">Cart</Link>
              
              {userInfo ? (
                <>
                  <Link to="/profile" onClick={() => setIsOpen(false)} className="font-medium text-lg hover:text-premium-accent border-b pb-2">Profile</Link>
                  {userInfo.isAdmin && (
                    <Link to="/admin/dashboard" onClick={() => setIsOpen(false)} className="font-medium text-lg hover:text-premium-accent border-b pb-2">Admin Dashboard</Link>
                  )}
                  <button onClick={() => { logoutHandler(); setIsOpen(false); }} className="font-medium text-lg text-red-500 hover:text-red-700 text-left">Logout</button>
                </>
              ) : (
                <Link to="/login" onClick={() => setIsOpen(false)} className="font-medium text-lg hover:text-premium-accent">Login / Register</Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
