import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FiTrash2, 
  FiMinus, 
  FiPlus, 
  FiArrowLeft, 
  FiShoppingBag, 
  FiShield, 
  FiTruck, 
  FiCheckCircle, 
  FiTag, 
  FiArrowRight 
} from 'react-icons/fi';
import useCartStore from '../store/useCartStore';
import SEOComponent from '../components/SEOComponent';
import { getImageUrl } from '../utils/getImageUrl';
import toast from 'react-hot-toast';

const FREE_SHIPPING_THRESHOLD = 7500;

const Cart = () => {
  const { cartItems, addToCart, removeFromCart, getCartTotals } = useCartStore();
  const totals = getCartTotals();
  const navigate = useNavigate();

  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);

  const subtotalNum = Number(totals.itemsPrice) || 0;
  const freeShippingProgress = Math.min(100, Math.round((subtotalNum / FREE_SHIPPING_THRESHOLD) * 100));
  const amountNeeded = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotalNum);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'SHOP10') {
      const discountAmount = subtotalNum * 0.1;
      setDiscount(discountAmount);
      setPromoApplied(true);
      toast.success('Promo code SHOP10 applied: 10% discount!');
    } else {
      toast.error('Invalid coupon code. Try "SHOP10" for 10% off');
    }
  };

  const finalTotal = Math.max(0, Number(totals.totalPrice) - discount);

  const checkoutHandler = () => {
    navigate('/login?redirect=/checkout');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="pt-8 pb-24 bg-[#F9F7F5] min-h-screen"
    >
      <SEOComponent 
        title="Shopping Bag | ShopStore.lk" 
        description="Review your curated accessories in your bag. Free islandwide shipping on orders over LKR 7,500 across Sri Lanka." 
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 sm:gap-8 mb-10 text-xs uppercase tracking-widest">
          <div className="flex items-center gap-2 text-[#1A1A1A] font-bold">
            <span className="w-6 h-6 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center text-[11px]">1</span>
            <span>Shopping Bag</span>
          </div>
          <span className="w-8 h-[1px] bg-stone-300" />
          <div className="flex items-center gap-2 text-stone-400 font-medium">
            <span className="w-6 h-6 rounded-full bg-stone-200 text-stone-500 flex items-center justify-center text-[11px]">2</span>
            <span>Checkout</span>
          </div>
          <span className="w-8 h-[1px] bg-stone-300" />
          <div className="flex items-center gap-2 text-stone-400 font-medium">
            <span className="w-6 h-6 rounded-full bg-stone-200 text-stone-500 flex items-center justify-center text-[11px]">3</span>
            <span>Confirmation</span>
          </div>
        </div>

        {/* Back Link */}
        <Link 
          to="/shop" 
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-stone-500 hover:text-[#C9A87C] transition-colors mb-6 font-semibold"
        >
          <FiArrowLeft size={14} /> Back to Collection
        </Link>

        {cartItems.length === 0 ? (
          <div className="bg-white p-12 sm:p-20 text-center rounded-3xl border border-stone-200/80 shadow-sm max-w-xl mx-auto">
            <div className="w-20 h-20 rounded-full bg-[#F9F7F5] border border-stone-200 flex items-center justify-center text-[#C9A87C] mx-auto mb-6">
              <FiShoppingBag size={32} />
            </div>
            <h2 className="text-2xl font-extrabold text-[#1A1A1A] mb-3">Your Shopping Bag is Empty</h2>
            <p className="text-sm text-stone-500 font-light leading-relaxed mb-8 max-w-sm mx-auto">
              Explore our handcrafted jewelry, luxury watches, and leather accessories to begin your collection.
            </p>
            <Link 
              to="/shop" 
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#1A1A1A] hover:bg-[#C9A87C] text-white text-xs font-bold uppercase tracking-[0.16em] transition-all duration-300 shadow-md"
            >
              <span>Explore Collection</span>
              <FiArrowRight />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Bag Items Column (8 cols on lg) */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Free Shipping Progress Card */}
              <div className="bg-white p-5 rounded-3xl border border-stone-200/80 shadow-sm">
                <div className="flex items-center gap-2.5 mb-3 text-xs font-semibold text-[#1A1A1A]">
                  <FiTruck className="text-[#C9A87C]" size={18} />
                  {amountNeeded > 0 ? (
                    <span>Add <strong className="text-[#C9A87C]">LKR {amountNeeded.toLocaleString()}</strong> more to unlock <strong>FREE Islandwide Delivery</strong>!</span>
                  ) : (
                    <span className="text-emerald-700 flex items-center gap-1.5 font-bold">
                      <FiCheckCircle size={15} /> Congratulations! You have unlocked FREE Islandwide Delivery across Sri Lanka!
                    </span>
                  )}
                </div>
                <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden">
                  <div 
                    className="h-full bg-[#C9A87C] transition-all duration-500 rounded-full" 
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="bg-white rounded-3xl border border-stone-200/80 shadow-sm divide-y divide-stone-100 overflow-hidden">
                {cartItems.map((item) => (
                  <div key={item.product} className="p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-5 hover:bg-[#F9F7F5]/50 transition-colors">
                    
                    {/* Item Image + Details */}
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <Link to={`/product/${item.product}`} className="flex-shrink-0">
                        <img 
                          src={getImageUrl(item.image)} 
                          alt={item.name} 
                          className="w-20 h-24 sm:w-24 sm:h-28 object-cover rounded-2xl border border-stone-100"
                        />
                      </Link>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A87C] block mb-1">
                          {item.brand || 'ShopStore'}
                        </span>
                        <Link 
                          to={`/product/${item.product}`} 
                          className="text-sm sm:text-base font-semibold text-[#1A1A1A] hover:text-[#C9A87C] transition-colors block mb-1"
                        >
                          {item.name}
                        </Link>
                        <p className="text-xs text-stone-500 font-medium">
                          LKR {Number(item.price).toLocaleString()}
                        </p>
                        <button 
                          onClick={() => removeFromCart(item.product)}
                          className="mt-2 text-rose-500 hover:text-rose-700 text-xs font-medium flex items-center gap-1 transition-colors"
                        >
                          <FiTrash2 size={12} /> Remove
                        </button>
                      </div>
                    </div>

                    {/* Stepper + Subtotal */}
                    <div className="flex items-center justify-between w-full sm:w-auto gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                      <div className="flex items-center border border-stone-300 rounded-2xl bg-[#F9F7F5] px-2 py-1">
                        <button 
                          onClick={() => addToCart(item, item.qty - 1)}
                          className="p-2 text-stone-600 hover:text-[#1A1A1A] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <FiMinus size={13} />
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-[#1A1A1A]">{item.qty}</span>
                        <button 
                          onClick={() => addToCart(item, item.qty + 1)}
                          className="p-2 text-stone-600 hover:text-[#1A1A1A] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <FiPlus size={13} />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-sm sm:text-base font-bold text-[#1A1A1A]">
                          LKR {Number(item.price * item.qty).toLocaleString()}
                        </span>
                      </div>
                    </div>

                  </div>
                ))}
              </div>

              {/* Promo Code Input */}
              <div className="bg-white p-5 rounded-3xl border border-stone-200/80 shadow-sm">
                <form onSubmit={handleApplyPromo} className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-grow">
                    <FiTag className="absolute left-4 top-3.5 text-stone-400" size={16} />
                    <input 
                      type="text" 
                      placeholder="Have a voucher? (Try SHOP10)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      disabled={promoApplied}
                      className="w-full pl-11 pr-4 py-3 bg-[#F9F7F5] rounded-2xl border border-stone-300 text-xs text-[#1A1A1A] uppercase tracking-wider placeholder:normal-case placeholder-stone-400 focus:outline-none focus:border-[#C9A87C]"
                    />
                  </div>
                  <button 
                    type="submit"
                    disabled={promoApplied || !promoCode.trim()}
                    className="px-6 py-3 rounded-2xl bg-stone-800 hover:bg-[#1A1A1A] text-white text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-40 flex-shrink-0"
                  >
                    {promoApplied ? 'Applied' : 'Apply Code'}
                  </button>
                </form>
              </div>

            </div>

            {/* Order Summary Column (4 cols on lg) */}
            <div className="lg:col-span-4">
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/80 shadow-sm sticky top-28">
                
                <h3 className="text-base font-bold uppercase tracking-wider text-[#1A1A1A] border-b border-stone-100 pb-4 mb-6">
                  Order Summary
                </h3>

                <div className="space-y-3.5 text-xs text-stone-600 mb-6">
                  <div className="flex justify-between">
                    <span>Items Subtotal</span>
                    <span className="font-semibold text-[#1A1A1A]">LKR {Number(totals.itemsPrice).toLocaleString()}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-semibold">
                      <span>Promo Discount (10%)</span>
                      <span>- LKR {discount.toLocaleString()}</span>
                    </div>
                  )}

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
                    <span>Applicable Taxes</span>
                    <span className="font-semibold text-[#1A1A1A]">LKR {Number(totals.taxPrice || 0).toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex justify-between items-baseline border-t border-stone-200 pt-5 mb-8">
                  <span className="text-sm font-extrabold uppercase tracking-wider text-[#1A1A1A]">Estimated Total</span>
                  <span className="text-2xl font-extrabold text-[#1A1A1A]">
                    LKR {Math.round(finalTotal).toLocaleString()}
                  </span>
                </div>

                <button 
                  onClick={checkoutHandler}
                  className="w-full py-4 rounded-2xl bg-[#1A1A1A] hover:bg-[#C9A87C] text-white text-xs font-bold uppercase tracking-[0.16em] transition-all duration-300 shadow-md hover:shadow-xl flex items-center justify-center gap-2 group"
                >
                  <span>Proceed to Checkout</span>
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="mt-6 pt-5 border-t border-stone-100 space-y-2.5 text-[11px] text-stone-500">
                  <div className="flex items-center gap-2">
                    <FiShield className="text-[#C9A87C]" size={14} />
                    <span>Bank-grade 256-bit encrypted checkout</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiTruck className="text-[#C9A87C]" size={14} />
                    <span>Cash on Delivery & Card Payments accepted</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

      </div>
    </motion.div>
  );
};

export default Cart;

