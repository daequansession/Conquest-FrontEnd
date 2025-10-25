import { createContext, useEffect, useState } from "react";
import { verifyUser } from "../services/users";
import { getGold } from "../services/gold";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [gold, setGold] = useState({ amount: 0 });
  const [dungeonProgress, setDungeonProgress] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await verifyUser();
      localStorage.setItem("user", JSON.stringify(user));
      if (user) {
        setUser(user);
        console.log(gold);
        setDungeonProgress(user.dungeonProgress || []);
        const goldData = await getGold();
        setGold(goldData);
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
      value={{ user, setUser, dungeonProgress, setDungeonProgress }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
