import api from './api';

// Corrected to use /item endpoint
export const getProducts = async (params) => {
  const response = await api.get('/products', { params });
  return response.data;
};

// Corrected to use /item endpoint
export const getProductDetails = async (id) => {
  const response = await api.get(`/item/detail/${id}`);
  return response.data;
};

// Admin endpoints for products are also under /item
export const createProduct = async (productData) => {
  const response = await api.post('/item/create', productData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const updateProduct = async (id, productData) => {
  const response = await api.patch(`/item/update/${id}`, productData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await api.delete(`/item/delete/${id}`);
  return response.data;
};

// Assuming review endpoints are consistent, but check your backend if issues persist
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

// Corrected for seller-specific products
export const getSellerProducts = async () => {
    const response = await api.get('/seller/items');
    return response.data;
};  
