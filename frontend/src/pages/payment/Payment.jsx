import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { createOrder } from '../../services/orderService';
import api from '../../services/api';
import CheckoutSteps from '../../components/common/CheckoutSteps';
import MessageBox from '../../components/common/MessageBox';
import Loader from '../../components/common/Loader';

const Payment = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  
  const { user } = useAuth();
  const { cartItems, clearCart } = useCart();
  
  const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
  const shippingInfo = JSON.parse(localStorage.getItem('shippingInfo'));

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    orderItems: cartItems.map(item => ({...item, product: item.product})),
    shippingInfo,
    itemsPrice: orderInfo.itemsPrice,
    taxPrice: orderInfo.taxPrice,
    shippingPrice: orderInfo.shippingPrice,
    totalPrice: orderInfo.totalPrice,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    try {
      const { data } = await api.post('/payment/process', paymentData);
      const client_secret = data.client_secret;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              postal_code: shippingInfo.postalCode,
              country: "US", // Stripe requires a 2-letter country code
            },
          },
        },
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      if (result.paymentIntent.status === 'succeeded') {
        order.paymentInfo = {
          id: result.paymentIntent.id,
          status: result.paymentIntent.status,
        };

        const { success } = await createOrder(order);

        if (success) {
          clearCart();
          localStorage.removeItem('shippingInfo');
          sessionStorage.removeItem('orderInfo');
          navigate('/order/success');
        }
      } else {
        throw new Error('Payment failed. Please try again.');
      }
    } catch (err) {
      setError(err.message || 'An error occurred during payment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <CheckoutSteps shipping confirmOrder payment />
      <div className="flex justify-center mt-8">
        <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <h1 className="text-2xl font-bold text-center">Card Information</h1>
          {error && <MessageBox variant="error">{error}</MessageBox>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium">Card Number</label>
              <CardNumberElement className="p-2.5 border rounded-lg" />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Card Expiry</label>
              <CardExpiryElement className="p-2.5 border rounded-lg" />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Card CVC</label>
              <CardCvcElement className="p-2.5 border rounded-lg" />
            </div>
            <button
              type="submit"
              className="w-full mt-4 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
              disabled={!stripe || loading}
            >
              {loading ? <Loader /> : `Pay $${orderInfo.totalPrice}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payment;
