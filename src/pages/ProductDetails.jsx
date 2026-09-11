import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiHeart, FiArrowLeft, FiMinus, FiPlus } from 'react-icons/fi';
import useProductStore from '../store/useProductStore';
import useCartStore from '../store/useCartStore';
import toast from 'react-hot-toast';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState('');
  const [zoomStyle, setZoomStyle] = useState({ transformOrigin: 'center center', transform: 'scale(1)' });
  
  const { product, loading, error, fetchProductDetails } = useProductStore();
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    fetchProductDetails(id);
  }, [id, fetchProductDetails]);

  useEffect(() => {
    if (product && product.images && product.images.length > 0) {
      setActiveImage(product.images[0]);
    }
  }, [product]);

  const handleAddToCart = () => {
    addToCart(product, qty);
    toast.success(`${product.name} added to cart`);
    navigate('/cart');
  };

  const handleMouseMove = (e) => {
    // If the event target is the image, calculate coordinates relative to it
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: 'scale(2.5)' // Zoom level
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      transformOrigin: 'center center',
      transform: 'scale(1)'
    });
  };

  if (loading) {
    return (
      <div className="pt-32 pb-24 min-h-screen flex justify-center items-center">
        <div className="text-premium-accent text-2xl animate-pulse">Retrieving product details...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="pt-32 pb-24 min-h-screen container mx-auto px-6 text-center">
        <h2 className="text-2xl text-red-500 mb-4">{error || 'Product not found'}</h2>
        <Link to="/shop" className="text-premium-accent hover:underline">Return to Shop</Link>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-24 pb-24 bg-white min-h-screen"
    >
      <div className="container mx-auto px-6">
        <Link to="/shop" className="inline-flex items-center text-gray-500 hover:text-premium-accent transition-colors mb-8 uppercase tracking-widest text-sm font-semibold">
          <FiArrowLeft className="mr-2" /> Back to Collection
        </Link>
        
        <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
          {/* Images Section */}
          <div className="md:w-1/2">
            <div 
              className="bg-gray-100 rounded-lg overflow-hidden mb-4 cursor-crosshair relative"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <img 
                src={activeImage} 
                alt={product.name} 
                className="w-full h-auto object-cover transition-transform duration-200 ease-out" 
                style={zoomStyle}
              />
            </div>
            {product.images && product.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => setActiveImage(img)}
                    className={`w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden cursor-pointer border-2 transition-colors ${activeImage === img ? 'border-premium-accent' : 'border-transparent'}`}
                  >
                    <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info Section */}
          <div className="md:w-1/2 flex flex-col justify-center">
            <p className="text-gray-500 uppercase tracking-widest font-medium mb-2">{product.brand}</p>
            <h1 className="text-4xl md:text-5xl font-bold text-premium-dark mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-8">
              <span className="text-2xl font-bold text-premium-accent">LKR {product.price.toFixed(2)}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-lg text-gray-400 line-through">LKR {product.originalPrice.toFixed(2)}</span>
              )}
            </div>

            <p className="text-gray-600 leading-relaxed mb-8">
              {product.description}
            </p>

            <div className="mb-8">
              <span className={`font-semibold tracking-wider uppercase text-sm ${product.countInStock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            {product.countInStock > 0 && (
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <div className="flex items-center border border-gray-300 w-32 rounded">
                  <button 
                    className="p-3 text-gray-500 hover:bg-gray-50 transition-colors"
                    onClick={() => setQty(Math.max(1, qty - 1))}
                  >
                    <FiMinus />
                  </button>
                  <span className="flex-1 text-center font-medium">{qty}</span>
                  <button 
                    className="p-3 text-gray-500 hover:bg-gray-50 transition-colors"
                    onClick={() => setQty(Math.min(product.countInStock, qty + 1))}
                  >
                    <FiPlus />
                  </button>
                </div>
                
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-premium-dark text-white px-8 py-4 font-semibold tracking-wider hover:bg-premium-accent transition-colors uppercase flex items-center justify-center gap-2"
                >
                  <FiShoppingCart /> Add to Cart
                </button>
                <button className="p-4 border border-gray-300 rounded text-premium-dark hover:border-premium-accent hover:text-premium-accent transition-colors">
                  <FiHeart size={24} />
                </button>
              </div>
            )}
            
            <div className="border-t border-gray-200 pt-8 mt-auto">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500 block mb-1">Category</span>
                  <span className="font-semibold text-premium-dark">{product.category?.name || 'Accessories'}</span>
                </div>
                {product.material && (
                  <div>
                    <span className="text-gray-500 block mb-1">Material</span>
                    <span className="font-semibold text-premium-dark">{product.material}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold mb-8 uppercase tracking-widest text-premium-dark border-b pb-4">Customer Reviews</h2>
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Reviews List */}
            <div className="lg:w-2/3">
              {product.reviews && product.reviews.length === 0 && (
                <div className="bg-gray-50 p-8 text-center text-gray-500 rounded-lg">
                  No reviews yet. Be the first to review this product!
                </div>
              )}
              <div className="space-y-6">
                {product.reviews && product.reviews.map((review) => (
                  <div key={review._id} className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="font-semibold text-premium-dark text-lg">{review.name}</div>
                      <div className="flex items-center text-premium-accent">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < review.rating ? 'text-premium-accent' : 'text-gray-300'}>★</span>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 mb-2">{review.comment}</p>
                    <p className="text-xs text-gray-400">{review.createdAt?.substring(0, 10)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Write a Review Form */}
            <div className="lg:w-1/3">
              <div className="bg-white p-6 border border-gray-100 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-6 uppercase tracking-wider text-premium-dark">Write a Review</h3>
                {localStorage.getItem('userInfo') ? (
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const reviewData = {
                      rating: Number(formData.get('rating')),
                      comment: formData.get('comment'),
                    };
                    useProductStore.getState().createReview(product._id, reviewData)
                      .then(() => {
                        toast.success('Review submitted successfully');
                        fetchProductDetails(product._id);
                        e.target.reset();
                      })
                      .catch((err) => toast.error(err.message || 'Error submitting review'));
                  }}>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wider">Rating</label>
                      <select name="rating" className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-premium-accent" required>
                        <option value="">Select...</option>
                        <option value="1">1 - Poor</option>
                        <option value="2">2 - Fair</option>
                        <option value="3">3 - Good</option>
                        <option value="4">4 - Very Good</option>
                        <option value="5">5 - Excellent</option>
                      </select>
                    </div>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wider">Comment</label>
                      <textarea name="comment" rows="4" className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-premium-accent" required></textarea>
                    </div>
                    <button type="submit" className="w-full bg-premium-dark text-white py-3 font-semibold tracking-wider hover:bg-premium-accent transition-colors uppercase">
                      Submit Review
                    </button>
                  </form>
                ) : (
                  <div className="p-4 bg-gray-50 text-gray-600 rounded">
                    Please <Link to="/login" className="text-premium-accent hover:underline">sign in</Link> to write a review.
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default ProductDetails;
