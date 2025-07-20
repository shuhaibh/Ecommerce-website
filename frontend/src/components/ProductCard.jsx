// src/components/ProductCard.jsx
import { FaHeart, FaRegHeart, FaShoppingCart } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  const {
    _id,
    name,
    price,
    image,
    rating = 4.5, // default if not present
    inWishlist = false,
  } = product;

  return (
    <div className="bg-white shadow rounded-lg p-4 hover:shadow-md transition-all">
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover rounded-md"
      />

      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {name}
        </h3>

        <div className="flex items-center justify-between mt-2">
          <span className="text-blue-600 font-bold text-md">₹{price}</span>
          <span className="text-sm text-yellow-500">{rating}★</span>
        </div>

        <div className="flex justify-between mt-4">
          <button className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
            <FaShoppingCart />
            Add to Cart
          </button>
          <button className="text-red-500 text-lg hover:scale-110 transition-transform">
            {inWishlist ? <FaHeart /> : <FaRegHeart />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
