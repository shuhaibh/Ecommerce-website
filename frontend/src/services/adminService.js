import api from './api';

// --- Product Management ---
export const getPendingProducts = async () => {
  const { data } = await api.get('/admin/products');
  return data;
};

export const approveProduct = async (productId) => {
  const { data } = await api.patch(`/admin/products/approve/${productId}`);
  return data;
};

export const rejectProduct = async (productId) => {
  const { data } = await api.patch(`/admin/products/reject/${productId}`);
  return data;
};

// --- Order Management ---
export const getAllOrders = async () => {
  const { data } = await api.get('/admin/orders');
  return data;
};

export const getOrderDetails = async (orderId) => {
    const { data } = await api.get(`/admin/orders/${orderId}`);
    return data;
};

export const updateOrderStatus = async (orderId, statusData) => {
    const { data } = await api.patch(`/admin/orders/${orderId}`, statusData);
    return data;
};

export const deleteOrder = async (orderId) => {
  const { data } = await api.delete(`/admin/orders/${orderId}`);
  return data;
};