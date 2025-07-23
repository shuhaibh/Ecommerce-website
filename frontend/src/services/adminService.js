import api from './api';

// --- Product Approval ---
export const getPendingProducts = async () => {
  const response = await api.get('/admin/products/pending');
  return response.data;
};

export const approveProduct = async (productId) => {
  const response = await api.patch(`/admin/products/approve/${productId}`);
  return response.data;
};

export const rejectProduct = async (productId) => {
  const response = await api.patch(`/admin/products/reject/${productId}`);
  return response.data;
};


// --- Order Management ---
export const getAllOrders = async () => {
  const response = await api.get('/admin/orders');
  return response.data;
};


// --- User Management ---
export const getAllUsers = async () => {
  const response = await api.get('/admin/users');
  return response.data;
};

export const updateUser = async (userId, userData) => {
  const response = await api.patch(`/admin/users/${userId}`, userData);
  return response.data;
};

export const deleteUser = async (userId) => {
  const response = await api.delete(`/admin/users/${userId}`);
  return response.data;
};
