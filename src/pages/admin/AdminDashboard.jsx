import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiBox, FiUsers, FiShoppingBag, FiPackage } from 'react-icons/fi';
import useAuthStore from '../../store/useAuthStore';

const AdminDashboard = () => {
  const userInfo = useAuthStore((state) => state.userInfo);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-32 pb-24 bg-gray-50 min-h-screen"
    >
      <div className="container mx-auto px-6 max-w-6xl">
        <h1 className="text-3xl font-bold mb-2 uppercase tracking-widest text-premium-dark">Admin Dashboard</h1>
        <p className="text-gray-500 mb-10">Welcome back, {userInfo?.name || 'Admin'}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link to="/admin/products">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col items-center justify-center text-center group cursor-pointer h-48">
              <div className="bg-premium-light p-4 rounded-full mb-4 group-hover:bg-premium-accent group-hover:text-white transition-colors text-premium-dark">
                <FiBox size={32} />
              </div>
              <h2 className="text-xl font-bold text-premium-dark uppercase tracking-wider">Products</h2>
              <p className="text-gray-500 text-sm mt-2">Manage inventory & catalog</p>
            </div>
          </Link>
          
          <Link to="/admin/orders">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col items-center justify-center text-center group cursor-pointer h-48">
              <div className="bg-premium-light p-4 rounded-full mb-4 group-hover:bg-premium-accent group-hover:text-white transition-colors text-premium-dark">
                <FiShoppingBag size={32} />
              </div>
              <h2 className="text-xl font-bold text-premium-dark uppercase tracking-wider">Orders</h2>
              <p className="text-gray-500 text-sm mt-2">View & fulfill orders</p>
            </div>
          </Link>

          <Link 
            to="/admin/categories"
            className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md hover:border-premium-accent transition-all duration-300 group flex flex-col items-center justify-center text-center h-48"
          >
            <div className="w-16 h-16 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <FiPackage size={28} />
            </div>
            <h2 className="text-xl font-bold uppercase tracking-wider text-premium-dark mb-2">Categories</h2>
            <p className="text-gray-500 text-sm">Create and organize product categories</p>
          </Link>

          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 opacity-60 flex flex-col items-center justify-center text-center h-48">
            <div className="bg-gray-100 p-4 rounded-full mb-4 text-gray-400">
              <FiUsers size={32} />
            </div>
            <h2 className="text-xl font-bold text-gray-400 uppercase tracking-wider">Users (Coming Soon)</h2>
            <p className="text-gray-400 text-sm mt-2">Manage customer accounts</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;
