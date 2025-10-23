import { createContext, useEffect, useState } from "react";
import { verifyUser } from "../services/users";
const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const user = await verifyUser();
      localStorage.setItem("user", JSON.stringify(user));
      user ? setUser(user) : setUser(null);
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
