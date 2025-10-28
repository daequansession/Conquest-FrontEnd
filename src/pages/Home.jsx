import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../services/users.js";
import "../css/Home.css";
import { UserContext } from "../context/UserContext.jsx";

import HolyPaladinImg from '../assets/HolyPaladin.png';
import DeathKnightImg from '../assets/DeathKnight.png';
import ChackieJanImg from '../assets/ChackieJan.png';
import DemonHunterImg from '../assets/DemonHunter.png';
import DragonKnightImg from '../assets/DragonKnight.png';
import EveryItalianEverImg from '../assets/EveryItalianEver.png';
import MexicanVaqueroImg from '../assets/MexicanVaquero.png';
import PrimalBarbarianImg from '../assets/PrimalBarbarian.png';
import ShadowAssassinImg from '../assets/ShadowAssassin.png';

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

      if (!userData.id) {
        throw new Error("Invalid Credentials");
      }

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
    <div className="home-root" >
      
      <p className="home-hero-section-p" id="p">
        Conquest!
      </p>
      <h2 className="home-message">Embark on your quest. Forge heroes, conquer dungeons, and claim your destiny!</h2>
        <div style={{background: 'rgba(30, 30, 60, 0.8)', display: 'flex', marginTop: '100px', justifyContent: 'center', gap: '32px', margin: '32px 0', flexWrap: 'wrap' }}>
          <img src={HolyPaladinImg} alt="Holy Paladin" style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', boxShadow: '0 4px 16px rgba(255, 215, 0, 0.3)', border: '3px solid #ffd700', background: '#222' }} />
          <img src={DeathKnightImg} alt="Death Knight" style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', boxShadow: '0 4px 16px rgba(255, 215, 0, 0.3)', border: '3px solid #ffd700', background: '#222' }} />
          <img src={ChackieJanImg} alt="Chackie Jan" style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', boxShadow: '0 4px 16px rgba(255, 215, 0, 0.3)', border: '3px solid #ffd700', background: '#222' }} />
          <img src={DemonHunterImg} alt="Demon Hunter" style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', boxShadow: '0 4px 16px rgba(255, 215, 0, 0.3)', border: '3px solid #ffd700', background: '#222' }} />
          <img src={DragonKnightImg} alt="Dragon Knight" style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', boxShadow: '0 4px 16px rgba(255, 215, 0, 0.3)', border: '3px solid #ffd700', background: '#222' }} />
          <img src={EveryItalianEverImg} alt="Every Italian Ever" style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', boxShadow: '0 4px 16px rgba(255, 215, 0, 0.3)', border: '3px solid #ffd700', background: '#222' }} />
          <img src={MexicanVaqueroImg} alt="Mexican Vaquero" style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', boxShadow: '0 4px 16px rgba(255, 215, 0, 0.3)', border: '3px solid #ffd700', background: '#222' }} />
          <img src={PrimalBarbarianImg} alt="Primal Barbarian" style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', boxShadow: '0 4px 16px rgba(255, 215, 0, 0.3)', border: '3px solid #ffd700', background: '#222' }} />
          <img src={ShadowAssassinImg} alt="Shadow Assassin" style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', boxShadow: '0 4px 16px rgba(255, 215, 0, 0.3)', border: '3px solid #ffd700', background: '#222' }} />
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
    </div>
  );
}

export default Home;
