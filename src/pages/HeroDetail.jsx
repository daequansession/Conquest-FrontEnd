import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  getHero,
  deleteHero,
  addShieldToHero,
  removeShieldFromHero,
} from "../services/heroes.js";


function HeroDetail() {
  const [heroDetail, setHeroDetail] = useState(null);
  const [toggle, setToggle] = useState(false);

  

  let { heroId } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    const fetchHero = async () => {
      const heroData = await getHero(heroId);
     
      setHeroDetail(heroData);
     
    };

    fetchHero();
  }, [heroId, toggle]);

  const handleDelete = async () => {
    await deleteHero(heroId);
    await deleteHero(heroId);
    navigate("/heroes");
  };

  const handleAddShield = async (shieldId) => {
    await addShieldToHero(heroId, shieldId);
    await addShieldToHero(heroId, shieldId);
    setToggle((prev) => !prev);
  };

  const handleRemoveShield = async (shieldId) => {
    await removeShieldFromHero(heroId, shieldId);
    setToggle((prev) => !prev);
  };


  return (
    <div className="hero-detail-root">
      <div className="hero-detail-container">
      
        <div>
          <h2>{heroDetail?.hero?.name}</h2>
          <p>{heroDetail?.hero?.character}</p>
          <div>
            <Link to={`/heroes/${heroDetail?.hero?.id}/edit`}>
              <button className="hero-detail-edit">Edit</button>
            </Link>
            <button className="hero-detail-delete" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
      <div className="hero-detail-bottom-container">
      <div className="hero-weapons-container">
          <h2>Weapons</h2>
          <h3>{heroDetail?.hero?.name}'s Weapons</h3>
          {heroDetail &&
            heroDetail.hero.weapons.map((weapon) => (
              <div key={weapon.id} className="hero-personal-owned-weapons">
                <div style={{ background: weapon?.color }}></div>
                <p>
                  A {weapon.color} {weapon.name}
                </p>
                <button onClick={() => handleRemoveWeapon(weapon.id)}>
                  Remove Weapon
                </button>
              </div>
            ))}
          <h3>Available Weapons</h3>
          {heroDetail &&
            heroDetail.hero.weapons_not_associated.map((weapon) => (
              <div key={weapon.id} className="hero-available-weapons">
                <div style={{ background: weapon?.color }}></div>
                <p>
                  A {weapon.color} {weapon.name}
                </p>
                <button onClick={() => handleAddWeapon(weapon.id)}>Give Weapon</button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default HeroDetail;