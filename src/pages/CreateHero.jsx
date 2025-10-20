import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createHero } from "../services/heroes.js";

function CreateHero() {
  let navigate = useNavigate();

  const [hero, setHero] = useState({
    name: "",
    strength: 0,
    defense: 0,
    speed: 0,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setHero((prevHero) => ({
      ...prevHero,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await createHero(hero);
    navigate("/heroes");
  };

  return (
    <div className="create-hero-root">
      <div className="create-hero-heading">
        <h2>Add a hero</h2>
      </div>
      <form className="create-form" onSubmit={handleSubmit}>
        <input
          className="input-name"
          placeholder="Name"
          name="name"
          value={hero.name}
          onChange={handleChange}
          required
          autoFocus
        />
        <input
          className="input-strength"
          placeholder="Strength"
          name="strength"
          value={hero.strength}
          onChange={handleChange}
          required
        />
        <input
          className="input-defense"
          placeholder="Defense"
          name="defense"
          value={hero.defense}
          onChange={handleChange}
          required
        />
        <input
          className="input-speed"
          placeholder="Speed"
          name="speed"
          value={hero.speed}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreateHero;
