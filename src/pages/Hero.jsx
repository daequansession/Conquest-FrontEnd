import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getHeroes } from "../services/heroes";
import "../css/Hero.css";

function Hero() {
  const [hero, setHero] = useState([]);

  useEffect(() => {
    const fetchHero = async () => {
      const heroData = await getHeroes();
      setHero(heroData);
    };

    fetchHero();
  }, []);

  if (!hero.length)
    return <h1 style={{ textAlign: "center" }}>Make sure to add some hero!</h1>;

  return (
    <div className="hero-root">
      <h1>Hero List</h1>
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
      </div>
    </div>
  );
}

export default Hero;
