import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCheck, FiX } from 'react-icons/fi';
import useAuthStore from '../store/useAuthStore';
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
      
      // Fetch user's orders
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
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      await updateProfile({ id: userInfo._id, name, email, password });
      toast.success('Profile updated successfully');
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
      transition={{ duration: 0.5 }}
      className="pt-32 pb-24 bg-gray-50 min-h-screen"
    >
      <div className="container mx-auto px-6 max-w-6xl flex flex-col lg:flex-row gap-12">
        
        {/* Profile Settings */}
        <div className="lg:w-1/3">
          <h2 className="text-2xl font-bold mb-6 uppercase tracking-widest text-premium-dark border-b pb-4">Settings</h2>
          <form onSubmit={submitHandler} className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wider">Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-premium-accent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wider">Email</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-premium-accent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wider">New Password</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-premium-accent"
                  placeholder="Leave blank to keep current"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wider">Confirm New Password</label>
                <input 
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-premium-accent"
                />
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-premium-dark text-white py-4 font-semibold tracking-wider hover:bg-premium-accent transition-colors uppercase disabled:bg-gray-400"
              >
                {loading ? 'Updating...' : 'Update Profile'}
              </button>
            </div>
          </form>
        </div>

        {/* Order History */}
        <div className="lg:w-2/3">
          <h2 className="text-2xl font-bold mb-6 uppercase tracking-widest text-premium-dark border-b pb-4">Order History</h2>
          
          {ordersLoading ? (
            <div className="text-premium-accent text-xl animate-pulse">Loading orders...</div>
          ) : orders.length === 0 ? (
            <div className="bg-white p-10 rounded-lg shadow-sm border border-gray-100 text-center">
              <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
              <button 
                onClick={() => navigate('/shop')}
                className="bg-premium-dark text-white px-6 py-3 font-semibold tracking-wider hover:bg-premium-accent transition-colors uppercase text-sm"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200 text-sm uppercase tracking-wider text-gray-500 font-semibold">
                      <th className="p-4">ID</th>
                      <th className="p-4">Date</th>
                      <th className="p-4">Total</th>
                      <th className="p-4">Paid</th>
                      <th className="p-4">Delivered</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {orders.map((order) => (
                      <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                        <td className="p-4 text-sm text-gray-500">{order._id.substring(0, 8)}...</td>
                        <td className="p-4 text-gray-600">{order.createdAt.substring(0, 10)}</td>
                        <td className="p-4 text-gray-600">${order.totalPrice.toFixed(2)}</td>
                        <td className="p-4">
                          {order.isPaid ? (
                            <span className="text-green-500 flex items-center gap-1"><FiCheck /> {order.paidAt.substring(0, 10)}</span>
                          ) : (
                            <span className="text-red-500"><FiX /></span>
                          )}
                        </td>
                        <td className="p-4">
                          {order.isDelivered ? (
                            <span className="text-green-500 flex items-center gap-1"><FiCheck /> {order.deliveredAt.substring(0, 10)}</span>
                          ) : (
                            <span className="text-red-500"><FiX /></span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

      </div>
    </motion.div>
  );
};

export default Profile;
