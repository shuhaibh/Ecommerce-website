import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/common/Loader';

const ProtectedRoute = ({ isAdmin }) => {
  const { isAuthenticated, loading, user } = useAuth();

  // Show a loader while authentication status is being checked
  if (loading) {
    return <Loader />;
  }

  // If the user is not authenticated, redirect them to the login page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If this is an admin-only route and the user is not an admin, redirect them
  if (isAdmin && user.role !== 'admin') {
    return <Navigate to="/" replace />; // Redirect to home page
  }

  // If the user is authenticated and authorized, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;
