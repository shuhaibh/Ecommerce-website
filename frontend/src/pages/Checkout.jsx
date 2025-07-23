import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // We'll use this to save shipping info
import CheckoutSteps from '../components/common/CheckoutSteps'; // A new component for progress indication

// A simplified list of countries for the dropdown
const countriesList = ["USA", "Canada", "UK", "Australia", "India", "Germany"];

const Checkout = () => {
  // We'll need to add saveShippingInfo to the CartContext later
  // For now, we'll use localStorage directly
  const { cartItems } = useCart();

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [country, setCountry] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const shippingInfoFromStorage = localStorage.getItem('shippingInfo')
      ? JSON.parse(localStorage.getItem('shippingInfo'))
      : {};
    
    setAddress(shippingInfoFromStorage.address || '');
    setCity(shippingInfoFromStorage.city || '');
    setPostalCode(shippingInfoFromStorage.postalCode || '');
    setPhoneNo(shippingInfoFromStorage.phoneNo || '');
    setCountry(shippingInfoFromStorage.country || '');

  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const shippingInfo = { address, city, postalCode, phoneNo, country };
    localStorage.setItem('shippingInfo', JSON.stringify(shippingInfo));
    
    // TODO: Add saveShippingInfo(shippingInfo) to CartContext
    
    navigate('/order/confirm'); // Navigate to the next step
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* We will create this component next */}
      <CheckoutSteps shipping />

      <div className="flex justify-center mt-8">
        <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
            Shipping Information
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="address" className="block mb-2 text-sm font-medium">Address</label>
              <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} required className="w-full p-2.5 border rounded-lg" />
            </div>
            <div>
              <label htmlFor="city" className="block mb-2 text-sm font-medium">City</label>
              <input type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)} required className="w-full p-2.5 border rounded-lg" />
            </div>
            <div>
              <label htmlFor="postalCode" className="block mb-2 text-sm font-medium">Postal Code</label>
              <input type="text" id="postalCode" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required className="w-full p-2.5 border rounded-lg" />
            </div>
            <div>
              <label htmlFor="phoneNo" className="block mb-2 text-sm font-medium">Phone Number</label>
              <input type="tel" id="phoneNo" value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} required className="w-full p-2.5 border rounded-lg" />
            </div>
            <div>
              <label htmlFor="country" className="block mb-2 text-sm font-medium">Country</label>
              <select id="country" value={country} onChange={(e) => setCountry(e.target.value)} required className="w-full p-2.5 border rounded-lg bg-white">
                <option value="">Select Country</option>
                {countriesList.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <button type="submit" className="w-full mt-4 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
