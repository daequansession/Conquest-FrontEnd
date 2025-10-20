import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getShields } from "../services/shields.js";

function Shields() {
  const [shields, setShields] = useState([]);

  useEffect(() => {
    const fetchShields = async () => {
      const shieldsData = await getShields();
      setShields(shieldsData);
    };

    fetchShields();
  }, []);

  if (!shields.length) return <h1>loading...</h1>;

  return (
    <div className="shields-root">
      <h2>All Cat shields</h2>
      <div className="shields-container">
        {shields.length &&
          shields.map((shield) => (
            <Link key={shield.id} to={`/shields/${shield.id}`}>
              <div className="shield">
                <h3>{shield.name}</h3>
                <p>A {shield.color} shield</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default Shields;
