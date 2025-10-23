import api from "./apiConfig.js";

export const getHeroes = async () => {
  try {
    const response = await api.get("/heroes/");
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const getHero = async (id) => {
  try {
    const response = await api.get(`/heroes/${id}/`);
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const createHero = async (heroData) => {
  try {
    const response = await api.post("/heroes/", heroData);
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const updateHero = async (id, heroData) => {
  try {
    const response = await api.put(`/heroes/${id}/`, heroData);
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const deleteHero = async (id) => {
  try {
    const response = await api.delete(`/heroes/${id}/`);
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const addShieldToHero = async (heroId, shieldId) => {
  try {
    const response = await api.post(
      `/heroes/${heroId}/add_shield/${shieldId}/`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const removeShieldFromHero = async (heroId, shieldId) => {
  try {
    const response = await api.post(
      `/heroes/${heroId}/remove_shield/${shieldId}/`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const addWeaponToHero = async (heroId, weaponId) => {
  try {
    const response = await api.post(
      `/heroes/${heroId}/add_weapon/${weaponId}/`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const removeWeaponFromHero = async (heroId, weaponId) => {
  try {
    const response = await api.post(
      `/heroes/${heroId}/remove_weapon/${weaponId}/`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

// Multi-user combat functions
export const getAllPublicHeroes = async () => {
  try {
    const response = await api.get("/heroes/public/");
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getHeroesByUser = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}/heroes/`);
    return response.data;
  } catch (error) {
    return error;
  }
};
