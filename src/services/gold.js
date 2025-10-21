import api from "./apiConfig.js";

export const getAllGold = async () => {
  try {
    const response = await api.get("/gold/");
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};
export const getGold = async () => {
  try {
    const response = await api.get("/gold/"); // Just get the user's gold
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const updateGold = async (id, heroData) => {
  try {
    const response = await api.put(`/gold/${id}/`, heroData);
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};
