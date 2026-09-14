import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCheck, FiClock, FiUser, FiPackage, FiArrowRight, FiShield } from 'react-icons/fi';
import useAuthStore from '../store/useAuthStore';
import SEOComponent from '../components/SEOComponent';
import toast from 'react-hot-toast';
import axios from 'axios';

const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  const navigate = useNavigate();

  const userInfo = useAuthStore((state) => state.userInfo);
  const loading = useAuthStore((state) => state.loading);
  const updateProfile = useAuthStore((state) => state.updateProfile);

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
      
      const fetchMyOrders = async () => {
        try {
          const config = {
            headers: { Authorization: `Bearer ${userInfo.token}` }
          };
          const { data } = await axios.get('/api/orders/myorders', config);
          setOrders(data);
          setOrdersLoading(false);
        } catch (error) {
          toast.error(error.response?.data?.message || 'Failed to load order history');
          setOrdersLoading(false);
        }
      };
      fetchMyOrders();
    }
  }, [userInfo, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      await updateProfile({ id: userInfo._id, name, email, password: password || undefined });
      toast.success('Your profile has been updated!');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      toast.error(err.message || 'Error updating profile');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="pt-8 pb-24 bg-[#F9F7F5] min-h-screen"
    >
      <SEOComponent 
        title="My Account | ShopStore.lk" 
        description="Manage your account profile and view your past orders at ShopStore.lk." 
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        {/* Header Banner */}
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-stone-200/80 shadow-sm mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#1A1A1A] text-[#C9A87C] flex items-center justify-center font-bold text-xl shadow-md">
              {userInfo?.name ? userInfo.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C9A87C] block mb-0.5">
                VIP Client Account
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A]">
                {userInfo?.name}
              </h1>
              <p className="text-xs text-stone-500 font-light">{userInfo?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link 
              to="/shop" 
              className="flex-1 sm:flex-none px-6 py-3 rounded-full bg-[#1A1A1A] hover:bg-[#C9A87C] text-white text-xs font-bold uppercase tracking-wider transition-colors text-center"
            >
              Browse Catalog
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Profile Settings (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/80 shadow-sm">
              <div className="flex items-center gap-3 pb-4 mb-6 border-b border-stone-100">
                <div className="p-2 rounded-xl bg-[#F9F7F5] text-[#C9A87C]">
                  <FiUser size={18} />
                </div>
                <h2 className="text-base font-bold text-[#1A1A1A] uppercase tracking-wider">
                  Account Details
                </h2>
              </div>

              <form onSubmit={submitHandler} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                    Your Name
                  </label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-[#F9F7F5] border border-stone-300 rounded-2xl text-xs text-[#1A1A1A] focus:outline-none focus:border-[#C9A87C]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-[#F9F7F5] border border-stone-300 rounded-2xl text-xs text-[#1A1A1A] focus:outline-none focus:border-[#C9A87C]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                    New Password (Optional)
                  </label>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-[#F9F7F5] border border-stone-300 rounded-2xl text-xs text-[#1A1A1A] placeholder-stone-400 focus:outline-none focus:border-[#C9A87C]"
                    placeholder="Leave blank to keep unchanged"
                  />
                </div>

                {password && (
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                      Confirm New Password
                    </label>
                    <input 
                      type="password" 
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-[#F9F7F5] border border-stone-300 rounded-2xl text-xs text-[#1A1A1A] focus:outline-none focus:border-[#C9A87C]"
                      placeholder="Repeat new password"
                    />
                  </div>
                )}

                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-2xl bg-[#1A1A1A] hover:bg-[#C9A87C] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-md disabled:opacity-50 mt-4"
                >
                  {loading ? 'Saving Updates...' : 'Save Profile Changes'}
                </button>
              </form>
            </div>
          </div>

          {/* Order History (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/80 shadow-sm">
              <div className="flex items-center gap-3 pb-4 mb-6 border-b border-stone-100">
                <div className="p-2 rounded-xl bg-[#F9F7F5] text-[#C9A87C]">
                  <FiPackage size={18} />
                </div>
                <h2 className="text-base font-bold text-[#1A1A1A] uppercase tracking-wider">
                  Order History ({orders.length})
                </h2>
              </div>
              
              {ordersLoading ? (
                <div className="py-12 text-center text-xs uppercase tracking-widest text-stone-400 animate-pulse">
                  Retrieving your orders...
                </div>
              ) : orders.length === 0 ? (
                <div className="text-center py-12 bg-[#F9F7F5] rounded-2xl p-6">
                  <FiPackage size={28} className="mx-auto text-stone-400 mb-2" />
                  <p className="text-xs text-stone-600 mb-4">You haven't placed any orders yet.</p>
                  <Link 
                    to="/shop" 
                    className="inline-block px-6 py-2.5 rounded-full bg-[#1A1A1A] text-white text-xs font-bold uppercase tracking-wider"
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div 
                      key={order._id} 
                      className="p-5 rounded-2xl bg-[#F9F7F5] border border-stone-200/70 hover:border-[#C9A87C] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-[#1A1A1A]">
                            Order #{order._id.substring(0, 8).toUpperCase()}
                          </span>
                          <span className="text-[10px] text-stone-400">
                            • {order.createdAt?.substring(0, 10)}
                          </span>
                        </div>
                        
                        <p className="text-xs font-bold text-[#C9A87C] mb-2">
                          LKR {Number(order.totalPrice).toLocaleString()}
                        </p>

                        <div className="flex items-center gap-3 text-[11px]">
                          <span className={`inline-flex items-center gap-1 font-semibold ${
                            order.isPaid ? 'text-emerald-700' : 'text-amber-700'
                          }`}>
                            {order.isPaid ? <FiCheck size={12} /> : <FiClock size={12} />}
                            {order.isPaid ? 'Paid' : 'Payment Pending'}
                          </span>

                          <span className={`inline-flex items-center gap-1 font-semibold ${
                            order.isDelivered ? 'text-emerald-700' : 'text-stone-600'
                          }`}>
                            {order.isDelivered ? <FiCheck size={12} /> : <FiTruck size={12} />}
                            {order.isDelivered ? 'Delivered' : 'Dispatched / In Transit'}
                          </span>
                        </div>
                      </div>

                      <Link 
                        to={`/order/${order._id}`} 
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-stone-300 text-xs font-bold text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors flex-shrink-0"
                      >
                        <span>View Details</span>
                        <FiArrowRight size={13} />
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </motion.div>
  );
};

export default Profile;

