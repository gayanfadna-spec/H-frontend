import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { getImageUrl } from '../utils/getImageUrl';

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
    if (order && !order.isPaid) {
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
      toast.success('Payment successful');
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  const onError = (err) => {
    toast.error(err.message);
  };

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: { value: order.totalPrice },
        },
      ],
    });
  };

  if (loading) return <div className="pt-32 pb-24 min-h-screen text-center">Loading...</div>;
  if (error) return <div className="pt-32 pb-24 min-h-screen text-center text-red-500">{error}</div>;

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="pt-32 pb-24 bg-premium-light min-h-screen"
    >
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 uppercase tracking-widest text-premium-dark">Order {order._id}</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded shadow-sm">
              <h2 className="text-xl font-bold uppercase tracking-widest mb-4">Shipping</h2>
              <p><strong>Name: </strong> {order.user.name}</p>
              <p><strong>Email: </strong> {order.user.email}</p>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city} {order.shippingAddress.postalCode}, {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <div className="mt-4 p-4 bg-green-100 text-green-800 rounded">Delivered on {order.deliveredAt.substring(0,10)}</div>
              ) : (
                <div className="mt-4 p-4 bg-red-100 text-red-800 rounded">Not Delivered</div>
              )}
            </div>

            <div className="bg-white p-6 rounded shadow-sm">
              <h2 className="text-xl font-bold uppercase tracking-widest mb-4">Payment Method</h2>
              <p><strong>Method: </strong> {order.paymentMethod}</p>
              {order.isPaid ? (
                <div className="mt-4 p-4 bg-green-100 text-green-800 rounded">Paid on {order.paidAt.substring(0,10)}</div>
              ) : (
                <div className="mt-4 p-4 bg-red-100 text-red-800 rounded">Not Paid</div>
              )}
            </div>

            <div className="bg-white p-6 rounded shadow-sm">
              <h2 className="text-xl font-bold uppercase tracking-widest mb-4">Order Items</h2>
              {order.orderItems.length === 0 ? <p>Order is empty</p> : (
                <div className="space-y-4">
                  {order.orderItems.map((item, index) => (
                    <div key={index} className="flex gap-4 border-b pb-4">
                      <img src={getImageUrl(item.image)} alt={item.name} className="w-16 h-16 object-cover rounded" />
                      <div className="flex-1">
                        <Link to={`/product/${item.product}`} className="font-semibold text-premium-dark hover:underline">{item.name}</Link>
                      </div>
                      <div className="font-medium text-gray-600">
                        {item.qty} x LKR {item.price} = LKR {(item.qty * item.price).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold mb-6 uppercase tracking-wider text-premium-dark border-b pb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Items</span>
                  <span>LKR {order.itemsPrice}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>LKR {order.shippingPrice}</span>
                </div>
                <div className="flex justify-between font-bold text-premium-dark text-lg pt-4 border-t border-gray-100">
                  <span>Total</span>
                  <span>LKR {order.totalPrice}</span>
                </div>
                {!order.isPaid && (
                  <div className="mt-4">
                    {isPending && <div>Loading PayPal...</div>}
                    {isResolved && (
                      <PayPalButtons
                        createOrder={createOrder}
                        onApprove={onApprove}
                        onError={onError}
                      />
                    )}
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

export default Order;
