import api from "./apiConfig.js";

export const getWeapons = async () => {
  try {
    const response = await api.get("/weapon/");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getWeapon = async (id) => {
  try {
    const response = await api.get(`/weapon/${id}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createWeapon = async (weaponData) => {
  try {
    const response = await api.post("/weapon/", weaponData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateWeapon = async (id, weaponData) => {
  try {
    const response = await api.put(`/weapon/${id}/`, weaponData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteWeapon = async (id) => {
  try {
    const response = await api.delete(`/weapon/${id}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
