import React from 'react';
import { Link } from 'react-router-dom';
import StarRating from './StarRating'; 

const ProductCard = ({ product }) => {
  // Fallback for product image if not available
  const imageUrl = product.images && product.images[0] 
    ? product.images[0].url 
    : 'https://placehold.co/600x400/efefef/313131?text=No+Image';

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white dark:bg-gray-800 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <Link to={`/product/${product._id}`} className="block">
        <div className="aspect-w-3 aspect-h-4 bg-gray-200 sm:aspect-none h-60">
          <img
            src={imageUrl}
            alt={product.name}
            className="h-full w-full object-cover object-center sm:h-full sm:w-full transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>
      <div className="flex flex-1 flex-col space-y-2 p-4">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
          <Link to={`/product/${product._id}`}>
            <span aria-hidden="true" className="absolute inset-0" />
            {product.name}
          </Link>
        </h3>
        <p className="text-sm text-gray-500">{product.category}</p>
        <div className="flex flex-1 flex-col justify-end">
          <div className="flex items-center">
            <StarRating rating={product.ratings} />
            <span className="ml-2 text-xs text-gray-500">
              ({product.numOfReviews} reviews)
            </span>
          </div>
          <p className="text-lg font-semibold text-gray-900 dark:text-white mt-2">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </div>
       <button 
          // TODO: Implement add to cart functionality
          // onClick={() => addToCart(product)} 
          className="absolute bottom-4 right-4 flex items-center justify-center w-10 h-10 bg-gray-900 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </button>
    </div>
  );
};

export default ProductCard;
