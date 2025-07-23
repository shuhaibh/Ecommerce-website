import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, deleteProduct } from '../../services/productService';
import Loader from '../../components/common/Loader';
import MessageBox from '../../components/common/MessageBox';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteSuccess, setDeleteSuccess] = useState('');

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      if (data.success) {
        setProducts(data.products);
      } else {
        throw new Error('Could not fetch products');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const { success, message } = await deleteProduct(id);
        if (success) {
          setDeleteSuccess(message || 'Product deleted successfully.');
          fetchProducts(); // Refresh the list
        } else {
          throw new Error('Failed to delete product.');
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'An error occurred.');
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Manage Products
        </h1>
        <Link 
          to="/admin/product/new" 
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Create Product
        </Link>
      </div>

      {loading && <Loader />}
      {error && <MessageBox variant="error">{error}</MessageBox>}
      {deleteSuccess && <MessageBox variant="success">{deleteSuccess}</MessageBox>}
      
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold uppercase">ID</th>
              <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold uppercase">Name</th>
              <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold uppercase">Stock</th>
              <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold uppercase">Price</th>
              <th className="px-5 py-3 border-b-2"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-5 py-5 border-b text-sm">{product._id}</td>
                <td className="px-5 py-5 border-b text-sm">{product.name}</td>
                <td className="px-5 py-5 border-b text-sm">{product.Stock}</td>
                <td className="px-5 py-5 border-b text-sm">${product.price.toFixed(2)}</td>
                <td className="px-5 py-5 border-b text-sm text-right space-x-2">
                  <Link to={`/admin/product/${product._id}`} className="text-blue-600 hover:underline">Edit</Link>
                  <button onClick={() => handleDelete(product._id)} className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagement;
