import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAuthStore from '../store/useAuthStore';
import SEOComponent from '../components/SEOComponent';
import toast from 'react-hot-toast';
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const userInfo = useAuthStore((state) => state.userInfo);
  const loading = useAuthStore((state) => state.loading);
  const error = useAuthStore((state) => state.error);
  const login = useAuthStore((state) => state.login);

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success('Welcome back to ShopStore.lk!');
    } catch (err) {
      toast.error(error || err.message || 'Invalid email or password');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="py-20 bg-[#F9F7F5] min-h-[85vh] flex justify-center items-center px-4"
    >
      <SEOComponent 
        title="Sign In | ShopStore.lk" 
        description="Sign in to your ShopStore.lk account to view your orders and track deliveries across Sri Lanka." 
      />

      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-stone-200/80 shadow-sm w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-10 h-10 rounded-xl bg-[#1A1A1A] text-[#C9A87C] flex items-center justify-center font-bold text-base mx-auto mb-4">
            SS
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C9A87C] block mb-1">
            Welcome Back
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A] tracking-tight">
            Sign In to ShopStore
          </h1>
          <p className="text-xs text-stone-500 mt-1">Access your saved wishlist & order history</p>
        </div>
        
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <FiMail className="absolute left-4 top-3.5 text-stone-400" size={16} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-[#F9F7F5] border border-stone-300 rounded-2xl text-xs text-[#1A1A1A] placeholder-stone-400 focus:outline-none focus:border-[#C9A87C]"
                required
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <FiLock className="absolute left-4 top-3.5 text-stone-400" size={16} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-[#F9F7F5] border border-stone-300 rounded-2xl text-xs text-[#1A1A1A] placeholder-stone-400 focus:outline-none focus:border-[#C9A87C]"
                required
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-[#1A1A1A] hover:bg-[#C9A87C] text-white text-xs font-bold uppercase tracking-[0.18em] transition-all duration-300 shadow-md hover:shadow-xl flex items-center justify-center gap-2 group disabled:opacity-50 mt-6"
          >
            <span>{loading ? 'Verifying...' : 'Sign In'}</span>
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-stone-100 text-center text-xs text-stone-500">
          New to ShopStore?{' '}
          <Link 
            to={redirect ? `/register?redirect=${redirect}` : '/register'} 
            className="text-[#C9A87C] font-bold hover:underline uppercase tracking-wider"
          >
            Create Account
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;

