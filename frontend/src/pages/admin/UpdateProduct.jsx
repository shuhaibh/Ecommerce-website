import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductDetails, updateProduct } from '../../services/productService';
import MessageBox from '../../components/common/MessageBox';
import Loader from '../../components/common/Loader';

const UpdateProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [Stock, setStock] = useState(0);
  const [oldImages, setOldImages] = useState([]);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();
  const { id: productId } = useParams();

  const categories = [ "Electronics", "Cameras", "Laptops", "Accessories", "Headphones", "Food", "Books", "Clothes/Shoes", "Beauty/Health", "Sports", "Outdoor", "Home" ];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { success, product } = await getProductDetails(productId);
        if (success) {
          setName(product.name);
          setPrice(product.price);
          setDescription(product.description);
          setCategory(product.category);
          setStock(product.Stock);
          setOldImages(product.images);
        } else {
          throw new Error('Product not found');
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    setImagesPreview([]);
    setOldImages([]); // Clear old images if new ones are selected

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
    setUpdateLoading(true);
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
      const data = await updateProduct(productId, formData);
      if (data.success) {
        setSuccess('Product updated successfully!');
        setTimeout(() => navigate('/admin/products'), 2000);
      } else {
        throw new Error('Failed to update product');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setUpdateLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-8 flex justify-center">
      <div className="w-full max-w-2xl">
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 space-y-6">
          <h1 className="text-2xl font-bold text-center">Update Product</h1>

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
            <input type="file" id="images" onChange={handleImageChange} multiple className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border cursor-pointer" />
          </div>
          <div className="flex flex-wrap gap-4">
            {oldImages.map((img) => (
              <img key={img.public_id} src={img.url} alt="Product Preview" className="w-24 h-24 object-cover rounded-md border" />
            ))}
            {imagesPreview.map((img, index) => (
              <img key={index} src={img} alt="Product Preview" className="w-24 h-24 object-cover rounded-md border" />
            ))}
          </div>
          <button type="submit" className="w-full mt-4 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-400" disabled={updateLoading}>
            {updateLoading ? <Loader /> : 'Update Product'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
