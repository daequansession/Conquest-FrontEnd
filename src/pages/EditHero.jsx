import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getHero, updateHero } from "../services/heroes.js";

function EditHero() {
  let navigate = useNavigate();

  const [hero, setHero] = useState({
    name: "",
    strength: 0,
    defense: 0,
    speed: 0,
  });

  let { heroId } = useParams();

  useEffect(() => {
    const fetchHero = async () => {
      const heroData = await getHero(heroId);
      setHero(heroData.hero);
    };

    fetchHero();
  }, [heroId]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setHero((prevHero) => ({
      ...prevHero,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateHero(heroId, hero);
    navigate(`/heroes/${heroId}`);
  };

  return (
    <div className="edit-hero-root">
      <div className="edit-hero-heading">
        <h2>Update {hero.name}'s Info</h2>
      </div>
      <form className="edit-form" onSubmit={handleSubmit}>
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

export default EditHero;
