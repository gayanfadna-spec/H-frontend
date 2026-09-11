import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import useProductStore from '../store/useProductStore';
import useCategoryStore from '../store/useCategoryStore';
import { FiSearch } from 'react-icons/fi';

const Shop = () => {
  const { products, loading, error, fetchProducts } = useProductStore();
  const { categories, fetchCategories } = useCategoryStore();

  const [keyword, setKeyword] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('newest');

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchProducts({ keyword, category, sort });
  }, [fetchProducts, keyword, category, sort]);

  const handleSearch = (e) => {
    e.preventDefault();
    setKeyword(searchInput);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-24 pb-12 bg-premium-light min-h-screen"
    >
      <div className="container mx-auto px-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-8 uppercase tracking-widest text-premium-dark text-center">
          The <span className="text-premium-accent italic">Collection</span>
        </h1>
        
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 pb-6 border-b border-gray-200 gap-6">
          <form onSubmit={handleSearch} className="relative w-full md:w-1/3">
            <input 
              type="text"
              placeholder="Search products..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-premium-accent"
            />
            <button type="submit" className="absolute left-3 top-3 text-gray-400">
              <FiSearch />
            </button>
          </form>

          <div className="flex space-x-4 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            <button 
              onClick={() => setCategory('')} 
              className={`font-medium pb-1 whitespace-nowrap ${category === '' ? 'text-premium-dark border-b-2 border-premium-accent' : 'text-gray-500 hover:text-premium-dark'}`}
            >
              All
            </button>
            {categories && categories.map(c => (
              <button 
                key={c._id}
                onClick={() => setCategory(c._id)} 
                className={`font-medium pb-1 whitespace-nowrap ${category === c._id ? 'text-premium-dark border-b-2 border-premium-accent' : 'text-gray-500 hover:text-premium-dark'}`}
              >
                {c.name}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2 w-full md:w-auto">
            <span className="text-sm text-gray-500 whitespace-nowrap">Sort By:</span>
            <select 
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-transparent text-premium-dark outline-none font-medium text-sm cursor-pointer border border-gray-300 rounded p-1"
            >
              <option value="newest">New Arrivals</option>
              <option value="lowest">Price: Low to High</option>
              <option value="highest">Price: High to Low</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-premium-accent text-xl animate-pulse">Curating pieces...</div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 p-10 bg-red-50 rounded-lg">{error}</div>
        ) : products.length === 0 ? (
          <div className="text-center text-gray-500 p-10">No products found in the collection.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Shop;
