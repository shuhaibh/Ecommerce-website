import api from "./api";

// --- Admin-facing user management functions ---

export const getAllUsers = async () => {
  const response = await api.get("/admin/users");
  return response.data;
};

export const getUserDetails = async (id) => {
  const response = await api.get(`/admin/users/${id}`);
  return response.data;
};

export const updateUser = async (id, userData) => {
  const response = await api.patch(`/admin/users/${id}`, userData);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await api.delete(`/admin/users/${id}`);
  return response.data;
};
