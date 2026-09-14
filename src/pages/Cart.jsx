import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FiTrash2, FiMinus, FiPlus, FiArrowLeft } from 'react-icons/fi';
import useCartStore from '../store/useCartStore';
import { getImageUrl } from '../utils/getImageUrl';

const Cart = () => {
  const { cartItems, addToCart, removeFromCart, getCartTotals } = useCartStore();
  const totals = getCartTotals();
  const navigate = useNavigate();

  const checkoutHandler = () => {
    navigate('/login?redirect=/checkout');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-24 pb-24 bg-premium-light min-h-screen"
    >
      <div className="container mx-auto px-6 max-w-6xl">
        <Link to="/shop" className="inline-flex items-center text-gray-500 hover:text-premium-accent transition-colors mb-8 uppercase tracking-widest text-sm font-semibold">
          <FiArrowLeft className="mr-2" /> Continue Shopping
        </Link>

        <h1 className="text-4xl font-bold mb-10 uppercase tracking-widest text-premium-dark border-b pb-4">
          Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-premium-dark mb-4">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">Looks like you haven't added any premium products yet.</p>
            <Link to="/shop" className="bg-premium-dark text-white px-8 py-3 font-semibold tracking-wider hover:bg-premium-accent transition-colors uppercase">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Cart Items List */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
                {/* Header */}
                <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-gray-100 font-semibold text-gray-500 uppercase tracking-wider text-xs">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Total</div>
                </div>
                
                {/* Items */}
                <div className="divide-y divide-gray-100">
                  {cartItems.map((item) => (
                    <div key={item.product} className="flex flex-col md:grid md:grid-cols-12 gap-4 p-6 items-center hover:bg-gray-50 transition-colors">
                      <div className="col-span-6 flex items-center gap-6 w-full">
                        <Link to={`/product/${item.product}`}>
                          <img src={getImageUrl(item.image)} alt={item.name} className="w-20 h-20 object-cover rounded" />
                        </Link>
                        <div>
                          <Link to={`/product/${item.product}`} className="font-semibold text-premium-dark hover:text-premium-accent transition-colors block mb-1">
                            {item.name}
                          </Link>
                          <button 
                            onClick={() => removeFromCart(item.product)}
                            className="text-red-400 hover:text-red-600 text-sm flex items-center gap-1 transition-colors"
                          >
                            <FiTrash2 /> Remove
                          </button>
                        </div>
                      </div>
                      
                      <div className="hidden md:block text-center font-medium text-gray-600">
                        LKR {item.price.toFixed(2)}
                      </div>
                      
                      <div className="flex items-center border border-gray-300 rounded overflow-hidden mt-4 lg:mt-0">
                        <button 
                          className="px-3 py-1 bg-gray-50 hover:bg-gray-100 transition-colors"
                          onClick={() => addToCart(item, item.qty - 1)}
                        >
                          <FiMinus size={14} />
                        </button>
                        <span className="px-4 text-sm font-medium border-x border-gray-300">{item.qty}</span>
                        <button 
                          className="px-3 py-1 bg-gray-50 hover:bg-gray-100 transition-colors"
                          onClick={() => addToCart(item, item.qty + 1)}
                        >
                          <FiPlus size={14} />
                        </button>
                      </div>

                      <div className="font-bold text-premium-dark w-24 text-right hidden md:block">
                        LKR {(item.price * item.qty).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3 mt-8 lg:mt-0">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <h3 className="text-lg font-bold uppercase tracking-wider text-premium-dark border-b pb-4 mb-6">Order Summary</h3>
                
                <div className="space-y-4 text-sm mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)</span>
                    <span>LKR {totals.itemsPrice}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>{Number(totals.shippingPrice) === 0 ? 'Free' : `LKR ${totals.shippingPrice}`}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>LKR {totals.taxPrice}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center border-t border-gray-200 pt-6 mb-8">
                  <span className="text-base font-bold uppercase tracking-wider text-premium-dark">Total</span>
                  <span className="text-2xl font-bold text-premium-dark">LKR {totals.totalPrice}</span>
                </div>
                
                <button 
                  onClick={checkoutHandler}
                  className="w-full bg-premium-dark text-white py-4 font-semibold tracking-wider hover:bg-premium-accent transition-colors uppercase disabled:bg-gray-300 disabled:cursor-not-allowed"
                  disabled={cartItems.length === 0}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Cart;
