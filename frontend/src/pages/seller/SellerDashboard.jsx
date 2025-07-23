import React from 'react';
import { Link } from 'react-router-dom';

const SellerDashboard = () => {
  // In a real application, you would fetch and display seller-specific stats.
  const stats = [
    { label: 'Total Revenue', value: '$12,500' },
    { label: 'Orders This Month', value: '150' },
    { label: 'Active Listings', value: '45' },
    { label: 'Pending Orders', value: '12' },
  ];

  const sellerLinks = [
    { to: '/seller/products', label: 'Manage My Products', description: 'View, edit, and add your product listings.' },
    { to: '/seller/orders', label: 'Manage My Orders', description: 'View and process incoming orders for your products.' },
    { to: '/seller/profile', label: 'Seller Profile', description: 'Update your seller information and settings.' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
        Seller Dashboard
      </h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.label}</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Navigation Links Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sellerLinks.map((link) => (
          <Link 
            key={link.to} 
            to={link.to} 
            className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{link.label}</h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2">{link.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SellerDashboard;
