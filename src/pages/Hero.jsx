import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getHeroes } from "../services/heroes";

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
              <Link to={`/heroes/${hero.id}`}></Link>
              <h2>{hero.name}</h2>
              <p>{hero.strength}</p>
              <p>{hero.defense}</p>
              <p>{hero.speed}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Hero;
