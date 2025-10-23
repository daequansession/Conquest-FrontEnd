import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getWeapon, deleteWeapon } from "../services/weapons.js";
import "../css/WeaponDetail.css";

function WeaponDetail() {
  const [weaponDetail, setWeaponDetail] = useState({});

  let { weaponId } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    const fetchWeapon = async () => {
      const weaponData = await getWeapon(weaponId);
      setWeaponDetail(weaponData);
    };

    fetchWeapon();
  }, [weaponId]);

  const handleWeaponDelete = async () => {
    await deleteWeapon(weaponId);
    navigate("/weapons");
  };

  return (
    <div className="weapon-root-container">
      <div className="weapon">
        <h3>{weaponDetail.name}</h3>
      </div>
      <div>
        <button className="weapon-detail-edit">Edit</button>
        <button className="weapon-detail-delete" onClick={handleWeaponDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default WeaponDetail;
