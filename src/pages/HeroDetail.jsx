import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  getHero,
  deleteHero,
  addShieldToHero,
  removeShieldFromHero,
} from "../services/heroes.js";
// import FeedingsTable from "../components/FeedingsTable.jsx";
// import catDetailAvatar from "../assets/cat-detail.png";

function HeroDetail() {
  const [heroDetail, setHeroDetail] = useState(null);
  const [toggle, setToggle] = useState(false);

  // const [feeding, setFeeding] = useState({
  //   date: "",
  //   meal: "Breakfast"
  // });

  let { heroId } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    const fetchHero = async () => {
      const heroData = await getHero(heroId);
      // const feedingsData = await getCatFeedings(catId)
      setHeroDetail(heroData);
      // setCatFeedings(feedingsData)
    };

    fetchHero();
  }, [heroId, toggle]);

  const handleDelete = async () => {
    await deleteHero(heroId);
    navigate("/heroes");
  };

  const handleAddShield = async (shieldId) => {
    await addShieldToHero(heroId, shieldId);
    setToggle((prev) => !prev);
  };

  const handleRemoveShield = async (shieldId) => {
    await removeShieldFromHero(heroId, shieldId);
    setToggle((prev) => !prev);
  };

  // const handleDateAndMealChange = (e) => {
  //   const { name, value } = e.target

  //   setFeeding((prevFeeding) => ({
  //     ...prevFeeding,
  //     [name]: value
  //   }))
  // };

  // const handleFeedingSubmit = async (e) => {
  //   e.preventDefault()

  //   const mealMap = {
  //     Breakfast: 'B',
  //     Lunch: 'L',
  //     Dinner: 'D'
  //   };

  //   const { date, meal } = feeding

  //   const finalFeeding = {
  //     date,
  //     meal: mealMap[meal]
  //   } // mealMap[meal] Converts "Breakfast" to "B" for django model

  //   const createdFeeding = await addCatFeeding(catId, finalFeeding)

  //   if (createdFeeding) {
  //     setToggle(prev => !prev)
  //   }
  // }

  return (
    <div className="hero-detail-root">
      <div className="hero-detail-container">
        <img src={heroDetailAvatar} alt="hero avatar" />
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
      <div className="cat-detail-bottom-container">
        <div className="feedings-container">
          <h2>Feedings</h2>
          <h3>Add a Feeding</h3>
          {heroDetail?.hero?.heroData_for_today ? (
            <p>{catDetail?.hero?.name} ha</p>
          ) : (
            <p>Looks like {catDetail?.cat?.name} is still hungry 😔</p>
          )}
          {/* <form onSubmit={handleFeedingSubmit}>
            <div>
              <label htmlFor="feeding-date">Feeding Date: </label>
              <input
                type="date"
                name="date"
                id="feeding-date"
                value={feeding.date}
                onChange={handleDateAndMealChange}
              />
            </div>
            <div>
              <label htmlFor="feeding-meal">Meal: </label>
              <select
                name="meal"
                id="feeding-meal"
                value={feeding.meal}
                onChange={handleDateAndMealChange}
              >
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
              </select>
            </div>
            <button type="submit">Add Feeding</button>
          </form> */}
          <h3>Past Feedings</h3>
          {/* <FeedingsTable feedings={catFeedings} /> */}
        </div>
        {/* <div className="cat-toys-container">
          <h2>Toys</h2>
          <h3>{catDetail?.cat?.name}'s Toys</h3>
          {catDetail &&
            catDetail.cat.toys.map((toy) => (
              <div key={toy.id} className="cats-personal-owned-toys">
                <div style={{ background: toy?.color }}></div>
                <p>
                  A {toy.color} {toy.name}
                </p>
                <button onClick={() => handleRemoveToy(toy.id)}>
                  Remove Toy
                </button>
              </div>
            ))}
          <h3>Available Toys</h3>
          {catDetail &&
            catDetail?.toys_not_associated.map((toy) => (
              <div key={toy.id} className="cats-personal-toys">
                <div style={{ background: toy?.color }}></div>
                <p>
                  A {toy.color} {toy.name}
                </p>
                <button onClick={() => handleAddToy(toy.id)}>Give Toy</button>
              </div>
            ))}
        </div> */}
      </div>
    </div>
  );
}

export default HeroDetail;
