import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useCartStore from '../store/useCartStore';
import toast from 'react-hot-toast';
import axios from 'axios';
import { getImageUrl } from '../utils/getImageUrl';

const Checkout = () => {
  const { cartItems, getCartTotals, clearCartItems } = useCartStore();
  const totals = getCartTotals();
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!shippingAddress.address || !shippingAddress.city || !shippingAddress.postalCode || !shippingAddress.country) {
      toast.error('Please fill in all shipping fields');
      return;
    }
    
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      if (!userInfo) {
        toast.error('Please login to place an order');
        navigate('/login');
        return;
      }
      
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const orderData = {
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice: totals.itemsPrice,
        shippingPrice: totals.shippingPrice,
        taxPrice: totals.taxPrice,
        totalPrice: totals.totalPrice,
      };

      const { data } = await axios.post('/api/orders', orderData, config);
      
      toast.success('Order placed successfully!');
      clearCartItems();
      navigate(`/order/${data._id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-32 pb-24 bg-premium-light min-h-screen"
    >
      <div className="container mx-auto px-6 max-w-6xl flex flex-col lg:flex-row gap-12">
        
        {/* Checkout Form */}
        <div className="lg:w-2/3">
          <h1 className="text-3xl font-bold mb-8 uppercase tracking-widest text-premium-dark">Checkout</h1>
          
          <form onSubmit={submitHandler} className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-6 uppercase tracking-wider text-gray-700 border-b pb-4">Shipping Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <input 
                  type="text" 
                  value={shippingAddress.address}
                  onChange={(e) => setShippingAddress({...shippingAddress, address: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-premium-accent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                <input 
                  type="text" 
                  value={shippingAddress.city}
                  onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-premium-accent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
                <input 
                  type="text" 
                  value={shippingAddress.postalCode}
                  onChange={(e) => setShippingAddress({...shippingAddress, postalCode: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-premium-accent"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                <input 
                  type="text" 
                  value={shippingAddress.country}
                  onChange={(e) => setShippingAddress({...shippingAddress, country: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-premium-accent"
                  required
                />
              </div>
            </div>

            <h2 className="text-xl font-semibold mb-6 uppercase tracking-wider text-gray-700 border-b pb-4">Payment Method</h2>
            <div className="mb-8 space-y-4">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="PayPal"
                  checked={paymentMethod === 'PayPal'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="h-4 w-4 text-premium-accent focus:ring-premium-accent"
                />
                <span className="text-gray-700 font-medium">PayPal / Credit Card</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="Stripe"
                  checked={paymentMethod === 'Stripe'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="h-4 w-4 text-premium-accent focus:ring-premium-accent"
                />
                <span className="text-gray-700 font-medium">Stripe</span>
              </label>
            </div>

            <button 
              type="submit"
              className="w-full bg-premium-dark text-white py-4 font-semibold tracking-wider hover:bg-premium-accent transition-colors uppercase"
            >
              Place Order
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 sticky top-32">
            <h2 className="text-xl font-bold mb-6 pb-4 border-b border-gray-100 uppercase tracking-widest text-premium-dark">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {cartItems.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <img src={getImageUrl(item.image)} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-premium-dark">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.qty} x LKR {item.price.toFixed(2)}</p>
                  </div>
                  <div className="text-sm font-bold text-premium-dark">
                    LKR {(item.qty * item.price).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 mb-6 text-gray-600 border-t pt-4">
              <div className="flex justify-between">
                <span>Items</span>
                <span>LKR {totals.itemsPrice}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{Number(totals.shippingPrice) === 0 ? 'Free' : `LKR ${totals.shippingPrice}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>LKR {totals.taxPrice}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center py-4 border-t border-gray-100">
              <span className="text-lg font-bold text-premium-dark uppercase tracking-wider">Total</span>
              <span className="text-2xl font-bold text-premium-accent">LKR {totals.totalPrice}</span>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default Checkout;
