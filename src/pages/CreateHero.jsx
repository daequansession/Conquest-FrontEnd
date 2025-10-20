import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createHero } from "../services/heroes.js";

function CreateHero() {
  let navigate = useNavigate();

  const [hero, setHero] = useState({
    name: "",
    strength: 3, // Default to Holy Paladin stats
    defense: 5,
    speed: 2,
    character: "A", // Default to Holy Paladin
  });

  // Define character choices with their stats
  const characterChoices = [
    { value: "A", label: "Holy Paladin", strength: 3, defense: 5, speed: 2 },
    { value: "B", label: "Primal Barbarian", strength: 5, defense: 2, speed: 3 },
    { value: "C", label: "Dragon Knight", strength: 4, defense: 3, speed: 3 },
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "character") {
      // Find the selected character and set stats automatically
      const selectedCharacter = characterChoices.find(char => char.value === value);
      setHero((prevHero) => ({
        ...prevHero,
        [name]: value,
        strength: selectedCharacter.strength,
        defense: selectedCharacter.defense,
        speed: selectedCharacter.speed,
      }));
    } else {
      setHero((prevHero) => ({
        ...prevHero,
        [name]: value,
      }));
    }
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
        
        {/* Add character selection dropdown */}
        <select
          className="input-character"
          name="character"
          value={hero.character}
          onChange={handleChange}
          required
        >
          {characterChoices.map((choice) => (
            <option key={choice.value} value={choice.value}>
              {choice.label}
            </option>
          ))}
        </select>

        {/* Display selected character's stats */}
        <div className="character-stats">
          <h3>Character Stats:</h3>
          <p>Strength: {hero.strength}</p>
          <p>Defense: {hero.defense}</p>
          <p>Speed: {hero.speed}</p>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreateHero;