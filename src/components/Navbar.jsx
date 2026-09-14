import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiSearch, FiShoppingCart, FiHeart, FiUser, FiMenu, FiX, FiLogOut, FiPhone, FiArrowRight } from 'react-icons/fi';
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
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const totalCartCount = cartItems.reduce((acc, item) => acc + (item.qty || 1), 0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close drawers when navigating
  useEffect(() => {
    setIsOpen(false);
    setSearchOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?keyword=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const logoutHandler = () => {
    logout();
    setDropdownOpen(false);
    navigate('/login');
  };

  return (
    <>
      {/* Top Luxury Announcement Bar */}
      <div className="bg-[#1A1A1A] text-[#F9F7F5] text-[11px] font-medium tracking-widest uppercase py-2 px-4 text-center flex items-center justify-between sm:justify-center relative z-50 border-b border-white/10">
        <div className="flex items-center gap-3 mx-auto">
          <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[#C9A87C] animate-ping" />
          <span>Islandwide Delivery Across Sri Lanka • Free Shipping Over LKR 7,500 • Cash on Delivery</span>
        </div>
        <a 
          href="tel:0702809286" 
          className="hidden lg:flex items-center gap-1.5 text-[#C9A87C] hover:text-white transition-colors absolute right-6 font-semibold lowercase tracking-normal text-xs"
        >
          <FiPhone size={12} /> <span>070 280 9286</span>
        </a>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 w-full z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#F9F7F5]/95 backdrop-blur-md shadow-sm border-b border-stone-200/80 py-3.5'
            : 'bg-[#F9F7F5] border-b border-stone-200/50 py-5'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 -ml-2 text-[#1A1A1A] hover:text-[#C9A87C] transition-colors focus:outline-none" 
            onClick={() => setIsOpen(true)}
            aria-label="Open Navigation Menu"
          >
            <FiMenu size={22} />
          </button>

          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-[#1A1A1A] text-[#C9A87C] flex items-center justify-center font-bold tracking-tighter text-sm md:text-base shadow-sm group-hover:bg-[#C9A87C] group-hover:text-white transition-all duration-300">
              SS
            </div>
            <div className="flex flex-col">
              <span className="text-base md:text-lg font-bold tracking-[0.22em] text-[#1A1A1A] font-sans leading-none">
                SHOPSTORE<span className="text-[#C9A87C]">.LK</span>
              </span>
              <span className="text-[8px] md:text-[9px] tracking-[0.28em] text-stone-500 uppercase font-medium mt-0.5">
                Accessories
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 lg:space-x-10">
            {[
              { name: 'Home', path: '/' },
              { name: 'Shop All', path: '/shop' },
              { name: 'Jewelry', path: '/shop?category=jewelry' },
              { name: 'Watches', path: '/shop?category=watches' },
              { name: 'Bags & Wallets', path: '/shop?category=bags' },
              { name: 'About', path: '/about' },
              { name: 'Contact', path: '/contact' }
            ].map((link) => (
              <Link 
                key={link.name}
                to={link.path} 
                className={`relative text-[11px] lg:text-xs uppercase tracking-[0.18em] font-medium transition-colors py-1 hover:text-[#C9A87C] ${
                  location.pathname + location.search === link.path 
                    ? 'text-[#C9A87C] font-semibold' 
                    : 'text-[#1A1A1A]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center space-x-1.5 sm:space-x-3">
            {/* Search Trigger */}
            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-[#1A1A1A] hover:text-[#C9A87C] hover:bg-black/5 rounded-full transition-all focus:outline-none"
              title="Search accessories"
              aria-label="Search"
            >
              <FiSearch size={19} />
            </button>
            
            {/* Wishlist Link */}
            <Link 
              to="/wishlist" 
              className="p-2 text-[#1A1A1A] hover:text-[#C9A87C] hover:bg-black/5 rounded-full transition-all relative focus:outline-none"
              title="Wishlist"
              aria-label="Wishlist"
            >
              <FiHeart size={19} />
              {wishlistItems.length > 0 && (
                <span className="absolute top-1 right-1 text-[9px] font-bold rounded-full h-4 w-4 flex items-center justify-center bg-[#C9A87C] text-white shadow-sm ring-2 ring-[#F9F7F5]">
                  {wishlistItems.length}
                </span>
              )}
            </Link>
            
            {/* Cart Link */}
            <Link 
              to="/cart" 
              className="p-2 text-[#1A1A1A] hover:text-[#C9A87C] hover:bg-black/5 rounded-full transition-all relative focus:outline-none"
              title="Shopping Bag"
              aria-label="Shopping Bag"
            >
              <FiShoppingCart size={19} />
              {totalCartCount > 0 && (
                <span className="absolute top-1 right-1 text-[9px] font-bold rounded-full h-4 w-4 flex items-center justify-center bg-[#1A1A1A] text-[#F9F7F5] shadow-sm ring-2 ring-[#F9F7F5]">
                  {totalCartCount}
                </span>
              )}
            </Link>
            
            {/* User Account Dropdown */}
            {userInfo ? (
              <div className="relative">
                <button 
                  onClick={() => setDropdownOpen(!dropdownOpen)} 
                  className="flex items-center gap-1.5 ml-1 px-3 py-1.5 rounded-full border border-stone-300 hover:border-[#C9A87C] transition-all text-xs font-medium text-[#1A1A1A]"
                >
                  <FiUser size={14} className="text-[#C9A87C]" />
                  <span className="hidden sm:inline max-w-[80px] truncate">{userInfo.name?.split(' ')[0]}</span>
                </button>
                
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.18 }}
                      className="absolute right-0 mt-3 w-56 bg-white border border-stone-100 shadow-xl rounded-2xl overflow-hidden flex flex-col z-50 text-[#1A1A1A]"
                    >
                      <div className="px-5 py-3.5 border-b border-stone-100 bg-[#F9F7F5]">
                        <p className="text-[10px] uppercase tracking-wider text-stone-500 font-semibold">Signed in as</p>
                        <p className="text-sm font-semibold truncate text-[#1A1A1A]">{userInfo.email}</p>
                      </div>
                      <Link 
                        to="/profile" 
                        onClick={() => setDropdownOpen(false)}
                        className="px-5 py-3 text-xs font-medium text-stone-700 hover:bg-[#F9F7F5] hover:text-[#C9A87C] transition-colors flex items-center gap-3"
                      >
                        <FiUser size={15} /> My Profile & Orders
                      </Link>
                      {userInfo.isAdmin && (
                        <Link 
                          to="/admin/dashboard" 
                          onClick={() => setDropdownOpen(false)}
                          className="px-5 py-3 text-xs font-medium text-stone-700 hover:bg-[#F9F7F5] hover:text-[#C9A87C] transition-colors flex items-center gap-3 border-t border-stone-100"
                        >
                          <FiMenu size={15} /> Store Management
                        </Link>
                      )}
                      <div className="p-2 border-t border-stone-100">
                        <button 
                          onClick={logoutHandler}
                          className="w-full px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                          <FiLogOut size={14} /> Log out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="hidden sm:inline-flex ml-2 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-full transition-all border border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F9F7F5] text-[#1A1A1A]"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>

        {/* Slide-down Search Bar Drawer */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden border-t border-stone-200 bg-[#F9F7F5]"
            >
              <div className="container mx-auto px-6 py-4">
                <form onSubmit={handleSearchSubmit} className="relative max-w-2xl mx-auto flex items-center">
                  <FiSearch className="absolute left-4 text-stone-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search watches, rings, leather bags, sunglasses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    className="w-full pl-12 pr-28 py-3 bg-white rounded-full border border-stone-300 text-sm text-[#1A1A1A] placeholder-stone-400 focus:outline-none focus:border-[#C9A87C] focus:ring-1 focus:ring-[#C9A87C] shadow-sm"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 px-4 py-1.5 bg-[#1A1A1A] text-white text-xs uppercase tracking-wider font-semibold rounded-full hover:bg-[#C9A87C] transition-colors"
                  >
                    Search
                  </button>
                </form>
                <div className="flex items-center justify-center gap-4 mt-2.5 text-xs text-stone-500">
                  <span className="font-medium text-stone-600">Popular:</span>
                  {['Gold Rings', 'Leather Wallets', 'Minimal Watches', 'Sunglasses'].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => {
                        navigate(`/shop?keyword=${encodeURIComponent(tag)}`);
                        setSearchOpen(false);
                      }}
                      className="hover:text-[#C9A87C] transition-colors underline underline-offset-2"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Drawer (Left slide-in) */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 md:hidden"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-[#F9F7F5] z-50 md:hidden shadow-2xl flex flex-col justify-between"
            >
              <div>
                <div className="p-6 flex items-center justify-between border-b border-stone-200">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#1A1A1A] text-[#C9A87C] flex items-center justify-center font-bold text-sm">
                      SS
                    </div>
                    <span className="font-bold tracking-[0.2em] text-[#1A1A1A] text-base">
                      SHOPSTORE<span className="text-[#C9A87C]">.LK</span>
                    </span>
                  </div>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-stone-600 hover:text-[#1A1A1A] rounded-full focus:outline-none"
                  >
                    <FiX size={20} />
                  </button>
                </div>

                {/* Search in mobile drawer */}
                <div className="p-4 border-b border-stone-200">
                  <form onSubmit={handleSearchSubmit} className="relative">
                    <FiSearch className="absolute left-3.5 top-3 text-stone-400" size={16} />
                    <input
                      type="text"
                      placeholder="Search accessories..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-white rounded-lg border border-stone-200 text-sm focus:outline-none focus:border-[#C9A87C]"
                    />
                  </form>
                </div>

                {/* Nav Links */}
                <div className="p-6 space-y-4">
                  {[
                    { name: 'Home', path: '/' },
                    { name: 'Shop All Collection', path: '/shop' },
                    { name: 'Jewelry & Rings', path: '/shop?category=jewelry' },
                    { name: 'Luxury Watches', path: '/shop?category=watches' },
                    { name: 'Bags & Wallets', path: '/shop?category=bags' },
                    { name: 'About ShopStore', path: '/about' },
                    { name: 'Contact & Showroom', path: '/contact' }
                  ].map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between py-2 text-sm font-medium uppercase tracking-wider text-stone-800 hover:text-[#C9A87C] transition-colors border-b border-stone-200/50"
                    >
                      <span>{link.name}</span>
                      <FiArrowRight size={14} className="text-stone-400" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Bottom Support & Account */}
              <div className="p-6 border-t border-stone-200 bg-white">
                {userInfo ? (
                  <div className="space-y-3">
                    <p className="text-xs text-stone-500">Logged in as <span className="font-semibold text-stone-800">{userInfo.name}</span></p>
                    <Link
                      to="/profile"
                      onClick={() => setIsOpen(false)}
                      className="block w-full py-2.5 text-center text-xs uppercase tracking-wider font-semibold bg-stone-100 text-stone-800 rounded-lg"
                    >
                      My Profile & Orders
                    </Link>
                    <button
                      onClick={() => { logoutHandler(); setIsOpen(false); }}
                      className="block w-full py-2 text-center text-xs font-semibold text-rose-600"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="block w-full py-2.5 text-center text-xs uppercase tracking-widest font-semibold bg-[#1A1A1A] text-white rounded-lg hover:bg-[#C9A87C] transition-colors"
                    >
                      Sign In / Register
                    </Link>
                  </div>
                )}
                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                  <span>Sri Lanka Hotline:</span>
                  <a href="tel:0702809286" className="font-bold text-[#C9A87C]">070 280 9286</a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

