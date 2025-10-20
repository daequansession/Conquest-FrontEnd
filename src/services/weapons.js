import api from "./apiConfig.js";

export const getWeapons = async () => {
  try {
    const response = await api.get("/weapons/");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getWeapon = async (id) => {
  try {
    const response = await api.get(`/weapons/${id}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createWeapon = async (weaponData) => {
  try {
    const response = await api.post("/weapons/", weaponData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateWeapon = async (id, weaponData) => {
  try {
    const response = await api.put(`/weapons/${id}/`, weaponData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteWeapon = async (id) => {
  try {
    const response = await api.delete(`/weapons/${id}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
