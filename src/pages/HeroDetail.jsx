import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  getHero,
  deleteHero,
  addShieldToHero,
  removeShieldFromHero,
  addWeaponToHero,
  removeWeaponFromHero,
} from "../services/heroes.js";
import { getWeapons } from "../services/weapons.js";
import { getShields } from "../services/shields.js";
import HolyPaladinImg from "../assets/HolyPaladin.png";
import PrimalBarbarianImg from "../assets/PrimalBarbarian.png";
import DragonKnightImg from "../assets/DragonKnight.png";
import "./HeroDetail.css";


function HeroDetail() {
  const [heroDetail, setHeroDetail] = useState(null);
  const [allWeapons, setAllWeapons] = useState([]);
  const [allShields, setAllShields] = useState([]);
  const [toggle, setToggle] = useState(false);

  

  let { heroId } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const heroData = await getHero(heroId);
        setHeroDetail(heroData);
      } catch (error) {
        console.error("Error fetching hero:", error);
        
        if (error.response?.status === 404) {
          navigate("/heroes");
        }
      }
    };

    const fetchWeapons = async () => {
      try {
        const weaponsData = await getWeapons();
        setAllWeapons(weaponsData);
      } catch (error) {
        console.error("Error fetching weapons:", error);
      }
    };

    const fetchShields = async () => {
      try {
        const shieldsData = await getShields();
        setAllShields(shieldsData);
      } catch (error) {
        console.error("Error fetching shields:", error);
      }
    };

    fetchHero();
    fetchWeapons();
    fetchShields();
  }, [heroId, toggle, navigate]);

  const handleDelete = async () => {
    try {
      await deleteHero(heroId);
      navigate("/heroes");
    } catch (error) {
      console.error("Error deleting hero:", error);
    }
  };

  const handleAddShield = async (shieldId) => {
    try {
      await addShieldToHero(heroId, shieldId);
      setToggle((prev) => !prev);
    } catch (error) {
      console.error("Error adding shield:", error);
    }
  };

  const handleRemoveShield = async (shieldId) => {
    try {
      await removeShieldFromHero(heroId, shieldId);
      setToggle((prev) => !prev);
    } catch (error) {
      console.error("Error removing shield:", error);
    }
  };

  const handleAddWeapon = async (weaponId) => {
    try {
      await addWeaponToHero(heroId, weaponId);
      setToggle((prev) => !prev);
    } catch (error) {
      console.error("Error adding weapon:", error);
    }
  };

  const handleRemoveWeapon = async (weaponId) => {
    try {
      await removeWeaponFromHero(heroId, weaponId);
      setToggle((prev) => !prev);
    } catch (error) {
      console.error("Error removing weapon:", error);
    }
  };


  if (!heroDetail) {
    return <div>Loading...</div>;
  }

  // Handle both possible data structures: direct hero object or nested under 'hero' property
  const hero = heroDetail.hero || heroDetail;

  // Calculate available weapons by filtering out weapons already equipped to this hero
  const equippedWeaponIds = hero.weapons ? hero.weapons.map(weapon => weapon.id) : [];
  const availableWeapons = hero.weapons_not_associated || 
    allWeapons.filter(weapon => !equippedWeaponIds.includes(weapon.id));
  
  // Calculate available shields by filtering out shields already equipped to this hero
  const equippedShieldIds = hero.shields ? hero.shields.map(shield => shield.id) : [];
  const availableShields = hero.shields_not_associated || 
    allShields.filter(shield => !equippedShieldIds.includes(shield.id));

  return (
    <div className="hero-detail-root">
      <div className="hero-detail-container">
      
        <div>
          <h2>{hero.name}</h2>
          {hero.character === "A" ? (
            <img src={HolyPaladinImg} alt="Holy Paladin" />
          ) : hero.character === "B" ? (
            <img src={PrimalBarbarianImg} alt="Primal Barbarian" />
          ) : hero.character === "C" ? (
            <img src={DragonKnightImg} alt="Dragon Knight" />
          ) : (
            <p>{hero.character}</p>
          )}
          
          <div className="hero-stats-section">
            <h3>Hero Stats</h3>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-label">Strength:</span>
                <span className="stat-value">{hero.strength || 'N/A'}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Defense:</span>
                <span className="stat-value">{hero.defense || 'N/A'}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Speed:</span>
                <span className="stat-value">{hero.speed || 'N/A'}</span>
              </div>
            </div>
          </div>
          
          <div className="hero-action-buttons">
            <Link to={`/heroes/${hero.id}/edit`}>
              <button className="hero-detail-edit">Edit</button>
            </Link>
            <button className="hero-detail-delete" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
      <div className="hero-detail-bottom-container">
        <div className="hero-owned-weapons-container">
          <h2>{hero.name}'s Weapons</h2>
          {hero.weapons && hero.weapons.length > 0 ? (
            hero.weapons.map((weapon) => (
              <div key={weapon.id} className="hero-personal-owned-weapons">
                <div style={{ background: weapon?.color }}></div>
                <p>
                  {weapon.name} - Strength: {weapon.Strength || weapon.strength || 'N/A'}, Defense: {weapon.Defense || weapon.defense || 'N/A'}, Speed: {weapon.Speed || weapon.speed || 'N/A'}
                </p>
                <button onClick={() => handleRemoveWeapon(weapon.id)}>
                  Remove Weapon
                </button>
              </div>
            ))
          ) : (
            <p>No weapons equipped</p>
          )}
        </div>
        
        <div className="hero-owned-shields-container">
          <h2>{hero.name}'s Shields</h2>
          {hero.shields && hero.shields.length > 0 ? (
            hero.shields.map((shield) => (
              <div key={shield.id} className="hero-personal-owned-shields">
                <div style={{ background: shield?.color }}></div>
                <p>
                  {shield.name} - Strength: {shield.Strength || shield.strength || 'N/A'}, Defense: {shield.Defense || shield.defense || 'N/A'}, Speed: {shield.Speed || shield.speed || 'N/A'}
                </p>
                <button onClick={() => handleRemoveShield(shield.id)}>
                  Remove Shield
                </button>
              </div>
            ))
          ) : (
            <p>No shields equipped</p>
          )}
        </div>
      </div>
      
      <div className="hero-store-container">
        <h2>Store</h2>
        
        <div className="store-section">
          <h3>Available Weapons</h3>
          {availableWeapons && availableWeapons.length > 0 ? (
            availableWeapons.map((weapon) => (
              <div key={weapon.id} className="hero-available-weapons">
                <div style={{ background: weapon?.color }}></div>
                <p>
                  {weapon.name} - Strength: {weapon.Strength || weapon.strength || 'N/A'}, Defense: {weapon.Defense || weapon.defense || 'N/A'}, Speed: {weapon.Speed || weapon.speed || 'N/A'}
                </p>
                <button onClick={() => handleAddWeapon(weapon.id)}>Give Weapon</button>
              </div>
            ))
          ) : (
            <p>No available weapons</p>
          )}
        </div>
        
        <div className="store-section">
          <h3>Available Shields</h3>
          {availableShields && availableShields.length > 0 ? (
            availableShields.map((shield) => (
              <div key={shield.id} className="hero-available-shields">
                <div style={{ background: shield?.color }}></div>
                <p>
                  {shield.name} - Strength: {shield.Strength || shield.strength || 'N/A'}, Defense: {shield.Defense || shield.defense || 'N/A'}, Speed: {shield.Speed || shield.speed || 'N/A'}
                </p>
                <button onClick={() => handleAddShield(shield.id)}>Give Shield</button>
              </div>
            ))
          ) : (
            <p>No available shields</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default HeroDetail;