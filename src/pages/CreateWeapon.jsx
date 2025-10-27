import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createWeapon } from "../services/weapons.js";
import "../css/CreateWeapon.css";

function CreateWeapon() {
  let navigate = useNavigate();

  const [weapon, setWeapon] = useState({
    name: "",
    strength: "",
    defense: "",
    speed: "",
    cost: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setWeapon((prevWeapon) => ({
      ...prevWeapon,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log("Sending weapon data:", weapon);
      await createWeapon(weapon);
      navigate("/weapons");
    } catch (error) {
      console.error("Error creating weapon:", error);
      console.error("Error response data:", error.response?.data);
      console.error("Error response status:", error.response?.status);
    }
  };

  return (
    <div className="create-weapon-root">
      <div className="create-weapon-heading">
        <h2>Add a weapon</h2>
      </div>
      <form className="create-weapon-form" onSubmit={handleSubmit}>
        <input
          className="input-weapon-name"
          placeholder="Name"
          name="name"
          value={weapon.name}
          onChange={handleChange}
          required
          autoFocus
        />
        <input
          className="input-weapon-strength"
          placeholder="Strength"
          name="strength"
          value={weapon.strength}
          onChange={handleChange}
          required
        />
        <input
          className="input-weapon-defense"
          placeholder="Defense"
          name="defense"
          value={weapon.defense}
          onChange={handleChange}
          required
        />
        <input
          className="input-weapon-speed"
          placeholder="Speed"
          name="speed"
          value={weapon.speed}
          onChange={handleChange}
          required
        />
         <input
          className="input-weapon-cost"
          placeholder="Cost"
          name="cost"
          value={weapon.cost}
          onChange={handleChange}
          required
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreateWeapon;
