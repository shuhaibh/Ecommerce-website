import api from './api';

export const login = async (email, password) => {
  const response = await api.post('/login', { email, password });
  return response.data;
};

export const register = async (userData) => {
  const response = await api.post('/register', userData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const logout = async () => {
  const response = await api.get('/logout');
  return response.data;
};

export const getMyProfile = async () => {
  const response = await api.get('/user/profile');
  return response.data;
};

// --- New function to update user profile ---
export const updateProfile = async (userData) => {
  const response = await api.put('/me/update', userData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const forgotPassword = async (email) => {
  const response = await api.post('/password/forgot', { email });
  return response.data;a
};

export const resetPassword = async (token, passwords) => {
  const response = await api.put(`/password/reset/${token}`, passwords);
  return response.data;
};