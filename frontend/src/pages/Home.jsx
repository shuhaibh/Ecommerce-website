import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to E-Shop</h1>
      <p className="text-lg mb-8">Your one-stop shop for everything you need.</p>
      <Link to="/products" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        Browse Products
      </Link>
    </div>
  );
};

export default Home;
