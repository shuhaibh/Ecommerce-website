import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../../services/productService';
import MessageBox from '../../components/common/MessageBox';
import Loader from '../../components/common/Loader';

const CreateProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  // A list of categories for the dropdown
  const categories = [
    "Electronics",
    "Cameras",
    "Laptops",
    "Accessories",
    "Headphones",
    "Food",
    "Books",
    "Clothes/Shoes",
    "Beauty/Health",
    "Sports",
    "Outdoor",
    "Home",
  ];

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview(old => [...old, reader.result]);
          setImages(old => [...old, file]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.set('name', name);
    formData.set('price', price);
    formData.set('description', description);
    formData.set('category', category);
    formData.set('Stock', Stock);

    images.forEach(image => {
      formData.append('images', image);
    });

    try {
      const data = await createProduct(formData);
      if (data.success) {
        setSuccess('Product created successfully!');
        setTimeout(() => navigate('/admin/products'), 2000);
      } else {
        throw new Error('Failed to create product');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 flex justify-center">
      <div className="w-full max-w-2xl">
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 space-y-6">
          <h1 className="text-2xl font-bold text-center">Create New Product</h1>

          {error && <MessageBox variant="error">{error}</MessageBox>}
          {success && <MessageBox variant="success">{success}</MessageBox>}

          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium">Product Name</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full p-2.5 border rounded-lg" />
          </div>

          <div>
            <label htmlFor="price" className="block mb-2 text-sm font-medium">Price</label>
            <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} required className="w-full p-2.5 border rounded-lg" />
          </div>
          
          <div>
            <label htmlFor="description" className="block mb-2 text-sm font-medium">Description</label>
            <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required rows="4" className="w-full p-2.5 border rounded-lg"></textarea>
          </div>

          <div>
            <label htmlFor="category" className="block mb-2 text-sm font-medium">Category</label>
            <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} required className="w-full p-2.5 border rounded-lg bg-white">
              <option value="">Select Category</option>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>

          <div>
            <label htmlFor="stock" className="block mb-2 text-sm font-medium">Stock</label>
            <input type="number" id="stock" value={Stock} onChange={(e) => setStock(e.target.value)} required className="w-full p-2.5 border rounded-lg" />
          </div>
          
          <div>
            <label htmlFor="images" className="block mb-2 text-sm font-medium">Images</label>
            <input type="file" id="images" onChange={handleImageChange} required multiple className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border cursor-pointer" />
          </div>

          <div className="flex flex-wrap gap-4">
            {imagesPreview.map((img, index) => (
              <img key={index} src={img} alt="Product Preview" className="w-24 h-24 object-cover rounded-md border" />
            ))}
          </div>

          <button type="submit" className="w-full mt-4 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-400" disabled={loading}>
            {loading ? <Loader /> : 'Create Product'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
