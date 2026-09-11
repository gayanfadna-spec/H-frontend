import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';
import axios from 'axios';
import useCategoryStore from '../../store/useCategoryStore';

const CategoryList = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);
  
  const { categories, loading, fetchCategories, createCategory, deleteCategory } = useCategoryStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post('/api/upload', formData, config);
      setImage(data);
      toast.success('Image uploaded successfully');
      setUploading(false);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      setUploading(false);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!name) {
      toast.error('Category name is required');
      return;
    }
    
    try {
      await createCategory({ name, description, image });
      toast.success('Category created successfully');
      setName('');
      setDescription('');
      setImage('');
    } catch (err) {
      toast.error(err.message || 'Error creating category');
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await deleteCategory(id);
        toast.success('Category deleted');
      } catch (err) {
        toast.error(err.message || 'Error deleting category');
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 bg-gray-50 min-h-screen"
    >
      <div className="container mx-auto px-6 max-w-6xl">
        <h1 className="text-3xl font-bold mb-8 uppercase tracking-widest text-premium-dark">Manage Categories</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Create Category Form */}
          <div className="lg:w-1/3">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold mb-6 uppercase tracking-wider text-premium-dark border-b pb-4">New Category</h2>
              <form onSubmit={submitHandler} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wider">Name *</label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-premium-accent"
                    placeholder="e.g. Watches"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wider">Description</label>
                  <textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-premium-accent"
                    placeholder="Optional description"
                    rows="3"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wider">Image URL</label>
                  <input 
                    type="text" 
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-premium-accent mb-2"
                    placeholder="Optional image URL"
                  />
                  <input
                    type="file"
                    id="image-file"
                    onChange={uploadFileHandler}
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-premium-light file:text-premium-dark hover:file:bg-gray-200 cursor-pointer"
                  />
                  {uploading && <p className="text-sm text-gray-500 mt-2">Uploading...</p>}
                </div>

                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-premium-dark text-white py-3 font-semibold tracking-wider hover:bg-premium-accent transition-colors uppercase disabled:bg-gray-400 flex justify-center items-center gap-2"
                >
                  <FiPlus /> {loading ? 'Creating...' : 'Add Category'}
                </button>
              </form>
            </div>
          </div>

          {/* Categories List */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              {loading && categories.length === 0 ? (
                <div className="p-8 text-center text-gray-500">Loading categories...</div>
              ) : categories.length === 0 ? (
                <div className="p-8 text-center text-gray-500">No categories found. Create one to get started!</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200 text-sm uppercase tracking-wider text-gray-500 font-semibold">
                        <th className="p-4">ID</th>
                        <th className="p-4">Name</th>
                        <th className="p-4">Description</th>
                        <th className="p-4 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {categories.map((category) => (
                        <tr key={category._id} className="hover:bg-gray-50 transition-colors">
                          <td className="p-4 text-sm text-gray-500">{category._id}</td>
                          <td className="p-4 font-medium text-premium-dark">{category.name}</td>
                          <td className="p-4 text-sm text-gray-500 truncate max-w-xs">{category.description || '-'}</td>
                          <td className="p-4 text-center">
                            <button 
                              onClick={() => deleteHandler(category._id)}
                              className="text-red-500 hover:text-red-700 p-2"
                              title="Delete Category"
                            >
                              <FiTrash2 />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default CategoryList;
