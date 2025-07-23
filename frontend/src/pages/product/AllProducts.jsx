
import React, { useState, useEffect } from 'react';
import { getProducts } from '../../services/productService';
import ProductCard from '../../components/product/ProductCard';
import Loader from '../../components/common/Loader';
import MessageBox from '../../components/common/MessageBox';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError('');
      try {
        // Your backend returns an array of products directly.
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'An error occurred while fetching products.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
        All Products
      </h1>
      
      {loading ? (
        <Loader />
      ) : error ? (
        <MessageBox variant="error">{error}</MessageBox>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProducts;