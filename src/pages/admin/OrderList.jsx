import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiX } from 'react-icons/fi';
import useAuthStore from '../../store/useAuthStore';
import toast from 'react-hot-toast';
import axios from 'axios';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const userInfo = useAuthStore((state) => state.userInfo);

  const fetchOrders = useCallback(async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${userInfo.token}` }
      };
      const { data } = await axios.get('/api/orders', config);
      setOrders(data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setLoading(false);
    }
  }, [userInfo.token]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const markAsDelivered = async (id) => {
    try {
      const config = {
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}` 
        }
      };
      await axios.put(`/api/orders/${id}/status`, { status: 'Delivered' }, config);
      toast.success('Order marked as delivered');
      fetchOrders();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
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
      <div className="container mx-auto px-6 max-w-6xl">
        <h1 className="text-3xl font-bold uppercase tracking-widest text-premium-dark mb-8">Orders</h1>

        {loading ? (
          <div className="text-premium-accent text-xl animate-pulse">Loading orders...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-sm uppercase tracking-wider text-gray-500 font-semibold">
                    <th className="p-4">ID</th>
                    <th className="p-4">User</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Total</th>
                    <th className="p-4">Paid</th>
                    <th className="p-4">Delivered</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {orders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 text-sm text-gray-500">{order._id.substring(0, 8)}...</td>
                      <td className="p-4 font-medium text-premium-dark">{order.user && order.user.name}</td>
                      <td className="p-4 text-gray-600">{order.createdAt.substring(0, 10)}</td>
                      <td className="p-4 text-gray-600">LKR {order.totalPrice.toFixed(2)}</td>
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
                      <td className="p-4 text-center">
                        {!order.isDelivered && (
                          <button 
                            onClick={() => markAsDelivered(order._id)}
                            className="bg-premium-dark text-white px-3 py-1 text-xs rounded hover:bg-premium-accent transition-colors uppercase tracking-wider"
                          >
                            Mark Delivered
                          </button>
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
    </motion.div>
  );
};

export default OrderList;
