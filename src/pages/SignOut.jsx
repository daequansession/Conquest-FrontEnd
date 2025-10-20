import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "../services/users.js";
import { UserContext } from "../context/UserContext.jsx";

function SignOut() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    const signOutUser = async () => {
      await signOut();
      setUser(null);
      navigate("/");
    };
    signOutUser();
  }, []);

  return "";
}

export default SignOut;
