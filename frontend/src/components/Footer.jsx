// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 py-6 mt-10 border-t">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
        {/* Brand Name */}
        <div className="text-xl font-semibold mb-4 sm:mb-0">
          ShopNest
        </div>

        {/* Links */}
        <div className="flex gap-6 text-sm">
          <a href="#" className="hover:text-blue-500 transition">Home</a>
          <a href="#" className="hover:text-blue-500 transition">Wishlist</a>
          <a href="#" className="hover:text-blue-500 transition">Cart</a>
          <a href="#" className="hover:text-blue-500 transition">Profile</a>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="text-center text-xs text-gray-500 mt-4">
        &copy; {new Date().getFullYear()} ShopNest. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
