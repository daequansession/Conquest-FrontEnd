import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createShield } from "../services/shields.js";
import "../css/CreateShield.css";

function CreateShield() {
  let navigate = useNavigate();

  const [shield, setShield] = useState({
    name: "",
    strength: "",
    defense: "",
    speed: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setShield((prevShield) => ({
      ...prevShield,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await createShield(shield);
    navigate("/shields");
  };

  return (
    <div className="create-shield-root">
      <div className="create-shield-heading">
        <h2>Add a shield</h2>
      </div>
      <form className="create-shield-form" onSubmit={handleSubmit}>
        <input
          className="input-shield-name"
          placeholder="Name"
          name="name"
          value={shield.name}
          onChange={handleChange}
          required
          autoFocus
        />
        <input
          className="input-shield-strength"
          placeholder="Strength"
          name="strength"
          value={shield.strength}
          onChange={handleChange}
          required
        />
        <input
          className="input-shield-defense"
          placeholder="Defense"
          name="defense"
          value={shield.defense}
          onChange={handleChange}
          required
        />
        <input
          className="input-shield-speed"
          placeholder="Speed"
          name="speed"
          value={shield.speed}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreateShield;
