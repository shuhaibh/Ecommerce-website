import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import CheckoutSteps from '../../components/common/CheckoutSteps';
import MessageBox from '../../components/common/MessageBox';

const OrderConfirm = () => {
  const { cartItems } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Retrieve shipping info from localStorage
  const shippingInfo = JSON.parse(localStorage.getItem('shippingInfo')) || {};

  // Calculations
  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingPrice = itemsPrice > 200 ? 0 : 25; // Example shipping logic
  const taxPrice = Number((0.05 * itemsPrice).toFixed(2)); // Example 5% tax
  const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);

  const proceedToPayment = () => {
    const data = {
      itemsPrice: itemsPrice.toFixed(2),
      shippingPrice,
      taxPrice,
      totalPrice,
    };
    sessionStorage.setItem('orderInfo', JSON.stringify(data));
    navigate('/payment');
  };
  
  if (cartItems.length === 0) {
      return <MessageBox>Your cart is empty. Cannot confirm order.</MessageBox>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <CheckoutSteps shipping confirmOrder />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        {/* Left Column: Shipping and Cart Items */}
        <div className="md:col-span-2 space-y-8">
          {/* Shipping Info */}
          <div className="p-6 border rounded-lg bg-white dark:bg-gray-800">
            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
            <div className="space-y-2 text-gray-700 dark:text-gray-300">
              <p><strong>Name:</strong> {user?.name}</p>
              <p><strong>Phone:</strong> {shippingInfo.phoneNo}</p>
              <p><strong>Address:</strong> {`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`}</p>
            </div>
          </div>

          {/* Cart Items */}
          <div className="p-6 border rounded-lg bg-white dark:bg-gray-800">
            <h2 className="text-xl font-semibold mb-4">Your Cart Items</h2>
            <div className="space-y-4">
              {cartItems.map(item => (
                <div key={item.product} className="flex items-center">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md mr-4" />
                  <div className="flex-grow">
                    <Link to={`/product/${item.product}`} className="font-semibold hover:underline">{item.name}</Link>
                  </div>
                  <div className="text-gray-700 dark:text-gray-300">
                    {item.quantity} x ${item.price.toFixed(2)} = <b>${(item.quantity * item.price).toFixed(2)}</b>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="md:col-span-1">
          <div className="p-6 border rounded-lg bg-white dark:bg-gray-800">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between"><span>Subtotal:</span> <span>${itemsPrice.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Shipping:</span> <span>${shippingPrice.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Tax:</span> <span>${taxPrice.toFixed(2)}</span></div>
              <hr className="my-2"/>
              <div className="flex justify-between font-bold text-lg"><span>Total:</span> <span>${totalPrice}</span></div>
            </div>
            <button
              onClick={proceedToPayment}
              className="w-full mt-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirm;
