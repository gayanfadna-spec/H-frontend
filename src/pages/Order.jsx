import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { getImageUrl } from '../utils/getImageUrl';
import SEOComponent from '../components/SEOComponent';
import { 
  FiCheckCircle, 
  FiClock, 
  FiTruck, 
  FiCreditCard, 
  FiMapPin, 
  FiPackage,
  FiArrowLeft,
  FiShield
} from 'react-icons/fi';

const Order = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [{ isPending, isResolved }, paypalDispatch] = usePayPalScriptReducer();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        const { data } = await axios.get(`/api/orders/${id}`, config);
        setOrder(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  useEffect(() => {
    if (order && !order.isPaid && order.paymentMethod !== 'CashOnDelivery') {
      if (!window.paypal) {
        const loadPayPalScript = async () => {
          try {
            const { data: clientId } = await axios.get('/api/config/paypal');
            paypalDispatch({
              type: 'resetOptions',
              value: {
                'client-id': clientId,
                currency: 'USD',
              },
            });
            paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
          } catch (e) {
            console.error("PayPal config fetch error", e);
          }
        };
        loadPayPalScript();
      }
    }
  }, [order, paypalDispatch]);

  const onApprove = async (data, actions) => {
    try {
      const details = await actions.order.capture();
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data: updatedOrder } = await axios.put(`/api/orders/${id}/pay`, details, config);
      setOrder(updatedOrder);
      toast.success('Payment successfully processed');
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  const onError = (err) => {
    toast.error(err.message || 'Payment failed');
  };

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: { value: (order.totalPrice / 300).toFixed(2) }, // approximate USD for sandbox
        },
      ],
    });
  };

  if (loading) {
    return (
      <div className="pt-32 pb-24 min-h-[70vh] flex flex-col justify-center items-center bg-[#F9F7F5]">
        <div className="w-10 h-10 border-2 border-[#1A1A1A] border-t-[#C9A87C] rounded-full animate-spin mb-4" />
        <p className="text-xs uppercase tracking-[0.2em] text-stone-500 font-semibold">
          Loading order details...
        </p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="pt-32 pb-24 min-h-[70vh] container mx-auto px-6 text-center bg-[#F9F7F5]">
        <h2 className="text-2xl font-bold text-rose-500 mb-4">{error || 'Order not found'}</h2>
        <Link to="/shop" className="px-6 py-2.5 rounded-full bg-[#1A1A1A] text-white text-xs uppercase tracking-wider">
          Return to Shop
        </Link>
      </div>
    );
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
        title={`Order #${order._id.substring(0, 8)} | ShopStore.lk`} 
        description="View order invoice, delivery status, and tracking information at ShopStore.lk." 
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        
        <Link 
          to="/profile" 
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-stone-500 hover:text-[#C9A87C] transition-colors mb-6 font-semibold"
        >
          <FiArrowLeft size={14} /> Back to My Orders
        </Link>

        {/* Confirmation Header Banner */}
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-stone-200/80 shadow-sm mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold uppercase tracking-wider mb-2">
              <FiCheckCircle size={14} /> Order Confirmed
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A]">
              Order #{order._id.substring(0, 8).toUpperCase()}
            </h1>
            <p className="text-xs text-stone-500 mt-1">Placed on {order.createdAt?.substring(0, 10)} • Sri Lanka Standard Time</p>
          </div>

          <div className="text-right sm:text-right w-full sm:w-auto">
            <span className="text-[10px] uppercase tracking-wider text-stone-500 font-semibold block">Total Amount</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A]">
              LKR {Number(order.totalPrice).toLocaleString()}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Details Column (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Delivery Address Card */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/80 shadow-sm">
              <div className="flex items-center gap-3 pb-4 mb-4 border-b border-stone-100">
                <div className="p-2 rounded-xl bg-[#F9F7F5] text-[#C9A87C]">
                  <FiMapPin size={18} />
                </div>
                <h2 className="text-sm font-bold text-[#1A1A1A] uppercase tracking-wider">
                  Doorstep Delivery Address
                </h2>
              </div>
              <div className="text-xs text-stone-600 space-y-1">
                <p className="font-bold text-[#1A1A1A] text-sm">{order.user?.name}</p>
                <p>{order.user?.email}</p>
                <p className="pt-1">{order.shippingAddress?.address}, {order.shippingAddress?.city}</p>
                <p>{order.shippingAddress?.country}</p>
              </div>

              <div className="mt-4 pt-4 border-t border-stone-100">
                {order.isDelivered ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full">
                    <FiCheckCircle size={14} /> Delivered on {order.deliveredAt?.substring(0, 10)}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-50 px-3 py-1.5 rounded-full">
                    <FiTruck size={14} /> Islandwide Courier Dispatch in Progress
                  </span>
                )}
              </div>
            </div>

            {/* Payment Method Card */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/80 shadow-sm">
              <div className="flex items-center gap-3 pb-4 mb-4 border-b border-stone-100">
                <div className="p-2 rounded-xl bg-[#F9F7F5] text-[#C9A87C]">
                  <FiCreditCard size={18} />
                </div>
                <h2 className="text-sm font-bold text-[#1A1A1A] uppercase tracking-wider">
                  Payment Status
                </h2>
              </div>
              <p className="text-xs text-stone-600 mb-3">
                Method: <strong className="text-[#1A1A1A] uppercase">{order.paymentMethod === 'CashOnDelivery' ? 'Cash on Delivery (COD)' : order.paymentMethod}</strong>
              </p>

              <div>
                {order.isPaid ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full">
                    <FiCheckCircle size={14} /> Paid on {order.paidAt?.substring(0, 10)}
                  </span>
                ) : order.paymentMethod === 'CashOnDelivery' ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-700 bg-stone-100 px-3 py-1.5 rounded-full">
                    <FiClock size={14} /> Pay in cash when delivered to your doorstep
                  </span>
                ) : (
                  <div className="space-y-4">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-50 px-3 py-1.5 rounded-full">
                      <FiClock size={14} /> Payment Pending
                    </span>
                    {isPending && <div className="text-xs text-stone-400">Loading payment gateway...</div>}
                    {isResolved && (
                      <div className="pt-2 max-w-sm">
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Order Items Card */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/80 shadow-sm">
              <div className="flex items-center gap-3 pb-4 mb-4 border-b border-stone-100">
                <div className="p-2 rounded-xl bg-[#F9F7F5] text-[#C9A87C]">
                  <FiPackage size={18} />
                </div>
                <h2 className="text-sm font-bold text-[#1A1A1A] uppercase tracking-wider">
                  Ordered Accessories ({order.orderItems?.length || 0})
                </h2>
              </div>

              <div className="divide-y divide-stone-100">
                {order.orderItems?.map((item, index) => (
                  <div key={index} className="py-4 first:pt-0 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={getImageUrl(item.image)} 
                        alt={item.name} 
                        className="w-14 h-16 object-cover rounded-xl border border-stone-200 flex-shrink-0" 
                      />
                      <div>
                        <Link to={`/product/${item.product}`} className="text-xs sm:text-sm font-semibold text-[#1A1A1A] hover:text-[#C9A87C] transition-colors line-clamp-1">
                          {item.name}
                        </Link>
                        <p className="text-[11px] text-stone-500">Qty: {item.qty} × LKR {Number(item.price).toLocaleString()}</p>
                      </div>
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-[#1A1A1A]">
                      LKR {Number(item.qty * item.price).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Invoice Column (4 cols) */}
          <div className="lg:col-span-4">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/80 shadow-sm sticky top-28">
              <h3 className="text-base font-bold uppercase tracking-wider text-[#1A1A1A] border-b border-stone-100 pb-4 mb-6">
                Price Breakdown
              </h3>

              <div className="space-y-3 text-xs text-stone-600 mb-6">
                <div className="flex justify-between">
                  <span>Items Subtotal</span>
                  <span className="font-semibold text-[#1A1A1A]">LKR {Number(order.itemsPrice).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Islandwide Shipping</span>
                  <span className="font-semibold text-[#1A1A1A]">
                    {Number(order.shippingPrice) === 0 ? 'FREE' : `LKR ${Number(order.shippingPrice).toLocaleString()}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span className="font-semibold text-[#1A1A1A]">LKR {Number(order.taxPrice || 0).toLocaleString()}</span>
                </div>
              </div>

              <div className="flex justify-between items-baseline border-t border-stone-200 pt-5 mb-6">
                <span className="text-sm font-extrabold uppercase tracking-wider text-[#1A1A1A]">Total Paid / Due</span>
                <span className="text-2xl font-extrabold text-[#1A1A1A]">
                  LKR {Number(order.totalPrice).toLocaleString()}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[#F9F7F5] border border-stone-200 text-xs text-stone-500 space-y-2">
                <p className="font-semibold text-stone-700">Need support with your order?</p>
                <p>Call or WhatsApp ShopStore hotline: <strong className="text-[#C9A87C]">070 280 9286</strong></p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </motion.div>
  );
};

export default Order;

