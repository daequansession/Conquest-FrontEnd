import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../services/users.js";
import "../css/Register.css";

import { UserContext } from "../context/UserContext.jsx";

function Register() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    // isError: false,
    // errorMsg: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const credentials = {
        username: form.username,
        password: form.password,
        email: form.email || "",
      };

      const userData = await signUp(credentials);

      if (!userData || userData instanceof Error || userData.error) {
        throw new Error("Invalid Credentials");
      }

      // Registration successful, redirect to sign-in page
      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
      setForm((prevForm) => ({
        ...prevForm,
        isError: true,
        errorMsg: "Invalid Credentials",
        password: "",
      }));
    }
  };

  const renderError = () => {
    const toggleForm = form.isError ? "danger" : "";

    if (form.isError) {
      return (
        <button type="submit" className={toggleForm}>
          {form.errorMsg}
        </button>
      );
    } else {
      return <button type="submit">Register</button>;
    }
  };

  return (
    <div className="home-container">
      <div>
        <form className="home-form" onSubmit={handleSubmit}>
          <h1>Register</h1>
          <input
            type="text"
            name="username"
            value={form.username}
            placeholder="Enter Username"
            onChange={handleChange}
            required
            autoComplete="off"
          />
          <input
            type="password"
            name="password"
            value={form.password}
            placeholder="Enter Password"
            onChange={handleChange}
            required
            autoComplete="off"
          />

          {renderError()}
        </form>
      </div>
    </div>
  );
}

export default Register;
