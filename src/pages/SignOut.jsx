import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "../services/users.js";
import { UserContext } from "../context/UserContext.jsx";
import "../css/SignOut.css";

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
  }, [navigate, setUser]);

  return "";
}

export default SignOut;
