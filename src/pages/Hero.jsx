import { useState, useEffect } from "react";
import HolyPaladinImg from "../assets/HolyPaladin.png";
import PrimalBarbarianImg from "../assets/PrimalBarbarian.png";
import DragonKnightImg from "../assets/DragonKnight.png";
import ShadowAssassinImg from "../assets/ShadowAssassin.png";
import DemonHunterImg from "../assets/DemonHunter.png";
import ChackieJanImg from "../assets/ChackieJan.png";
import HasidicWarriorImg from "../assets/HasidicWarrior.png";
import MexicanVaqueroImg from "../assets/MexicanVaquero.png";
import DeathKnightImg from "../assets/DeathKnight.png";
import EveryItalianEverImg from "../assets/EveryItalianEver.png";
// Hero character to image mapping
const heroImages = {
  "A": HolyPaladinImg,
  "B": PrimalBarbarianImg,
  "C": DragonKnightImg,
  "D": ShadowAssassinImg,
  "E": DemonHunterImg,
  "F": ChackieJanImg,
  "G": HasidicWarriorImg,
  "H": MexicanVaqueroImg,
  "I": DeathKnightImg,
  "J": EveryItalianEverImg,
};
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

  return (
    <div className="hero-root">
      <h1>Hero List</h1>
      <h2>Choose your hero wisely to conquer the realm!</h2>
      <div className="hero-container">

        {hero.length &&
          hero.map((hero) => (
            <div key={hero.id} className="hero-card">
              {heroImages[hero.character] ? (
                <img
                  src={heroImages[hero.character]}
                  alt={hero.name}
                  className="hero-card-image"
                  style={{ width: "120px", height: "120px", objectFit: "contain", marginBottom: "8px" }}
                />
              ) : (
                <div style={{ width: "120px", height: "120px", background: "#222", marginBottom: "8px" }}></div>
              )}
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
      <button
        onClick={() => {
          const sortedHeroes = [...hero].sort(
            (a, b) => b.strength - a.strength
          );
          setHero(sortedHeroes);
        }}
      >
        Sort by Strength
      </button>
      <button
        onClick={() => {
          const sortedHeroes = [...hero].sort((a, b) => b.defense - a.defense);
          setHero(sortedHeroes);
        }}
      >
        Sort by Defense
      </button>
      <button
        onClick={() => {
          const sortedHeroes = [...hero].sort((a, b) => b.speed - a.speed);
          setHero(sortedHeroes);
        }}
      >
        Sort by Speed
      </button>
      <button
        onClick={() => {
          const sortedHeroes = [...hero].sort(
            (a, b) =>
              b.speed +
              b.defense +
              b.strength -
              (a.speed + a.defense + a.strength)
          );
          setHero(sortedHeroes);
        }}
      >
        Strongest
      </button>
    </>
  );
}

export default Hero;
