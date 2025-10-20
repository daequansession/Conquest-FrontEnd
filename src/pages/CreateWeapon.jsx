import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createWeapon } from "../services/weapons.js";

function CreateWeapon() {
  let navigate = useNavigate();

  const [weapon, setWeapon] = useState({
    name: "",
    color: "",
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
    await createWeapon(weapon);
    navigate("/weapons");
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
          className="input-weapon-color"
          placeholder="Color"
          name="color"
          value={weapon.color}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreateWeapon;
