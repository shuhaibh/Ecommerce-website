import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const adminLinks = [
    { to: '/admin/products', label: 'Manage Products', description: 'Approve or reject new products from sellers.' },
    { to: '/admin/orders', label: 'Manage Orders', description: 'View, update, and process all customer orders.' },
    { to: '/admin/users', label: 'Manage Users', description: 'View, update, and manage user accounts.' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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