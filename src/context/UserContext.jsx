import { createContext, useEffect, useState } from "react";
import { verifyUser } from "../services/users";
const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [dungeonProgress, setDungeonProgress] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await verifyUser();
      localStorage.setItem("user", JSON.stringify(user));
      if (user) {
        setUser(user);
        setDungeonProgress(user.dungeonProgress || []);
      } else {
        setUser(null);
        setDungeonProgress([]);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, dungeonProgress, setDungeonProgress }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
