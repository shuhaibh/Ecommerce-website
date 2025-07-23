import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  // In a real app, you'd fetch stats like total sales, number of users, etc.
  const stats = [
    { label: 'Total Sales', value: '$54,320' },
    { label: 'Total Orders', value: '1,250' },
    { label: 'Total Products', value: '340' },
    { label: 'Total Users', value: '850' },
  ];

  const adminLinks = [
    { to: '/admin/products', label: 'Manage Products', description: 'View, edit, and create products.' },
    { to: '/admin/orders', label: 'Manage Orders', description: 'View and process customer orders.' },
    { to: '/admin/users', label: 'Manage Users', description: 'View and manage user accounts and roles.' },
    { to: '/admin/reviews', label: 'Manage Reviews', description: 'Moderate product reviews.' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
        Admin Dashboard
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
        {adminLinks.map((link) => (
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

export default AdminDashboard;
