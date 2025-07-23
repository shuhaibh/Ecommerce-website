import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import ProtectedRoute from './ProtectedRoute';

// --- Core Pages ---
import Home from '../pages/Home';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import Wishlist from '../pages/Wishlist';
import NotFound from '../pages/NotFound';

// --- Auth Pages ---
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import PasswordReset from '../pages/auth/PasswordReset';
import NewPassword from '../pages/auth/NewPassword';

// --- Product Pages ---
import AllProducts from '../pages/product/AllProducts';
import Product from '../pages/product/Product';

// --- User Pages ---
import UserProfile from '../pages/user/UserProfile';
import UserOrders from '../pages/user/UserOrders';

// --- Order Pages ---
import OrderConfirm from '../pages/order/OrderConfirm';
import OrderSuccess from '../pages/order/OrderSuccess';
import OrderDetail from '../pages/order/OrderDetail';
import Payment from '../pages/payment/Payment'; // 1. Import Payment component

// --- Admin Pages ---
import AdminDashboard from '../pages/admin/AdminDashboard';
import ProductManagement from '../pages/admin/ProductManagement';
import CreateProduct from '../pages/admin/CreateProduct';
import UpdateProduct from '../pages/admin/UpdateProduct';
import AdminOrderManagement from '../pages/admin/AdminOrderManagement';
import AdminUserManagement from '../pages/admin/AdminUserManagement';
import AdminUpdateUser from '../pages/admin/AdminUpdateUser';

// --- Seller Pages ---
import SellerDashboard from '../pages/seller/SellerDashboard';
import SellerProductManagement from '../pages/seller/SellerProductManagement';
import SellerOrders from '../pages/seller/SellerOrders';

// 2. Load Stripe with your publishable key from your backend's .env file
const stripePromise = loadStripe('pk_test_51BTUDGJAJfZb9HEBwDg86TN1KNprHjkfipXyAlLpUmvD4LMAkLxjBsTBGS7OiFPODl72DR5SgBStNMFdktUBe4wF00IdA9fRZY');

const AppRoutes = () => {
  return (
    <Routes>
      {/* --- Public Routes --- */}
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<AllProducts />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/password/forgot" element={<PasswordReset />} />
      <Route path="/password/reset/:token" element={<NewPassword />} />
      
      {/* --- Protected User Routes --- */}
      <Route element={<ProtectedRoute />}>
        <Route path="/user/profile" element={<UserProfile />} />
        <Route path="/user/orders" element={<UserOrders />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order/confirm" element={<OrderConfirm />} />
        <Route path="/order/success" element={<OrderSuccess />} />
        <Route path="/order/:id" element={<OrderDetail />} />
        {/* 3. Add the protected payment route, wrapped with the Elements provider */}
        <Route path="/payment" element={<Elements stripe={stripePromise}><Payment /></Elements>} />
      </Route>

      {/* --- Protected Admin Routes --- */}
      <Route element={<ProtectedRoute isAdmin={true} />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/products" element={<ProductManagement />} />
        <Route path="/admin/product/new" element={<CreateProduct />} />
        <Route path="/admin/product/:id" element={<UpdateProduct />} />
        <Route path="/admin/orders" element={<AdminOrderManagement />} />
        <Route path="/admin/users" element={<AdminUserManagement />} />
        <Route path="/admin/user/:id" element={<AdminUpdateUser />} />
      </Route>

      {/* --- Protected Seller Routes --- */}
      <Route element={<ProtectedRoute />}>
        <Route path="/seller/dashboard" element={<SellerDashboard />} />
        <Route path="/seller/products" element={<SellerProductManagement />} />
        <Route path="/seller/orders" element={<SellerOrders />} />
        <Route path="/seller/product/new" element={<CreateProduct />} />
        <Route path="/seller/product/:id" element={<UpdateProduct />} />
      </Route>

      {/* --- Not Found Page --- */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
