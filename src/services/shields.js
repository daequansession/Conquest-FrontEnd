import api from "./apiConfig.js";

export const getShields = async () => {
  try {
    const response = await api.get("/shield/");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getShield = async (id) => {
  try {
    const response = await api.get(`/shield/${id}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createShield = async (weaponData) => {
  try {
    const response = await api.post("/shield/", weaponData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateShield = async (id, weaponData) => {
  try {
    const response = await api.put(`/shield/${id}/`, weaponData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteShield = async (id) => {
  try {
    const response = await api.delete(`/shield/${id}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
