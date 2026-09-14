import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import useProductStore from '../store/useProductStore';
import useCategoryStore from '../store/useCategoryStore';
import SEOComponent from '../components/SEOComponent';
import { FiSearch, FiSliders, FiX, FiCheck, FiChevronRight } from 'react-icons/fi';

const Shop = () => {
  const { products, loading, error, fetchProducts } = useProductStore();
  const { categories, fetchCategories } = useCategoryStore();
  
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const initialCategory = searchParams.get('category') || '';
  const initialKeyword = searchParams.get('keyword') || '';

  const [keyword, setKeyword] = useState(initialKeyword);
  const [searchInput, setSearchInput] = useState(initialKeyword);
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState('newest');

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat !== null) {
      setCategory(cat);
    }
    const kw = searchParams.get('keyword');
    if (kw !== null) {
      setKeyword(kw);
      setSearchInput(kw);
    }
  }, [location.search]);

  useEffect(() => {
    fetchProducts({ keyword, category, sort });
  }, [fetchProducts, keyword, category, sort]);

  const handleSearch = (e) => {
    e.preventDefault();
    setKeyword(searchInput);
  };

  const handleClearFilters = () => {
    setKeyword('');
    setSearchInput('');
    setCategory('');
    setSort('newest');
    navigate('/shop');
  };

  // Find active category label
  const activeCategoryObj = categories?.find(c => c._id === category || c.slug === category);
  const activeCategoryName = activeCategoryObj ? activeCategoryObj.name : (category ? category.charAt(0).toUpperCase() + category.slice(1) : 'All Accessories');

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-[#F9F7F5] min-h-screen pt-8 pb-20"
    >
      <SEOComponent 
        title={`${activeCategoryName} | ShopStore.lk`} 
        description={`Explore our collection of ${activeCategoryName.toLowerCase()} with islandwide delivery across Sri Lanka. Modern fashion accessories at ShopStore.lk.`} 
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-stone-500 mb-6 uppercase tracking-wider">
          <Link to="/" className="hover:text-[#C9A87C] transition-colors">Home</Link>
          <FiChevronRight size={12} />
          <Link to="/shop" className="hover:text-[#C9A87C] transition-colors">Shop</Link>
          {category && (
            <>
              <FiChevronRight size={12} />
              <span className="text-[#1A1A1A] font-semibold">{activeCategoryName}</span>
            </>
          )}
        </nav>

        {/* Header Title Banner */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C9A87C] block mb-2">
            Sri Lanka's Curated Catalog
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#1A1A1A] mb-4">
            {activeCategoryName}
          </h1>
          <p className="text-sm text-stone-600 font-light leading-relaxed max-w-xl mx-auto">
            Discover modern handcrafted jewelry, precision watches, and luxury lifestyle accessories. Free shipping across Sri Lanka on orders over LKR 7,500.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-2xl border border-stone-200/80 shadow-sm p-4 sm:p-5 mb-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            
            {/* Search Box */}
            <form onSubmit={handleSearch} className="relative w-full lg:w-80">
              <FiSearch className="absolute left-3.5 top-3.5 text-stone-400" size={16} />
              <input 
                type="text"
                placeholder="Search pieces..."
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  setKeyword(e.target.value);
                }}
                className="w-full pl-10 pr-9 py-2.5 text-xs bg-[#F9F7F5] rounded-xl border border-stone-200 text-[#1A1A1A] placeholder-stone-400 focus:outline-none focus:border-[#C9A87C]"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchInput('');
                    setKeyword('');
                  }}
                  className="absolute right-3 top-3 text-stone-400 hover:text-stone-700"
                >
                  <FiX size={14} />
                </button>
              )}
            </form>

            {/* Category Segmented Scroll */}
            <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-hide">
              <button 
                onClick={() => setCategory('')} 
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
                  category === '' 
                    ? 'bg-[#1A1A1A] text-white shadow-sm' 
                    : 'bg-[#F9F7F5] text-stone-700 hover:text-[#1A1A1A] hover:bg-stone-200/60'
                }`}
              >
                All Pieces
              </button>
              {categories && categories.map((c) => (
                <button 
                  key={c._id}
                  onClick={() => setCategory(c._id)} 
                  className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
                    category === c._id 
                      ? 'bg-[#1A1A1A] text-white shadow-sm' 
                      : 'bg-[#F9F7F5] text-stone-700 hover:text-[#1A1A1A] hover:bg-stone-200/60'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 w-full lg:w-auto justify-end">
              <span className="text-xs font-medium text-stone-500 whitespace-nowrap">Sort:</span>
              <select 
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="bg-[#F9F7F5] text-[#1A1A1A] text-xs font-semibold rounded-xl border border-stone-200 py-2.5 px-3 outline-none cursor-pointer focus:border-[#C9A87C]"
              >
                <option value="newest">Newest Arrivals</option>
                <option value="lowest">Price: Low to High</option>
                <option value="highest">Price: High to Low</option>
              </select>
            </div>

          </div>

          {/* Active Filter Tags */}
          {(keyword || category) && (
            <div className="flex items-center gap-2 mt-4 pt-3 border-t border-stone-100 text-xs">
              <span className="text-stone-500 font-medium">Active filters:</span>
              {keyword && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-stone-100 text-stone-800 rounded-full">
                  Keyword: "{keyword}"
                  <button onClick={() => { setKeyword(''); setSearchInput(''); }}><FiX size={12} /></button>
                </span>
              )}
              {category && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-stone-100 text-stone-800 rounded-full">
                  {activeCategoryName}
                  <button onClick={() => setCategory('')}><FiX size={12} /></button>
                </span>
              )}
              <button 
                onClick={handleClearFilters}
                className="text-[#C9A87C] hover:underline font-semibold ml-2"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Product Count */}
        <div className="flex justify-between items-center mb-6 text-xs text-stone-500">
          <span>Showing <strong className="text-[#1A1A1A]">{products.length}</strong> crafted accessories</span>
          <span className="hidden sm:inline">Islandwide Express Courier</span>
        </div>

        {/* Product Grid Content */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 animate-pulse">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-80 bg-stone-200/70 rounded-2xl" />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-red-100 p-8">
            <p className="text-rose-500 font-medium mb-4">{error}</p>
            <button 
              onClick={() => fetchProducts()}
              className="px-6 py-2.5 rounded-full bg-[#1A1A1A] text-white text-xs uppercase tracking-wider"
            >
              Retry
            </button>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-stone-200 p-8 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#F9F7F5] flex items-center justify-center mx-auto text-stone-400 mb-4">
              <FiSearch size={24} />
            </div>
            <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">No Accessories Found</h3>
            <p className="text-xs text-stone-500 mb-6">
              We couldn't find any pieces matching your current search or category filter.
            </p>
            <button 
              onClick={handleClearFilters}
              className="px-6 py-3 rounded-full bg-[#1A1A1A] hover:bg-[#C9A87C] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-md"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
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

