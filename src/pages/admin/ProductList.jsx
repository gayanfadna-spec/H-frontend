import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';
import useProductStore from '../../store/useProductStore';
import useAuthStore from '../../store/useAuthStore';
import toast from 'react-hot-toast';
import axios from 'axios';

const ProductList = () => {
  const { products, loading, error, fetchProducts } = useProductStore();
  const userInfo = useAuthStore((state) => state.userInfo);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const createProductHandler = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${userInfo.token}` }
      };
      const { data } = await axios.post('/api/products', {}, config);
      toast.success('Sample product created successfully');
      navigate(`/admin/product/${data._id}/edit`);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const config = {
          headers: { Authorization: `Bearer ${userInfo.token}` }
        };
        await axios.delete(`/api/products/${id}`, config);
        toast.success('Product deleted');
        fetchProducts();
      } catch (err) {
        toast.error(err.response?.data?.message || err.message);
      }
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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold uppercase tracking-widest text-premium-dark">Products</h1>
          <button 
            onClick={createProductHandler}
            className="bg-premium-dark text-white px-6 py-3 rounded-sm font-semibold tracking-wider hover:bg-premium-accent transition-colors flex items-center gap-2 uppercase text-sm"
          >
            <FiPlus /> Create Product
          </button>
        </div>

        {loading ? (
          <div className="text-premium-accent text-xl animate-pulse">Loading products...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-sm uppercase tracking-wider text-gray-500 font-semibold">
                    <th className="p-4">ID</th>
                    <th className="p-4">Name</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Brand</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {products.map((product) => (
                    <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 text-sm text-gray-500">{product._id.substring(0, 8)}...</td>
                      <td className="p-4 font-medium text-premium-dark">{product.name}</td>
                      <td className="p-4 text-gray-600">LKR {product.price.toFixed(2)}</td>
                      <td className="p-4 text-gray-600">{product.category?.name || 'N/A'}</td>
                      <td className="p-4 text-gray-600">{product.brand}</td>
                      <td className="p-4 flex justify-center gap-3">
                        <Link to={`/admin/product/${product._id}/edit`}>
                          <button className="text-blue-500 hover:text-blue-700 bg-blue-50 p-2 rounded transition-colors" title="Edit">
                            <FiEdit />
                          </button>
                        </Link>
                        <button 
                          onClick={() => deleteHandler(product._id)}
                          className="text-red-500 hover:text-red-700 bg-red-50 p-2 rounded transition-colors" title="Delete"
                        >
                          <FiTrash2 />
                        </button>
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

export default ProductList;
