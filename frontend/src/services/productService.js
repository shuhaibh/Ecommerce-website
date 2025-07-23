import api from './api';

// --- General functions ---
export const getProducts = async (params) => {
  const response = await api.get('/products', { params });
  return response.data;
};

export const getProductDetails = async (id) => {
  const response = await api.get(`/product/${id}`);
  return response.data;
};

// --- Admin-facing functions ---
export const createProduct = async (productData) => {
  const response = await api.post('/admin/product/new', productData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const updateProduct = async (id, productData) => {
  const response = await api.put(`/admin/product/${id}`, productData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await api.delete(`/admin/product/${id}`);
  return response.data;
};

// --- Review functions ---
export const createReview = async (reviewData) => {
  const response = await api.put('/review', reviewData);
  return response.data;
};

export const getProductReviews = async (productId) => {
  const response = await api.get(`/reviews?id=${productId}`);
  return response.data;
};

export const deleteReview = async (reviewId, productId) => {
  const response = await api.delete(`/reviews?id=${reviewId}&productId=${productId}`);
  return response.data;
};

// --- New Seller-facing function ---
export const getSellerProducts = async () => {
    // Assuming a backend endpoint like this exists for sellers
    const response = await api.get('/seller/products');
    return response.data;
};
