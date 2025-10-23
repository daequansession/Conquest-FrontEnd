import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getHeroes } from "../services/heroes";
import "../css/Hero.css";

function Hero() {
  const [hero, setHero] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHero = async () => {
      const heroData = await getHeroes();
      setHero(heroData);
    };

    fetchHero();
  }, []);

  if (!hero.length)
    return (
      <div className="hero-root">
        <h1 className="hero-header" style={{ textAlign: "center" }}>
          Make sure to add some hero!
        </h1>
      </div>
    );
  // if (hero.length === 0) return <img src={ConquestSK} alt="Conquest SK" />;

  return (
    <main style={{ backgroundImage: `url(${ConquestSK})` }}>
      <div className="hero-root">
        <h1>Hero List</h1>
        <h2>Choose your hero wisely to conquer the realm!</h2>
        <div className="hero-container">
          {hero.length &&
            hero.map((hero) => (
              <div key={hero.id} className="hero-card">
                <h2>
                  <Link to={`/heroes/${hero.id}`}>{hero.name}</Link>
                </h2>
                <p>Strength: {hero.strength}</p>
                <p>Defense: {hero.defense}</p>
                <p>Speed: {hero.speed}</p>
              </div>
            ))}
          <div>
            <button
              className="create-hero-button"
              onClick={() => navigate("/heroes/add")}
            >
              Add Hero
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Hero;
