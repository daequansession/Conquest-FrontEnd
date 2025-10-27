import { createContext, useEffect, useState } from "react";
import { verifyUser } from "../services/users";
import { getGold } from "../services/gold";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [gold, setGold] = useState({ amount: 0 });
  const [dungeonProgress, setDungeonProgress] = useState([]);

  const fetchGold = async () => {
    try {
      const goldData = await getGold();
      setGold(goldData);
    } catch (error) {
      console.error("Error fetching gold:", error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const verifiedUser = await verifyUser();
      if (verifiedUser) {
        localStorage.setItem("user", JSON.stringify(verifiedUser));
        setUser(verifiedUser);
        setDungeonProgress(verifiedUser.dungeonProgress || []);
        await fetchGold();
      } else {
        setUser(null);
        setDungeonProgress([]);
        setGold({ amount: 0 });
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        gold,
        setGold,
        fetchGold,
        dungeonProgress,
        setDungeonProgress,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
