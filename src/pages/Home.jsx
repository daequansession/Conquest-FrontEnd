import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../services/users.js";
import { UserContext } from "../context/UserContext.jsx";

function Home() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [form, setForm] = useState({
    username: "",
    password: "",
    isError: false,
    errorMsg: "",
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
      const userData = await signIn(form);
      setUser(userData);

      navigate("/heroes");
    } catch (error) {
      console.error(error);
      setForm((prevForm) => ({
        isError: true,
        errorMsg: "Invalid Credentials",
        username: prevForm.username,
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
      return <button type="submit">Log In</button>;
    }
  };

  return (
    <>
      <div className="landing-main">
        <div className="greet-msg">
          <h1>Conquest</h1>
          <p>
            <em>Conquest</em> Lorem, ipsum dolor sit amet consectetur
            adipisicing elit. Eius obcaecati enim vel corrupti veritatis natus,
            tempore fugit dolore aliquam illo praesentium libero debitis sed
            rem, aspernatur facere eum quos mollitia?
          </p>
        </div>
      </div>
      <div className="home-container">
        <div>
          <form className="home-form" onSubmit={handleSubmit}>
            <h1>Login</h1>
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

            <Link to="/register">
              <p>No account? Sign up here!</p>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}

export default Home;
