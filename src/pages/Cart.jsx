import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';
import useCartStore from '../store/useCartStore';

const Cart = () => {
  const { cartItems, addToCart, removeFromCart, getCartTotals } = useCartStore();
  const navigate = useNavigate();
  const totals = getCartTotals();

  const checkoutHandler = () => {
    navigate('/checkout');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-32 pb-24 bg-premium-light min-h-screen"
    >
      <div className="container mx-auto px-6 max-w-6xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-10 uppercase tracking-widest text-premium-dark">
          Your <span className="text-premium-accent italic">Cart</span>
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-2xl font-medium text-gray-500 mb-6">Your cart is currently empty.</h2>
            <Link to="/shop" className="bg-premium-accent text-white px-8 py-3 font-semibold tracking-wider hover:bg-premium-dark transition-colors uppercase inline-block">
              Return to Shop
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Cart Items List */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                {/* Header */}
                <div className="hidden md:grid grid-cols-6 gap-4 p-6 border-b border-gray-100 text-sm font-semibold text-gray-500 uppercase tracking-wider bg-gray-50">
                  <div className="col-span-3">Product</div>
                  <div className="text-center">Price</div>
                  <div className="text-center">Quantity</div>
                  <div className="text-right">Total</div>
                </div>
                
                {/* Items */}
                <div className="divide-y divide-gray-100">
                  {cartItems.map((item) => (
                    <div key={item.product} className="grid grid-cols-1 md:grid-cols-6 gap-4 p-6 items-center">
                      <div className="col-span-3 flex items-center gap-4">
                        <Link to={`/product/${item.product}`}>
                          <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
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
