import api from "./apiConfig";

//  Create a new battle log (called after each combat)
export const createBattleLog = async (data) => {
  try {
    const response = await api.post("/battles/create/", data);
    return response.data;
  } catch (error) {
    console.error("Error creating battle log:", error);
    return error;
  }
};

//  Get all battles involving the current user (for full history)
export const getBattleLogs = async () => {
  try {
    const response = await api.get("/battles/");
    return response.data;
  } catch (error) {
    console.error("Error fetching battle logs:", error);
    return error;
  }
};

//  Get unread battles (for Nav notification bell)
export const getUnreadBattles = async () => {
  try {
    const response = await api.get("/battles/unread/");
    return response.data;
  } catch (error) {
    console.error("Error fetching unread battles:", error);
    return error;
  }
};

//  Mark all battles as read (called when user views notifications)
export const markBattlesAsRead = async () => {
  try {
    const response = await api.post("/battles/mark-read/");
    return response.data;
  } catch (error) {
    console.error("Error marking battles as read:", error);
    return error;
  }
};
