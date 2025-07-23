import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutSteps = ({ shipping, confirmOrder, payment }) => {
  const Step = ({ to, number, label, active, completed }) => {
    const linkClasses = `flex items-center ${active || completed ? 'text-blue-600' : 'text-gray-500'}`;
    const numberClasses = `flex items-center justify-center w-8 h-8 rounded-full text-lg font-bold mr-2 ${active ? 'bg-blue-600 text-white' : completed ? 'bg-blue-200 text-blue-800' : 'bg-gray-200 text-gray-600'}`;

    return (
      <Link to={to} className={linkClasses}>
        <div className={numberClasses}>{number}</div>
        <span className="font-medium">{label}</span>
      </Link>
    );
  };

  return (
    <div className="flex justify-center items-center space-x-4 md:space-x-8 my-8">
      <Step to="/checkout" number="1" label="Shipping" active={shipping} completed={shipping} />
      
      <div className="flex-1 h-px bg-gray-300"></div>

      <Step to="/order/confirm" number="2" label="Confirm Order" active={confirmOrder} completed={confirmOrder} />

      <div className="flex-1 h-px bg-gray-300"></div>

      <Step to="/payment" number="3" label="Payment" active={payment} completed={payment} />
    </div>
  );
};

export default CheckoutSteps;
