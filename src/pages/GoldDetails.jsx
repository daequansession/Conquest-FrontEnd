import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getGold, updateGold } from "../services/gold.js";
import "../css/ShieldDetail.css";

function GoldDetail() {
  const [goldDetail, setGoldDetail] = useState({});

  let { goldId } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    const fetchGold = async () => {
      const goldData = await getGold(goldId);
      setGoldDetail(goldData);
    };

    fetchGold();
  }, [goldId]);

  const handleGoldUpdate = async () => {
    await updateGold(goldId);
    navigate(`/gold/${goldId}`);
    console.log(goldDetail);
  };

  return (
    <div className="gold-root-container">
      <div className="gold">
        <h3>{goldDetail.amount}</h3>
      </div>
      <div>
        <button className="gold-detail-edit">Edit</button>
        <button className="gold-detail-delete" onClick={handleGoldUpdate}>
          Update
        </button>
      </div>
    </div>
  );
}

export default GoldDetail;
