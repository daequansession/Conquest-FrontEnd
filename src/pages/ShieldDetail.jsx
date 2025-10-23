import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getShield, deleteShield } from "../services/shields.js";
import "../css/ShieldDetail.css";

function shieldDetail() {
  const [shieldDetail, setShieldDetail] = useState({});

  let { shieldId } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    const fetchShield = async () => {
      const shieldData = await getShield(shieldId);
      setShieldDetail(shieldData);
    };

    fetchShield();
  }, [shieldId]);

  const handleShieldDelete = async () => {
    await deleteShield(shieldId);
    navigate("/shields");
  };

  return (
    <div className="shield-root-container">
      <div className="shield">
        <h3>{shieldDetail.name}</h3>
      </div>
      <div>
        <button className="shield-detail-edit">Edit</button>
        <button className="shield-detail-delete" onClick={handleShieldDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default shieldDetail;
