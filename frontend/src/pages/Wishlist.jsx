import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import MessageBox from '../components/common/MessageBox';
import StarRating from '../components/product/StarRating';

const Wishlist = () => {
  const { wishlistItems, removeItemFromWishlist } = useWishlist();
  const { addItemToCart } = useCart();

  const handleMoveToCart = (product) => {
    addItemToCart(product, 1);
    removeItemFromWishlist(product._id);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
        My Wishlist
      </h1>
      {wishlistItems.length === 0 ? (
        <MessageBox>
          Your wishlist is empty. <Link to="/products" className="text-blue-600 hover:underline">Explore products</Link>
        </MessageBox>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {wishlistItems.map((product) => (
            <div key={product._id} className="group relative flex flex-col overflow-hidden rounded-lg border bg-white dark:bg-gray-800 shadow-sm">
              <Link to={`/product/${product._id}`} className="block">
                <div className="aspect-w-3 aspect-h-4 bg-gray-200 h-60">
                  <img
                    src={product.images[0]?.url || 'https://placehold.co/600x400'}
                    alt={product.name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              </Link>
              <div className="flex flex-1 flex-col space-y-2 p-4">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                  <Link to={`/product/${product._id}`}>{product.name}</Link>
                </h3>
                <div className="flex items-center">
                  <StarRating rating={product.ratings} />
                  <span className="ml-2 text-xs text-gray-500">({product.numOfReviews} reviews)</span>
                </div>
                <p className="text-lg font-semibold text-gray-900 dark:text-white mt-2">
                  ${product.price.toFixed(2)}
                </p>
                <div className="flex flex-col space-y-2 mt-4">
                    <button 
                        onClick={() => handleMoveToCart(product)}
                        className="w-full px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded hover:bg-blue-700 transition-colors"
                    >
                        Move to Cart
                    </button>
                    <button 
                        onClick={() => removeItemFromWishlist(product._id)}
                        className="w-full px-4 py-2 bg-red-500 text-white text-sm font-semibold rounded hover:bg-red-600 transition-colors"
                   >
                        Remove
                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
