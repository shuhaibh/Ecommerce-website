// The core component for the admin's product approval workflow.

import React, { useState, useEffect } from 'react';
import { getPendingProducts, approveProduct, rejectProduct } from '../../services/adminService';
import Loader from '../../components/common/Loader';
import MessageBox from '../../components/common/MessageBox';

const PendingProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchPendingProducts = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const data = await getPendingProducts();
      setProducts(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch pending products.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingProducts();
  }, []);

  const handleAction = async (action, productId, message) => {
    try {
      setError('');
      setSuccess('');
      await action(productId);
      setSuccess(message);
      setProducts(products.filter(p => p._id !== productId));
    } catch (err) {
      setError(err.response?.data?.message || 'Action failed.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
       <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
        Product Approvals
      </h1>
      {success && <MessageBox variant="success">{success}</MessageBox>}
      {error && <MessageBox variant="error">{error}</MessageBox>}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        {loading ? (
          <Loader />
        ) : (
          <div className="overflow-x-auto">
            {products.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Product Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Seller</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {products.map(product => (
                    <tr key={product._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{product.item_id?.name || 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{product.seller_id?.name || 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">${product.item_id?.price?.toFixed(2) || '0.00'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                        <button onClick={() => handleAction(approveProduct, product._id, 'Product Approved!')} className="text-green-600 hover:text-green-900">Approve</button>
                        <button onClick={() => handleAction(rejectProduct, product._id, 'Product Rejected!')} className="text-red-600 hover:text-red-900">Reject</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <MessageBox>No pending products to review.</MessageBox>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingProducts;
