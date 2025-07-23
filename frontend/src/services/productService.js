import api from './api';

export const getProducts = async (params) => {
  // The backend route is '/products'
  const response = await api.get('/products', { params });
  return response.data;
};

export const getProductDetails = async (id) => {
  // The backend route is '/products/:productId'
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const createProduct = async (productData) => {
  // The backend route is '/products/create'
  const response = await api.post('/products/create', productData);
  return response.data;
};

export const updateProduct = async (id, productData) => {
  // The backend route is '/products/update/:productId'
  const response = await api.patch(`/products/update/${id}`, productData);
  return response.data;
};

export const deleteProduct = async (id) => {
  // The backend route is '/products/delete/:productId'
  const response = await api.delete(`/products/delete/${id}`);
  return response.data;
};

// --- Other service functions remain for context ---
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

export const getSellerProducts = async () => {
  const response = await api.get('/seller/items');
  return response.data;
};