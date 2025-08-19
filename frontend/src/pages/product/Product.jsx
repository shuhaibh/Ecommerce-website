import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductDetails } from '../../services/productService';
import { useCart } from '../../context/CartContext';
import Loader from '../../components/common/Loader';
import MessageBox from '../../components/common/MessageBox';
import StarRating from '../../components/product/StarRating';

const Product = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState('');
  const [addedToCart, setAddedToCart] = useState(false);

  const { id: productId } = useParams();
  const { addItemToCart } = useCart();

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await getProductDetails(productId);
        setProduct(data);

        // **FIX:** Check if images exist and are not empty before setting the main image.
        if (data?.item_id?.images?.length > 0) {
          setMainImage(data.item_id.images[0].url);
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'An error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleQuantityChange = (amount) => {
    const newQuantity = quantity + amount;
    if (newQuantity > 0 && newQuantity <= product?.item_id?.Stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    addItemToCart(product, quantity); // It's often better to pass the whole product
    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  };

  if (loading) return <div className="flex justify-center items-center h-screen"><Loader /></div>;
  if (error) return <div className="p-8"><MessageBox variant="error">{error}</MessageBox></div>;
  if (!product || !product.item_id) return <div className="p-8"><MessageBox>Product not found.</MessageBox></div>;

  const item = product.item_id;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 mb-4">
            <img src={mainImage} alt={item.name} className="h-full w-full object-cover object-center" />
          </div>
          <div className="flex space-x-2">
            {/* **FIX:** Check if item.images is an array before mapping over it. */}
            {item.images && item.images.map((img) => (
              <button
                key={img.public_id}
                onClick={() => setMainImage(img.url)}
                className={`w-20 h-20 rounded-md overflow-hidden border-2 ${mainImage === img.url ? 'border-blue-500' : 'border-transparent'}`}
              >
                <img src={img.url} alt="thumbnail" className="h-full w-full object-cover object-center" />
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{item.name}</h1>
          <p className="text-sm text-gray-500 mt-2">Product # {product._id}</p>
          
          <div className="flex items-center my-4">
            <StarRating rating={item.ratings || 0} />
            <span className="ml-3 text-sm text-gray-500">({item.numOfReviews || 0} Reviews)</span>
          </div>

          <p className="text-3xl text-gray-900 dark:text-white my-4">${item.price?.toFixed(2) || '0.00'}</p>
          
          <div className="flex items-center my-4">
            <button onClick={() => handleQuantityChange(-1)} className="px-3 py-1 border rounded-l-md">-</button>
            <input type="text" value={quantity} readOnly className="w-12 text-center border-t border-b" />
            <button onClick={() => handleQuantityChange(1)} className="px-3 py-1 border rounded-r-md">+</button>
          </div>

          <button 
            onClick={handleAddToCart}
            className={`w-full max-w-xs mt-4 px-6 py-3 text-base font-medium text-white rounded-lg focus:ring-4 focus:ring-blue-300 transition-colors duration-300 ${addedToCart ? 'bg-green-500' : 'bg-blue-600 hover:bg-blue-700'} disabled:bg-gray-400`}
            disabled={!item.Stock || item.Stock < 1 || addedToCart}
          >
            {!item.Stock || item.Stock < 1 ? 'Out of Stock' : addedToCart ? 'Added!' : 'Add to Cart'}
          </button>

          <div className="my-6">
            <p className={`text-lg font-semibold ${!item.Stock || item.Stock < 1 ? 'text-red-500' : 'text-green-500'}`}>
              Status: {!item.Stock || item.Stock < 1 ? 'Out of Stock' : 'In Stock'}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Description</h2>
            <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
          </div>

          <button className="mt-6 text-blue-600 font-semibold">Submit Review</button>
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Reviews</h2>
        {item.reviews && item.reviews.length > 0 ? (
          <div className="space-y-6">
            {item.reviews.map(review => (
              <div key={review._id} className="p-4 border rounded-lg">
                <p className="font-semibold">{review.name}</p>
                <StarRating rating={review.rating} />
                <p className="mt-2 text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <MessageBox>No reviews yet.</MessageBox>
        )}
      </div>
    </div>
  );
};

export default Product;