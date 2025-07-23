  import React from 'react';
  import { Link } from 'react-router-dom';
  import { useAuth } from '../../context/AuthContext';
  import { useCart } from '../../context/CartContext';
  import { useTheme } from '../../context/ThemeContext'; // 1. Import useTheme

  const Header = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const { cartItems } = useCart();
    const { theme, toggleTheme } = useTheme(); // 2. Get theme and toggle function

    return (
      <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50 text-gray-800 dark:text-gray-200">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold">
              E-Shop
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/" className="hover:text-blue-500">Home</Link>
              <Link to="/products" className="hover:text-blue-500">Products</Link>
            </div>
            <div className="flex items-center space-x-4">
              {/* 3. Add the theme toggle button */}
              <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                {theme === 'light' ? '🌙' : '☀️'}
              </button>
              <Link to="/wishlist" className="hover:text-blue-500">❤️</Link>
              <Link to="/cart" className="relative hover:text-blue-500">
                <span>🛒</span>
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItems.reduce((a, c) => a + c.quantity, 0)}
                  </span>
                )}
              </Link>
              {isAuthenticated ? (
                <div className="relative group">
                  <span className="cursor-pointer flex items-center">
                    <img src={user.avatar?.url} alt={user.name} className="w-8 h-8 rounded-full object-cover mr-2" />
                    {user.name}
                  </span>
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {user.role === 'admin' && <Link to="/admin/dashboard" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600">Dashboard</Link>}
                    <Link to="/user/profile" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600">Profile</Link>
                    <Link to="/user/orders" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600">Orders</Link>
                    <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600">Logout</button>
                  </div>
                </div>
              ) : (
                <Link to="/login" className="hover:text-blue-500">Login</Link>
              )}
            </div>
          </div>
        </nav>
      </header>
    );
  };

  export default Header;
