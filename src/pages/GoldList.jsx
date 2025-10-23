import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllGold } from "../services/gold.js";

function GoldList() {
  const [goldList, setGoldList] = useState([]);

  useEffect(() => {
    const fetchGold = async () => {
      const data = await getAllGold();
      setGoldList(data);
    };
    fetchGold();
  }, []);

  return (
    <div className="gold-list-container">
      <h2>Gold List</h2>
      {goldList.length > 0 ? (
        <ul>
          {goldList.map((gold) => (
            <li key={gold.id}>
              <Link to={`/gold/${gold.id}`}>
                Gold #{gold.id} — {gold.amount}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No gold entries found.</p>
      )}
    </div>
  );
}
export default GoldList;
