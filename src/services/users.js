import api from "./apiConfig";

export const signUp = async (credentials) => {
  try {
    const resp = await api.post("/users/register/", credentials);
    localStorage.setItem("token", resp.data.access);
    return resp.data.user;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const signIn = async (credentials) => {
  try {
    const resp = await api.post("/users/login/", credentials);
    localStorage.setItem("token", resp.data.access);
    return resp.data.user;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const signOut = async () => {
  try {
    localStorage.removeItem("token");
    return true;
  } catch (error) {
    return error;
  }
};

// Multi-user functions
export const getAllUsers = async () => {
  try {
    const response = await api.get("/users/");
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getUserById = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}/`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await api.delete(`/users/${userId}/`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getUserProfile = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}/profile/`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const updateUser = async (id, userData) => {
  try {
    const response = await api.patch(`/users/${id}/`, userData);
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const verifyUser = async () => {
  const token = localStorage.getItem("token");
  if (token) {
    const resp = await api.get("/users/token/refresh/");
    localStorage.setItem("token", resp.data.access);
    return resp.data.user;
  }
  return false;
};
