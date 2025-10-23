import { useState, useEffect, useContext } from "react";
import { getHeroes, getAllPublicHeroes } from "../services/heroes.js";
import { getAllUsers } from "../services/users.js";
import { simulateCombat } from "../services/combat.js";
import { UserContext } from "../context/UserContext.jsx";
import CombatStats from "../components/CombatStats.jsx";
import { updateGold } from "../services/gold.js";

import HeroSelector from "../components/HeroSelector.jsx";

import "./CombatArena.css";
import { getGold } from "../services/gold.js";
import { getGoldByUserId } from "../services/gold.js";

function CombatArena() {
  const { user } = useContext(UserContext);

  // State for heroes and users
  const [allHeroes, setAllHeroes] = useState([]);
  const [myHeroes, setMyHeroes] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  // Combat state
  const [selectedHero1, setSelectedHero1] = useState(null);
  const [selectedHero2, setSelectedHero2] = useState(null);
  const [combatResult, setCombatResult] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [gold, setGold] = useState();

  // Helper function to get username from user ID
  const getUsernameById = (userId) => {
    const foundUser = allUsers.find((u) => u.id === userId);
    return foundUser?.username || "Unknown";
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all data needed for multi-user combat
        const [allHeroesData, myHeroesData, usersData, userGold] =
          await Promise.all([
            getAllPublicHeroes().catch(() => []), // Fallback to empty array if API not implemented
            getHeroes(), // Current user's heroes
            getAllUsers().catch(() => []), // All users for opponent selection
            getGold(),
          ]);

        const _user = user.id ? user : JSON.parse(localStorage.getItem("user"));

        const filteredAllHeroes = allHeroesData.filter(
          (hero) => hero.user !== _user.id
        );

        setGold(userGold);
        setAllHeroes(filteredAllHeroes);
        setMyHeroes(myHeroesData);
        setAllUsers(usersData);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Fallback: just use current user's heroes
        try {
          const heroesData = await getHeroes();
          setMyHeroes(heroesData);
          setAllHeroes(heroesData);
        } catch (fallbackError) {
          console.error("Error fetching fallback heroes:", fallbackError);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCombat = async () => {
    if (
      selectedHero1 &&
      selectedHero2 &&
      selectedHero1.id !== selectedHero2.id
    ) {
      const result = simulateCombat(selectedHero1, selectedHero2);
      setCombatResult(result);
      console.log("Winner:", result.winner);
      console.log("Loser:", result.loser);
      console.log("User:", user);
      console.log("gold", gold);
      // console.log("allHeroes", allHeroes);
      if (result.winner.user === user.id) {
        await updateGold(gold.id, { ...gold, amount: gold.amount + 10 });
      } else {
        const rivalGold = await getGoldByUserId(result.winner.user);
        console.log("rivalGold", rivalGold);
        updateGold(rivalGold.id, {
          ...rivalGold,
          amount: rivalGold.amount + 5,
        });
      }
      if (result.loser.user === user.id) {
        await updateGold(gold.id, { ...gold, amount: gold.amount - 5 });
      } else {
        const rivalGold = await getGoldByUserId(result.loser.user);
        console.log("rivalGold", rivalGold);
        updateGold(rivalGold.id, {
          ...rivalGold,
          amount: rivalGold.amount - 3,
        });
      }
    }
  };

  const resetCombat = () => {
    setCombatResult(null);
    setSelectedHero1(null);
    setSelectedHero2(null);
  };

  const canStartBattle = () => {
    return (
      selectedHero1 && selectedHero2 && selectedHero1.id !== selectedHero2.id
    );
  };

  if (isLoading) {
    return <div className="loading">Loading Combat Arena...</div>;
  }

  return (
    <div className="combat-arena">
      <h1>Combat Arena</h1>

      {!combatResult ? (
        <>
          <div className="combat-setup">
            <div className="my-vs-any-setup">
              <div className="hero-selection-container">
                <HeroSelector
                  heroes={myHeroes}
                  selectedHero={selectedHero1}
                  onHeroSelect={setSelectedHero1}
                  title="Select Your Hero"
                  showOwner={false}
                  currentUserId={user?.id}
                  allUsers={allUsers}
                />
              </div>

              {selectedHero1 && (
                <div className="vs-section">
                  <div className="vs-text">VS</div>
                </div>
              )}

              {selectedHero1 && (
                <div className="opponent-selection-container">
                  <HeroSelector
                    heroes={allHeroes}
                    selectedHero={selectedHero2}
                    onHeroSelect={setSelectedHero2}
                    excludeUser={user}
                    title="Select Opponent Hero"
                    showOwner={true}
                    currentUserId={user?.id}
                    allUsers={allUsers}
                  />
                </div>
              )}
            </div>

            {/* Combat Preview */}
            {canStartBattle() && (
              <div className="combat-preview">
                <h3>Battle Preview</h3>
                <div className="preview-heroes">
                  <div className="preview-hero">
                    <h4>{selectedHero1.name}</h4>
                    <CombatStats
                      hero={selectedHero1}
                      showBreakdown={false}
                      showMatchupInfo={false}
                    />
                  </div>
                  <div className="preview-hero">
                    <h4>{selectedHero2.name}</h4>
                    <CombatStats
                      hero={selectedHero2}
                      showBreakdown={false}
                      showMatchupInfo={false}
                    />
                  </div>
                </div>

                {/* Show matchup guide */}
                <CombatStats
                  hero={selectedHero1}
                  showBreakdown={false}
                  showMatchupInfo={true}
                />

                <button className="battle-button" onClick={handleCombat}>
                  ⚔️ BEGIN BATTLE! ⚔️
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        /* Battle Results */
        <div className="combat-results">
          <h2>⚔️ Battle Results ⚔️</h2>

          <div className="winner-announcement">
            <h3>🏆 {combatResult.winner.name} is Victorious! 🏆</h3>
            <div className="winner-details">
              <p>Owner: {getUsernameById(combatResult.winner.user)}</p>
              <p>Victory Probability: {combatResult.finalWinChance}%</p>

              {/* Show active matchup advantages */}
              {combatResult.analysis?.matchups && (
                <div className="active-matchups">
                  <p>
                    <strong>Strategic Advantages:</strong>
                  </p>
                  {combatResult.analysis.matchups.strengthAdvantage && (
                    <span className="advantage-badge">
                      💪 Strength vs Speed
                    </span>
                  )}
                  {combatResult.analysis.matchups.speedAdvantage && (
                    <span className="advantage-badge">⚡ Speed vs Defense</span>
                  )}
                  {combatResult.analysis.matchups.defenseAdvantage && (
                    <span className="advantage-badge">
                      🛡️ Defense vs Strength
                    </span>
                  )}
                  {!combatResult.analysis.matchups.strengthAdvantage &&
                    !combatResult.analysis.matchups.speedAdvantage &&
                    !combatResult.analysis.matchups.defenseAdvantage && (
                      <span className="advantage-badge">
                        ⚖️ Balanced Combat
                      </span>
                    )}
                </div>
              )}
            </div>
          </div>

          <div className="battle-participants">
            <div className="participant winner-participant">
              <h4>🥇 {combatResult.winner.name} (Winner)</h4>
              <p className="participant-owner">
                Owner: {getUsernameById(combatResult.winner.user)}
              </p>
              <div className="participant-stats">
                <span>
                  STR:{" "}
                  {combatResult.winner.name === selectedHero1.name
                    ? combatResult.hero1Stats.strength
                    : combatResult.hero2Stats.strength}
                </span>
                <span>
                  DEF:{" "}
                  {combatResult.winner.name === selectedHero1.name
                    ? combatResult.hero1Stats.defense
                    : combatResult.hero2Stats.defense}
                </span>
                <span>
                  SPD:{" "}
                  {combatResult.winner.name === selectedHero1.name
                    ? combatResult.hero1Stats.speed
                    : combatResult.hero2Stats.speed}
                </span>
              </div>
            </div>

            <div className="participant loser-participant">
              <h4>🥈 {combatResult.loser.name} (Defeated)</h4>
              <p className="participant-owner">
                Owner: {getUsernameById(combatResult.loser.user)}
              </p>
              <div className="participant-stats">
                <span>
                  STR:{" "}
                  {combatResult.loser.name === selectedHero1.name
                    ? combatResult.hero1Stats.strength
                    : combatResult.hero2Stats.strength}
                </span>
                <span>
                  DEF:{" "}
                  {combatResult.loser.name === selectedHero1.name
                    ? combatResult.hero1Stats.defense
                    : combatResult.hero2Stats.defense}
                </span>
                <span>
                  SPD:{" "}
                  {combatResult.loser.name === selectedHero1.name
                    ? combatResult.hero1Stats.speed
                    : combatResult.hero2Stats.speed}
                </span>
              </div>
            </div>
          </div>

          <div className="battle-log">
            <h4>📜 Battle Chronicle</h4>
            <div className="log-entries">
              {combatResult.battleLog.map((event, index) => (
                <p key={index} className="log-entry">
                  <span className="log-number">{index + 1}.</span>
                  {event}
                </p>
              ))}
            </div>
          </div>

          <div className="battle-actions">
            <button className="reset-button" onClick={resetCombat}>
              🔄 New Battle
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CombatArena;
