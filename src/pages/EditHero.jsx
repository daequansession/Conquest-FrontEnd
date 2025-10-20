import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getHero, updateHero } from "../services/heroes.js";
import "../css/EditHero.css";

function EditHero() {
  let navigate = useNavigate();

  const [hero, setHero] = useState({
    name: "",
    strength: 0,
    defense: 0,
    speed: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let { heroId } = useParams();

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const heroData = await getHero(heroId);
        console.log("Hero data received:", heroData);
        
        // Handle both possible data structures: direct hero object or nested under 'hero' property
        const heroInfo = heroData.hero || heroData;
        setHero(heroInfo);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching hero:", error);
        setError("Failed to load hero data");
        setLoading(false);
        
        // If hero not found, redirect back to heroes list
        if (error.response?.status === 404) {
          navigate("/heroes");
        }
      }
    };

    fetchHero();
  }, [heroId, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setHero((prevHero) => ({
      ...prevHero,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateHero(heroId, hero);
      navigate(`/heroes/${heroId}`);
    } catch (error) {
      console.error("Error updating hero:", error);
      setError("Failed to update hero");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
