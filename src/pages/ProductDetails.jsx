import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiShoppingBag, 
  FiHeart, 
  FiMinus, 
  FiPlus, 
  FiTruck, 
  FiShield, 
  FiRefreshCw, 
  FiCheck, 
  FiStar,
  FiChevronRight,
  FiShare2
} from 'react-icons/fi';
import useProductStore from '../store/useProductStore';
import useCartStore from '../store/useCartStore';
import useWishlistStore from '../store/useWishlistStore';
import useAuthStore from '../store/useAuthStore';
import ProductCard from '../components/ProductCard';
import SEOComponent from '../components/SEOComponent';
import toast from 'react-hot-toast';
import { getImageUrl } from '../utils/getImageUrl';

const finishes = [
  { name: 'Rose Gold', color: '#D4AF37' },
  { name: '18K Yellow Gold', color: '#E5C158' },
  { name: 'Sterling Silver', color: '#D1D5DB' },
  { name: 'Midnight Black', color: '#1F2937' }
];

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState('');
  const [selectedFinish, setSelectedFinish] = useState(finishes[0].name);
  const [zoomStyle, setZoomStyle] = useState({ transformOrigin: 'center center', transform: 'scale(1)' });
  const [isZoomed, setIsZoomed] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  const mainCtaRef = useRef(null);
  
  const { product, products, loading, error, fetchProductDetails, fetchProducts, createReview } = useProductStore();
  const addToCart = useCartStore((state) => state.addToCart);
  const addToWishlist = useWishlistStore((state) => state.addToWishlist);
  const wishlistItems = useWishlistStore((state) => state.wishlistItems);
  const userInfo = useAuthStore((state) => state.userInfo);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProductDetails(id);
    if (!products || products.length === 0) {
      fetchProducts();
    }
  }, [id, fetchProductDetails, fetchProducts]);

  useEffect(() => {
    if (product && product.images && product.images.length > 0) {
      setActiveImage(product.images[0]);
    }
  }, [product]);

  // Observer for Sticky Add to Cart bar on mobile
  useEffect(() => {
    const handleScroll = () => {
      if (mainCtaRef.current) {
        const rect = mainCtaRef.current.getBoundingClientRect();
        // If the main CTA has scrolled past the viewport
        setShowStickyBar(rect.bottom < 0);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, qty);
    toast.success(`${product.name} added to your bag`, {
      style: {
        background: '#1A1A1A',
        color: '#F9F7F5',
        borderRadius: '12px'
      }
    });
  };

  const handleWishlist = () => {
    if (!product) return;
    const isAdded = addToWishlist(product);
    if (isAdded) {
      toast.success('Saved to your wishlist');
    } else {
      toast.success('Removed from your wishlist');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.name,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Product link copied to clipboard!');
    }
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setIsZoomed(true);
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: 'scale(2.2)'
    });
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
    setZoomStyle({
      transformOrigin: 'center center',
      transform: 'scale(1)'
    });
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewComment.trim()) {
      toast.error('Please write a short comment about your experience');
      return;
    }
    setSubmittingReview(true);
    try {
      await createReview(product._id, {
        rating: reviewRating,
        comment: reviewComment
      });
      toast.success('Thank you! Your review has been posted.');
      setReviewComment('');
      fetchProductDetails(product._id);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Error submitting review');
    } finally {
      setSubmittingReview(false);
    }
  };

  const isWishlisted = product && wishlistItems.some((item) => item._id === product._id);
  const relatedProducts = products ? products.filter((p) => p._id !== id).slice(0, 4) : [];

  if (loading) {
    return (
      <div className="pt-32 pb-24 min-h-[70vh] flex flex-col justify-center items-center bg-[#F9F7F5]">
        <div className="w-10 h-10 border-2 border-[#1A1A1A] border-t-[#C9A87C] rounded-full animate-spin mb-4" />
        <p className="text-xs uppercase tracking-[0.2em] text-stone-500 font-semibold">
          Curating piece details...
        </p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="pt-32 pb-24 min-h-[70vh] container mx-auto px-6 text-center bg-[#F9F7F5]">
        <h2 className="text-2xl font-bold text-[#1A1A1A] mb-3">{error || 'Accessory Not Found'}</h2>
        <p className="text-stone-500 text-sm mb-6">The item you are looking for might have moved or is unavailable.</p>
        <Link 
          to="/shop" 
          className="inline-block px-8 py-3 rounded-full bg-[#1A1A1A] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#C9A87C] transition-colors"
        >
          Return to Collection
        </Link>
      </div>
    );
  }

  const discountPercent = product.originalPrice && product.originalPrice > product.price 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-[#F9F7F5] min-h-screen pt-8 pb-24"
    >
      <SEOComponent 
        title={`${product.name} | ShopStore.lk`} 
        description={product.description?.substring(0, 150) || `Buy ${product.name} at ShopStore.lk with islandwide delivery across Sri Lanka.`} 
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-stone-500 mb-8 uppercase tracking-wider flex-wrap">
          <Link to="/" className="hover:text-[#C9A87C] transition-colors">Home</Link>
          <FiChevronRight size={12} />
          <Link to="/shop" className="hover:text-[#C9A87C] transition-colors">Shop</Link>
          <FiChevronRight size={12} />
          <span className="text-[#1A1A1A] font-semibold truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Product Hero Section (Image Gallery + Info) */}
        <div className="bg-white rounded-3xl border border-stone-200/80 p-6 sm:p-10 shadow-sm mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            
            {/* Left: Image Gallery (7 cols on lg) */}
            <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
              
              {/* Thumbnail Strip */}
              {product.images && product.images.length > 1 && (
                <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[550px] scrollbar-hide py-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`w-16 h-20 sm:w-20 sm:h-24 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                        activeImage === img ? 'border-[#C9A87C] shadow-md scale-95' : 'border-stone-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img 
                        src={getImageUrl(img)} 
                        alt={`${product.name} angle ${idx + 1}`} 
                        className="w-full h-full object-cover" 
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Primary Zoomable Image */}
              <div 
                className="relative flex-grow aspect-[4/5] sm:aspect-square md:aspect-[4/5] max-h-[600px] rounded-3xl overflow-hidden bg-stone-100 cursor-crosshair border border-stone-100"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <img 
                  src={getImageUrl(activeImage || product.images?.[0])} 
                  alt={product.name} 
                  style={zoomStyle}
                  className="w-full h-full object-cover transition-transform duration-150 ease-out"
                />

                {/* Floating Badges */}
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-2 pointer-events-none">
                  {product.isNewArrival && (
                    <span className="bg-[#1A1A1A] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-md">
                      New Arrival
                    </span>
                  )}
                  {discountPercent > 0 && (
                    <span className="bg-[#C9A87C] text-[#1A1A1A] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                      SAVE {discountPercent}%
                    </span>
                  )}
                </div>

                {/* Share Button */}
                <button
                  onClick={handleShare}
                  className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/80 hover:bg-white text-stone-700 hover:text-[#C9A87C] shadow-sm backdrop-blur-sm transition-colors"
                  title="Share piece"
                >
                  <FiShare2 size={16} />
                </button>

                {!isZoomed && (
                  <div className="hidden sm:block absolute bottom-4 right-4 bg-black/40 backdrop-blur-md text-white text-[10px] uppercase tracking-wider px-3 py-1 rounded-full pointer-events-none">
                    Hover to Zoom
                  </div>
                )}
              </div>

            </div>

            {/* Right: Product Details & Purchase Actions (5 cols on lg) */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                
                {/* Brand & Category */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C9A87C]">
                    {product.brand || 'ShopStore.lk'}
                  </span>
                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                    product.countInStock > 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-600'
                  }`}>
                    {product.countInStock > 0 ? 'In Stock (Colombo HQ)' : 'Sold Out'}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#1A1A1A] mb-3">
                  {product.name}
                </h1>

                {/* Ratings Overview */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex text-[#C9A87C]">
                    {[...Array(5)].map((_, i) => (
                      <FiStar 
                        key={i} 
                        size={15} 
                        className={i < Math.round(product.rating || 5) ? 'fill-current' : 'text-stone-300'} 
                      />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-stone-600">
                    {product.rating ? product.rating.toFixed(1) : '5.0'}
                  </span>
                  <span className="text-xs text-stone-400">
                    ({product.numReviews || 0} reviews)
                  </span>
                </div>

                {/* Pricing in LKR */}
                <div className="flex items-baseline gap-3 pb-6 mb-6 border-b border-stone-200">
                  <span className="text-3xl font-extrabold text-[#1A1A1A]">
                    LKR {Number(product.price).toLocaleString()}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-base text-stone-400 line-through">
                      LKR {Number(product.originalPrice).toLocaleString()}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm text-stone-600 font-light leading-relaxed mb-8">
                  {product.description}
                </p>

                {/* Finish / Color Selector */}
                <div className="mb-6">
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2.5">
                    Finish / Color: <span className="font-normal text-stone-500">{selectedFinish}</span>
                  </label>
                  <div className="flex items-center gap-3">
                    {finishes.map((f) => (
                      <button
                        key={f.name}
                        onClick={() => setSelectedFinish(f.name)}
                        className={`group relative flex items-center justify-center p-1 rounded-full border-2 transition-all ${
                          selectedFinish === f.name ? 'border-[#C9A87C] scale-110' : 'border-transparent hover:border-stone-300'
                        }`}
                        title={f.name}
                      >
                        <span 
                          className="w-6 h-6 rounded-full shadow-inner block" 
                          style={{ backgroundColor: f.color }} 
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity and Add to Cart Section */}
                <div ref={mainCtaRef} className="space-y-4 mb-8">
                  {product.countInStock > 0 ? (
                    <div className="flex items-center gap-3">
                      {/* Qty Stepper */}
                      <div className="flex items-center border border-stone-300 rounded-2xl bg-[#F9F7F5] px-2 py-1">
                        <button
                          onClick={() => setQty(Math.max(1, qty - 1))}
                          className="p-2.5 text-stone-600 hover:text-[#1A1A1A] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <FiMinus size={14} />
                        </button>
                        <span className="w-8 text-center text-sm font-bold text-[#1A1A1A]">{qty}</span>
                        <button
                          onClick={() => setQty(Math.min(product.countInStock, qty + 1))}
                          className="p-2.5 text-stone-600 hover:text-[#1A1A1A] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <FiPlus size={14} />
                        </button>
                      </div>

                      {/* Primary CTA */}
                      <button
                        onClick={handleAddToCart}
                        className="flex-1 py-4 px-6 rounded-2xl bg-[#1A1A1A] hover:bg-[#C9A87C] text-white text-xs font-bold uppercase tracking-[0.16em] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
                      >
                        <FiShoppingBag size={16} />
                        <span>Add to Bag • LKR {(product.price * qty).toLocaleString()}</span>
                      </button>

                      {/* Wishlist Button */}
                      <button
                        onClick={handleWishlist}
                        className={`p-4 rounded-2xl border transition-all ${
                          isWishlisted 
                            ? 'bg-[#C9A87C] border-[#C9A87C] text-white shadow-md' 
                            : 'border-stone-300 hover:border-[#C9A87C] text-stone-700 hover:text-[#C9A87C] bg-white'
                        }`}
                        title="Save to Wishlist"
                      >
                        <FiHeart size={18} className={isWishlisted ? "fill-current" : ""} />
                      </button>
                    </div>
                  ) : (
                    <button
                      disabled
                      className="w-full py-4 rounded-2xl bg-stone-200 text-stone-500 text-xs font-bold uppercase tracking-wider cursor-not-allowed"
                    >
                      Currently Out of Stock
                    </button>
                  )}
                </div>

              </div>

              {/* Delivery & Assurance Perks Strip */}
              <div className="border-t border-stone-200 pt-6 space-y-3 text-xs text-stone-600">
                <div className="flex items-center gap-3">
                  <FiTruck className="text-[#C9A87C] flex-shrink-0" size={18} />
                  <span><strong>Islandwide Delivery:</strong> 2-4 days across Sri Lanka. Free above LKR 7,500.</span>
                </div>
                <div className="flex items-center gap-3">
                  <FiShield className="text-[#C9A87C] flex-shrink-0" size={18} />
                  <span><strong>Authenticity Assured:</strong> 100% verified materials & artisan craft.</span>
                </div>
                <div className="flex items-center gap-3">
                  <FiRefreshCw className="text-[#C9A87C] flex-shrink-0" size={18} />
                  <span><strong>7-Day Exchange:</strong> Easy Colombo-based return and replacement service.</span>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Reviews Section */}
        <section className="bg-white rounded-3xl border border-stone-200/80 p-6 sm:p-12 shadow-sm mb-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 mb-8 border-b border-stone-200 gap-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C9A87C] block mb-1">
                Feedback
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A]">
                Customer Reviews ({product.reviews?.length || 0})
              </h2>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex text-[#C9A87C]">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} size={18} className="fill-current" />
                ))}
              </div>
              <span className="text-sm font-bold text-[#1A1A1A]">4.9 out of 5</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Review List (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              {(!product.reviews || product.reviews.length === 0) ? (
                <div className="py-12 text-center text-stone-500 bg-[#F9F7F5] rounded-2xl p-6">
                  <p className="text-sm mb-1">Be the first to share your experience with this piece!</p>
                  <p className="text-xs text-stone-400">Your review helps shoppers across Sri Lanka.</p>
                </div>
              ) : (
                product.reviews.map((rev) => (
                  <div key={rev._id} className="p-5 rounded-2xl bg-[#F9F7F5] border border-stone-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">{rev.name}</span>
                      <div className="flex text-[#C9A87C]">
                        {[...Array(5)].map((_, i) => (
                          <FiStar 
                            key={i} 
                            size={12} 
                            className={i < rev.rating ? 'fill-current' : 'text-stone-300'} 
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-stone-700 leading-relaxed mb-2">{rev.comment}</p>
                    <span className="text-[10px] text-stone-400">{rev.createdAt?.substring(0, 10)} • Verified Purchase</span>
                  </div>
                ))
              )}
            </div>

            {/* Write a Review (5 cols) */}
            <div className="lg:col-span-5">
              <div className="bg-[#F9F7F5] p-6 sm:p-8 rounded-3xl border border-stone-200">
                <h3 className="text-base font-bold text-[#1A1A1A] uppercase tracking-wider mb-2">
                  Share Your Thoughts
                </h3>
                <p className="text-xs text-stone-500 mb-6 font-light">
                  How was the craftsmanship, fit, and overall quality?
                </p>

                {userInfo ? (
                  <form onSubmit={handleReviewSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                        Your Rating
                      </label>
                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            onClick={() => setReviewRating(star)}
                            className="p-1 text-2xl text-[#C9A87C] hover:scale-110 transition-transform focus:outline-none"
                          >
                            <FiStar className={star <= reviewRating ? 'fill-current' : 'text-stone-300'} />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                        Your Experience
                      </label>
                      <textarea
                        rows={3}
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        placeholder="Write your honest review..."
                        className="w-full p-3.5 bg-white border border-stone-300 rounded-2xl text-xs text-[#1A1A1A] placeholder-stone-400 focus:outline-none focus:border-[#C9A87C]"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submittingReview}
                      className="w-full py-3 rounded-full bg-[#1A1A1A] hover:bg-[#C9A87C] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm disabled:opacity-50"
                    >
                      {submittingReview ? 'Posting...' : 'Submit Review'}
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-xs text-stone-600 mb-4">Please log in to your account to write a review.</p>
                    <Link
                      to="/login"
                      className="inline-block px-6 py-2.5 rounded-full bg-[#1A1A1A] text-white text-xs font-semibold uppercase tracking-wider"
                    >
                      Sign In to Review
                    </Link>
                  </div>
                )}
              </div>
            </div>

          </div>
        </section>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C9A87C] block mb-1">
                  Complete The Look
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A]">
                  You May Also Admire
                </h2>
              </div>
              <Link 
                to="/shop" 
                className="hidden sm:inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1A1A1A] hover:text-[#C9A87C] transition-colors"
              >
                <span>View All</span>
                <FiChevronRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel._id} product={rel} />
              ))}
            </div>
          </section>
        )}

      </div>

      {/* Sticky Mobile Add to Cart Drawer */}
      <AnimatePresence>
        {showStickyBar && product.countInStock > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-stone-200 p-3 sm:p-4 z-40 lg:hidden shadow-2xl flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3 min-w-0">
              <img 
                src={getImageUrl(activeImage || product.images?.[0])} 
                alt={product.name} 
                className="w-11 h-11 rounded-xl object-cover border border-stone-200 flex-shrink-0"
              />
              <div className="min-w-0">
                <p className="text-xs font-bold text-[#1A1A1A] truncate">{product.name}</p>
                <p className="text-xs font-extrabold text-[#C9A87C]">LKR {Number(product.price).toLocaleString()}</p>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="py-3 px-5 rounded-xl bg-[#1A1A1A] text-white text-xs font-bold uppercase tracking-wider whitespace-nowrap flex items-center gap-1.5 shadow-md flex-shrink-0"
            >
              <FiShoppingBag size={14} /> Add to Bag
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};

export default ProductDetails;

