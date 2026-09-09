import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft } from 'react-icons/fi';
import useAuthStore from '../../store/useAuthStore';
import useCategoryStore from '../../store/useCategoryStore';
import toast from 'react-hot-toast';
import axios from 'axios';

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const userInfo = useAuthStore((state) => state.userInfo);

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [images, setImages] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);

  const { categories, fetchCategories } = useCategoryStore();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${id}`);
        setName(data.name);
        setPrice(data.price);
        setImages(data.images.join(', '));
        setBrand(data.brand);
        setCategory(data.category?._id || '');
        setCountInStock(data.countInStock);
        setDescription(data.description);
        setLoading(false);
      } catch (err) {
        toast.error(err.response?.data?.message || 'Error fetching product details');
        setLoading(false);
      }
    };
    fetchProduct();
    fetchCategories();
  }, [id, fetchCategories]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}` 
        }
      };
      
      const updatedProduct = {
        name,
        price,
        images: images.split(',').map(img => img.trim()),
        brand,
        category: category || null, // Allow null if not selected
        countInStock,
        description,
      };

      await axios.put(`/api/products/${id}`, updatedProduct, config);
      toast.success('Product updated successfully');
      navigate('/admin/products');
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
      <div className="container mx-auto px-6 max-w-3xl">
        <Link to="/admin/products" className="inline-flex items-center text-gray-500 hover:text-premium-accent transition-colors mb-8 uppercase tracking-widest text-sm font-semibold">
          <FiArrowLeft className="mr-2" /> Back to Products
        </Link>
        
        <h1 className="text-3xl font-bold uppercase tracking-widest text-premium-dark mb-8">Edit Product</h1>

        {loading ? (
          <div className="text-premium-accent text-xl animate-pulse">Loading product details...</div>
        ) : (
          <form onSubmit={submitHandler} className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-premium-accent"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
                  <input 
                    type="number" 
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-premium-accent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Count In Stock</label>
                  <input 
                    type="number" 
                    value={countInStock}
                    onChange={(e) => setCountInStock(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-premium-accent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image URLs (comma separated)</label>
                <input 
                  type="text" 
                  value={images}
                  onChange={(e) => setImages(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-premium-accent"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                  <input 
                    type="text" 
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-premium-accent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-premium-accent bg-white"
                  >
                    <option value="">Select a Category (Optional)</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-premium-accent"
                  required
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full bg-premium-dark text-white py-4 font-semibold tracking-wider hover:bg-premium-accent transition-colors uppercase mt-6"
              >
                Update Product
              </button>
            </div>
          </form>
        )}
      </div>
    </motion.div>
  );
};

export default ProductEdit;
