import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as authService from '../services/authService';
import Loader from '../components/common/Loader';

const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadUser = useCallback(async () => {
    setLoading(true);
    try {
      const response = await authService.getMyProfile();
      if (response && response.data) {
        setUser(response.data);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Failed to load user profile:", error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      if (response && response.userObject) {
        setUser(response.userObject);
        setIsAuthenticated(true);
        return { success: true, user: response.userObject };
      } else {
        throw new Error(response.message || 'Login failed, please try again.');
      }
    } catch (error) {
      console.error("Login failed in context:", error);
      setUser(null);
      setIsAuthenticated(false);
      return { success: false, message: error.response?.data?.error || error.message };
    }
  };

  const register = async (userData) => {
    const data = await authService.register(userData);
    if (data.success) {
      await loadUser();
    }
    return data;
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
  };

  if (loading) {
    return <Loader />;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
