import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import useCartStore from '../store/useCartStore';
import SEOComponent from '../components/SEOComponent';
import toast from 'react-hot-toast';
import axios from 'axios';
import { getImageUrl } from '../utils/getImageUrl';
import { 
  FiTruck, 
  FiCreditCard, 
  FiDollarSign, 
  FiShield, 
  FiCheckCircle, 
  FiArrowLeft,
  FiLock
} from 'react-icons/fi';

const sriLankaDistricts = [
  'Colombo', 'Gampaha', 'Kalutara', 'Kandy', 'Matale', 'Nuwara Eliya',
  'Galle', 'Matara', 'Hambantota', 'Jaffna', 'Kilinochchi', 'Mannar',
  'Vavuniya', 'Mullaitivu', 'Batticaloa', 'Ampara', 'Trincomalee',
  'Kurunegala', 'Puttalam', 'Anuradhapura', 'Polonnaruwa', 'Badulla',
  'Monaragala', 'Ratnapura', 'Kegalle'
];

const Checkout = () => {
  const { cartItems, getCartTotals, clearCartItems } = useCartStore();
  const totals = getCartTotals();
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    district: 'Colombo',
    postalCode: '',
    country: 'Sri Lanka'
  });
  const [paymentMethod, setPaymentMethod] = useState('CashOnDelivery');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!shippingAddress.address || !shippingAddress.city || !shippingAddress.district) {
      toast.error('Please complete all shipping address fields');
      return;
    }
    
    setIsSubmitting(true);
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      if (!userInfo) {
        toast.error('Please sign in to place your order');
        navigate('/login?redirect=/checkout');
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
        shippingAddress: {
          address: `${shippingAddress.address}${shippingAddress.phone ? ` (Phone: ${shippingAddress.phone})` : ''}`,
          city: shippingAddress.city,
          postalCode: shippingAddress.postalCode || '00000',
          country: `${shippingAddress.district}, Sri Lanka`
        },
        paymentMethod,
        itemsPrice: totals.itemsPrice,
        shippingPrice: totals.shippingPrice,
        taxPrice: totals.taxPrice,
        totalPrice: totals.totalPrice,
      };

      const { data } = await axios.post('/api/orders', orderData, config);
      
      toast.success('Your order has been placed successfully!', {
        style: {
          background: '#1A1A1A',
          color: '#F9F7F5',
          borderRadius: '12px'
        }
      });
      clearCartItems();
      navigate(`/order/${data._id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Error placing order');
    } finally {
      setIsSubmitting(false);
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
      transition={{ duration: 0.4 }}
      className="pt-8 pb-24 bg-[#F9F7F5] min-h-screen"
    >
      <SEOComponent 
        title="Checkout | ShopStore.lk" 
        description="Secure checkout for your order at ShopStore.lk. Cash on Delivery and online payment available across Sri Lanka." 
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 sm:gap-8 mb-10 text-xs uppercase tracking-widest">
          <div className="flex items-center gap-2 text-stone-500 font-medium">
            <span className="w-6 h-6 rounded-full bg-stone-200 text-stone-700 flex items-center justify-center text-[11px]">✓</span>
            <span className="hidden sm:inline">Shopping Bag</span>
          </div>
          <span className="w-8 h-[1px] bg-stone-300" />
          <div className="flex items-center gap-2 text-[#1A1A1A] font-bold">
            <span className="w-6 h-6 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center text-[11px]">2</span>
            <span>Checkout</span>
          </div>
          <span className="w-8 h-[1px] bg-stone-300" />
          <div className="flex items-center gap-2 text-stone-400 font-medium">
            <span className="w-6 h-6 rounded-full bg-stone-200 text-stone-500 flex items-center justify-center text-[11px]">3</span>
            <span className="hidden sm:inline">Confirmation</span>
          </div>
        </div>

        <Link 
          to="/cart" 
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-stone-500 hover:text-[#C9A87C] transition-colors mb-6 font-semibold"
        >
          <FiArrowLeft size={14} /> Back to Bag
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Checkout Form (8 cols) */}
          <div className="lg:col-span-8">
            <form onSubmit={submitHandler} className="space-y-8">
              
              {/* Shipping Information Card */}
              <div className="bg-white p-6 sm:p-10 rounded-3xl border border-stone-200/80 shadow-sm">
                <div className="flex items-center gap-3 pb-4 mb-6 border-b border-stone-100">
                  <div className="p-2 rounded-xl bg-[#F9F7F5] text-[#C9A87C]">
                    <FiTruck size={20} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-[#1A1A1A] uppercase tracking-wider">
                      Islandwide Delivery Details
                    </h2>
                    <p className="text-xs text-stone-500">We deliver right to your doorstep anywhere in Sri Lanka</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                      Recipient Full Name *
                    </label>
                    <input 
                      type="text" 
                      placeholder="e.g. Kasun Perera"
                      value={shippingAddress.fullName}
                      onChange={(e) => setShippingAddress({...shippingAddress, fullName: e.target.value})}
                      className="w-full px-4 py-3 bg-[#F9F7F5] border border-stone-300 rounded-2xl text-xs text-[#1A1A1A] placeholder-stone-400 focus:outline-none focus:border-[#C9A87C]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                      Phone Number (For Courier) *
                    </label>
                    <input 
                      type="tel" 
                      placeholder="e.g. 077 123 4567"
                      value={shippingAddress.phone}
                      onChange={(e) => setShippingAddress({...shippingAddress, phone: e.target.value})}
                      className="w-full px-4 py-3 bg-[#F9F7F5] border border-stone-300 rounded-2xl text-xs text-[#1A1A1A] placeholder-stone-400 focus:outline-none focus:border-[#C9A87C]"
                      required
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                      Street Address & Apt / Suite *
                    </label>
                    <input 
                      type="text" 
                      placeholder="e.g. No. 45/2, Galle Road"
                      value={shippingAddress.address}
                      onChange={(e) => setShippingAddress({...shippingAddress, address: e.target.value})}
                      className="w-full px-4 py-3 bg-[#F9F7F5] border border-stone-300 rounded-2xl text-xs text-[#1A1A1A] placeholder-stone-400 focus:outline-none focus:border-[#C9A87C]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                      City / Town *
                    </label>
                    <input 
                      type="text" 
                      placeholder="e.g. Colombo 03 / Kandy"
                      value={shippingAddress.city}
                      onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                      className="w-full px-4 py-3 bg-[#F9F7F5] border border-stone-300 rounded-2xl text-xs text-[#1A1A1A] placeholder-stone-400 focus:outline-none focus:border-[#C9A87C]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                      District (Sri Lanka) *
                    </label>
                    <select
                      value={shippingAddress.district}
                      onChange={(e) => setShippingAddress({...shippingAddress, district: e.target.value})}
                      className="w-full px-4 py-3 bg-[#F9F7F5] border border-stone-300 rounded-2xl text-xs text-[#1A1A1A] focus:outline-none focus:border-[#C9A87C] cursor-pointer"
                    >
                      {sriLankaDistricts.map((dist) => (
                        <option key={dist} value={dist}>{dist}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                      Postal Code (Optional)
                    </label>
                    <input 
                      type="text" 
                      placeholder="e.g. 00300"
                      value={shippingAddress.postalCode}
                      onChange={(e) => setShippingAddress({...shippingAddress, postalCode: e.target.value})}
                      className="w-full px-4 py-3 bg-[#F9F7F5] border border-stone-300 rounded-2xl text-xs text-[#1A1A1A] placeholder-stone-400 focus:outline-none focus:border-[#C9A87C]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                      Country
                    </label>
                    <input 
                      type="text" 
                      value="Sri Lanka"
                      disabled
                      className="w-full px-4 py-3 bg-stone-100 border border-stone-300 rounded-2xl text-xs text-stone-600 cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Card */}
              <div className="bg-white p-6 sm:p-10 rounded-3xl border border-stone-200/80 shadow-sm">
                <div className="flex items-center gap-3 pb-4 mb-6 border-b border-stone-100">
                  <div className="p-2 rounded-xl bg-[#F9F7F5] text-[#C9A87C]">
                    <FiCreditCard size={20} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-[#1A1A1A] uppercase tracking-wider">
                      Payment Options
                    </h2>
                    <p className="text-xs text-stone-500">Choose your preferred Sri Lankan payment method</p>
                  </div>
                </div>

                <div className="space-y-3.5">
                  
                  {/* Cash on Delivery */}
                  <label className={`flex items-start gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    paymentMethod === 'CashOnDelivery' 
                      ? 'border-[#C9A87C] bg-[#F9F7F5]' 
                      : 'border-stone-200 hover:border-stone-300 bg-white'
                  }`}>
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="CashOnDelivery"
                      checked={paymentMethod === 'CashOnDelivery'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mt-1 h-4 w-4 text-[#C9A87C] focus:ring-[#C9A87C]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-[#1A1A1A]">Cash on Delivery (COD)</span>
                        <span className="text-[10px] uppercase tracking-wider font-bold bg-[#C9A87C] text-[#1A1A1A] px-2 py-0.5 rounded">Most Popular</span>
                      </div>
                      <p className="text-xs text-stone-500 mt-1">
                        Pay in cash to our courier driver upon package arrival at your doorstep.
                      </p>
                    </div>
                  </label>

                  {/* Online Card Payment */}
                  <label className={`flex items-start gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    paymentMethod === 'Card' 
                      ? 'border-[#C9A87C] bg-[#F9F7F5]' 
                      : 'border-stone-200 hover:border-stone-300 bg-white'
                  }`}>
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="Card"
                      checked={paymentMethod === 'Card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mt-1 h-4 w-4 text-[#C9A87C] focus:ring-[#C9A87C]"
                    />
                    <div className="flex-1">
                      <span className="text-sm font-bold text-[#1A1A1A]">Credit or Debit Card Online</span>
                      <p className="text-xs text-stone-500 mt-1">
                        Secure payment via Visa, Mastercard, Genie, or FriMi.
                      </p>
                    </div>
                  </label>

                  {/* Bank Deposit / Transfer */}
                  <label className={`flex items-start gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    paymentMethod === 'BankTransfer' 
                      ? 'border-[#C9A87C] bg-[#F9F7F5]' 
                      : 'border-stone-200 hover:border-stone-300 bg-white'
                  }`}>
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="BankTransfer"
                      checked={paymentMethod === 'BankTransfer'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mt-1 h-4 w-4 text-[#C9A87C] focus:ring-[#C9A87C]"
                    />
                    <div className="flex-1">
                      <span className="text-sm font-bold text-[#1A1A1A]">Direct Bank Transfer</span>
                      <p className="text-xs text-stone-500 mt-1">
                        Deposit or transfer to our Commercial Bank / HNB account.
                      </p>
                    </div>
                  </label>

                </div>
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-[#1A1A1A] hover:bg-[#C9A87C] text-white text-xs font-bold uppercase tracking-[0.18em] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <FiLock size={15} />
                <span>{isSubmitting ? 'Securing Order...' : `Complete Order • LKR ${Number(totals.totalPrice).toLocaleString()}`}</span>
              </button>

            </form>
          </div>

          {/* Order Summary (4 cols) */}
          <div className="lg:col-span-4">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/80 shadow-sm sticky top-28">
              
              <h3 className="text-base font-bold uppercase tracking-wider text-[#1A1A1A] border-b border-stone-100 pb-4 mb-6">
                Your Order ({cartItems.length})
              </h3>

              {/* Items Preview */}
              <div className="space-y-4 mb-6 max-h-72 overflow-y-auto scrollbar-hide divide-y divide-stone-100">
                {cartItems.map((item) => (
                  <div key={item.product} className="flex items-center gap-3 pt-3 first:pt-0">
                    <img 
                      src={getImageUrl(item.image)} 
                      alt={item.name} 
                      className="w-12 h-14 object-cover rounded-xl border border-stone-200 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[#1A1A1A] truncate">{item.name}</p>
                      <p className="text-[11px] text-stone-500">Qty: {item.qty}</p>
                    </div>
                    <span className="text-xs font-bold text-[#1A1A1A]">
                      LKR {Number(item.price * item.qty).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 text-xs text-stone-600 border-t border-stone-200 pt-5 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#1A1A1A]">LKR {Number(totals.itemsPrice).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Islandwide Delivery</span>
                  <span className="font-semibold text-[#1A1A1A]">
                    {Number(totals.shippingPrice) === 0 ? (
                      <span className="text-emerald-600 font-bold uppercase">FREE</span>
                    ) : (
                      `LKR ${Number(totals.shippingPrice).toLocaleString()}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span className="font-semibold text-[#1A1A1A]">LKR {Number(totals.taxPrice || 0).toLocaleString()}</span>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between items-baseline border-t border-stone-200 pt-5 mb-6">
                <span className="text-sm font-extrabold uppercase tracking-wider text-[#1A1A1A]">Total</span>
                <span className="text-2xl font-extrabold text-[#1A1A1A]">
                  LKR {Number(totals.totalPrice).toLocaleString()}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[#F9F7F5] border border-stone-200 text-xs text-stone-600 space-y-2">
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="text-emerald-600 flex-shrink-0" size={15} />
                  <span>Free doorstep exchange within 7 days</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="text-emerald-600 flex-shrink-0" size={15} />
                  <span>Doorstep delivery across all 25 districts</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </motion.div>
  );
};

export default Checkout;

