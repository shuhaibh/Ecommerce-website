import api from './api';

// --- User-facing functions ---

export const createOrder = async (orderData) => {
  const response = await api.post('/order/new', orderData);
  return response.data;
};

export const getMyOrders = async () => {
  const response = await api.get('/orders/me');
  return response.data;
};

export const getOrderDetails = async (id) => {
  const response = await api.get(`/order/${id}`);
  return response.data;
};


// --- Admin-facing functions ---

export const getAllOrders = async () => {
  const response = await api.get('/admin/orders');
  return response.data;
};

export const updateOrder = async (id, orderData) => {
  const response = await api.put(`/admin/order/${id}`, orderData);
  return response.data;
};

export const deleteOrder = async (id) => {
  const response = await api.delete(`/admin/order/${id}`);
  return response.data;
};

// --- New Seller-facing function ---
export const getSellerOrders = async () => {
    // Assuming a backend endpoint like this exists for sellers
    const response = await api.get('/seller/orders');
    return response.data;
};
