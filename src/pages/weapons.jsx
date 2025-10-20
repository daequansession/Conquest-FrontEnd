import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getWeapons } from "../services/weapons.js";

function weapons() {
  const [weapons, setWeapons] = useState([]);

  useEffect(() => {
    const fetchWeapons = async () => {
      const weaponsData = await getWeapons();
      setWeapons(weaponsData);
    };

    fetchWeapons();
  }, []);

  if (!weapons.length) return <h1>loading...</h1>;

  return (
    <div className="weapons-root">
      <h2>All weapons</h2>
      <div className="weapons-container">
        {weapons.length &&
          weapons.map((weapon) => (
            <Link key={weapon.id} to={`/weapons/${weapon.id}`}>
              <div className="weapon" style={{ background: weapon.color }}>
                <h3>{weapon.name}</h3>
                <p>A {weapon.color} weapon</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default weapons;
