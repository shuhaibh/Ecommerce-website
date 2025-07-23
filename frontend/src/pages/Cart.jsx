import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import MessageBox from '../components/common/MessageBox';

const Cart = () => {
  const { cartItems, removeItemFromCart, updateCartItemQuantity } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = (productId, quantity) => {
    const numQuantity = Number(quantity);
    if (numQuantity > 0) {
      updateCartItemQuantity(productId, numQuantity);
    }
  };

  const handleRemoveItem = (productId) => {
    removeItemFromCart(productId);
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping'); // Or directly to /checkout if shipping is part of it
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
        Your Shopping Cart
      </h1>
      {cartItems.length === 0 ? (
        <MessageBox>
          Your cart is empty. <Link to="/products" className="text-blue-600 hover:underline">Go Shopping</Link>
        </MessageBox>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.product} className="flex items-center p-4 border rounded-lg bg-white dark:bg-gray-800">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md mr-4" />
                <div className="flex-grow">
                  <Link to={`/product/${item.product}`} className="font-semibold text-lg hover:underline">{item.name}</Link>
                  <p className="text-gray-600 dark:text-gray-300">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center mx-4">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.product, e.target.value)}
                    min="1"
                    max={item.stock}
                    className="w-16 text-center border rounded-md"
                  />
                </div>
                <button
                  onClick={() => handleRemoveItem(item.product)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="md:col-span-1">
            <div className="p-6 border rounded-lg bg-white dark:bg-gray-800">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>TBD</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <button
                onClick={checkoutHandler}
                className="w-full mt-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
