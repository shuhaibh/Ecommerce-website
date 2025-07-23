import api from './api';

// Corrected to use /order endpoint
export const createOrder = async (orderData) => {
  const response = await api.post('/order/new', orderData);
  return response.data;
};

// Corrected to use /order endpoint
export const getMyOrders = async () => {
  const response = await api.get('/order/me');
  return response.data;
};

// Corrected to use /order endpoint
export const getOrderDetails = async (id) => {
  const response = await api.get(`/order/detail/${id}`);
  return response.data;
};

// Corrected admin endpoints
export const getAllOrders = async () => {
  const response = await api.get('/order/admin/all');
  return response.data;
};

export const updateOrder = async (id, orderData) => {
  const response = await api.patch(`/order/admin/update/${id}`, orderData);
  return response.data;
};

export const deleteOrder = async (id) => {
  const response = await api.delete(`/order/admin/delete/${id}`);
  return response.data;
};

// Corrected seller endpoint
export const getSellerOrders = async () => {
    const response = await api.get('/order/seller/all');
    return response.data;
};
