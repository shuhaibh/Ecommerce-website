import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getOrderDetails } from '../../services/orderService';
import Loader from '../../components/common/Loader';
import MessageBox from '../../components/common/MessageBox';

const OrderDetail = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { id: orderId } = useParams();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const { success, order } = await getOrderDetails(orderId);
        if (success) {
          setOrder(order);
        } else {
          throw new Error('Could not fetch order details.');
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'An error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading) return <div className="flex justify-center items-center h-screen"><Loader /></div>;
  if (error) return <div className="p-8"><MessageBox variant="error">{error}</MessageBox></div>;
  if (!order) return <div className="p-8"><MessageBox>Order not found.</MessageBox></div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        Order #{order._id}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Shipping Info */}
          <div className="p-6 border rounded-lg bg-white dark:bg-gray-800">
            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
            <div className="space-y-2 text-gray-700 dark:text-gray-300">
              <p><strong>Name:</strong> {order.user?.name}</p>
              <p><strong>Phone:</strong> {order.shippingInfo?.phoneNo}</p>
              <p><strong>Address:</strong> {`${order.shippingInfo?.address}, ${order.shippingInfo?.city}, ${order.shippingInfo?.postalCode}, ${order.shippingInfo?.country}`}</p>
            </div>
          </div>

          {/* Payment Info */}
          <div className="p-6 border rounded-lg bg-white dark:bg-gray-800">
            <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
            <div className="space-y-2 text-gray-700 dark:text-gray-300">
              <p><strong>Status:</strong> 
                <span className={`ml-2 font-semibold ${order.paymentInfo?.status === 'succeeded' ? 'text-green-500' : 'text-red-500'}`}>
                  {order.paymentInfo?.status === 'succeeded' ? 'PAID' : 'NOT PAID'}
                </span>
              </p>
              <p><strong>Paid At:</strong> {new Date(order.paidAt).toLocaleString()}</p>
            </div>
          </div>

          {/* Order Status */}
          <div className="p-6 border rounded-lg bg-white dark:bg-gray-800">
              <h2 className="text-xl font-semibold mb-4">Order Status</h2>
              <p className={`font-semibold ${order.orderStatus === 'Delivered' ? 'text-green-500' : 'text-yellow-500'}`}>
                  {order.orderStatus}
              </p>
          </div>

          {/* Order Items */}
          <div className="p-6 border rounded-lg bg-white dark:bg-gray-800">
            <h2 className="text-xl font-semibold mb-4">Order Items</h2>
            <div className="space-y-4">
              {order.orderItems?.map(item => (
                <div key={item.product} className="flex items-center">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md mr-4" />
                  <div className="flex-grow">
                    <Link to={`/product/${item.product}`} className="font-semibold hover:underline">{item.name}</Link>
                  </div>
                  <div className="text-gray-700 dark:text-gray-300">
                    {item.quantity} x ${item.price.toFixed(2)} = <b>${(item.quantity * item.price).toFixed(2)}</b>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="p-6 border rounded-lg bg-white dark:bg-gray-800 sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between"><span>Subtotal:</span> <span>${order.itemsPrice.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Shipping:</span> <span>${order.shippingPrice.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Tax:</span> <span>${order.taxPrice.toFixed(2)}</span></div>
              <hr className="my-2"/>
              <div className="flex justify-between font-bold text-lg"><span>Total:</span> <span>${order.totalPrice.toFixed(2)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
