import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSellerOrders } from '../../services/orderService';
import Loader from '../../components/common/Loader';
import MessageBox from '../../components/common/MessageBox';

const SellerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSellerOrders = async () => {
      setLoading(true);
      try {
        const data = await getSellerOrders();
        if (data.success) {
          setOrders(data.orders);
        } else {
          throw new Error('Could not fetch your orders');
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'An error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchSellerOrders();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
        Manage My Orders
      </h1>

      {loading && <Loader />}
      {error && <MessageBox variant="error">{error}</MessageBox>}
      
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold uppercase">Order ID</th>
              <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold uppercase">Status</th>
              <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold uppercase">Items Qty</th>
              <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold uppercase">Amount</th>
              <th className="px-5 py-3 border-b-2"></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-5 py-5 border-b text-sm">{order._id}</td>
                <td className="px-5 py-5 border-b text-sm">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    order.orderStatus === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.orderStatus}
                  </span>
                </td>
                <td className="px-5 py-5 border-b text-sm">{order.orderItems.length}</td>
                <td className="px-5 py-5 border-b text-sm">${order.totalPrice.toFixed(2)}</td>
                <td className="px-5 py-5 border-b text-sm text-right">
                  {/* Sellers would likely view the same order detail page as admins */}
                  <Link to={`/admin/order/${order._id}`} className="text-blue-600 hover:underline">View Details</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellerOrders;
