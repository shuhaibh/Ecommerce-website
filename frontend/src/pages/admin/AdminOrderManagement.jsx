import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllOrders, deleteOrder } from '../../services/adminService';
import Loader from '../../components/common/Loader';
import MessageBox from '../../components/common/MessageBox';

const AdminOrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchAllOrders = async () => {
    setLoading(true);
    try {
      const data = await getAllOrders();
      setOrders(data);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while fetching orders.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to permanently delete this order?')) {
      try {
        const { message } = await deleteOrder(id);
        setSuccess(message || 'Order deleted successfully.');
        setOrders(prevOrders => prevOrders.filter(order => order._id !== id));
      } catch (err) {
        setError(err.response?.data?.message || 'An error occurred while deleting the order.');
      }
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Shipped': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Processing': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100';
      case 'Cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
        Manage All Orders
      </h1>

      {loading && <Loader />}
      {error && <MessageBox variant="error">{error}</MessageBox>}
      {success && <MessageBox variant="success">{success}</MessageBox>}

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 dark:border-gray-700 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Order ID</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 dark:border-gray-700 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">User</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 dark:border-gray-700 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Date</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 dark:border-gray-700 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Total</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 dark:border-gray-700 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Status</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 dark:border-gray-700"></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-5 py-5 border-b border-gray-200 dark:border-gray-700 text-sm">
                  <p className="text-gray-900 dark:text-white whitespace-no-wrap">{order._id}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 dark:border-gray-700 text-sm">
                  <p className="text-gray-900 dark:text-white whitespace-no-wrap">{order.user_id?.name || 'N/A'}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 dark:border-gray-700 text-sm">
                  <p className="text-gray-900 dark:text-white whitespace-no-wrap">{new Date(order.createdAt).toLocaleDateString()}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 dark:border-gray-700 text-sm">
                  <p className="text-gray-900 dark:text-white whitespace-no-wrap">${order.totalPrice.toFixed(2)}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 dark:border-gray-700 text-sm">
                  <span className={`relative inline-block px-3 py-1 font-semibold leading-tight rounded-full ${getStatusClass(order.orderStatus)}`}>
                    <span className="relative">{order.orderStatus}</span>
                  </span>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 dark:border-gray-700 text-sm text-right space-x-4">
                  <Link to={`/admin/order/${order._id}`} className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 font-semibold">Edit</Link>
                  <button onClick={() => handleDelete(order._id)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 font-semibold">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!loading && orders.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500">No orders found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrderManagement;