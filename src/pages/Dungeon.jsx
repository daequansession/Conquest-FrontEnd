import React, { useState, useContext, useEffect } from "react";
import { dungeonLevels, generateDungeonMonsters } from "../utils/dungeons";
import { UserContext } from "../context/UserContext";
import { updateGold, getGoldByUserId } from "../services/gold";
import { getHeroes } from "../services/heroes";
import HeroSelector from "../components/HeroSelector";
import CombatStats from "../components/CombatStats";
import { calculateCombatStats, analyzeCombat } from "../utils/combatStats";
import "../css/Dungeon.css";

const Dungeon = () => {
  const { user, dungeonProgress, setDungeonProgress, fetchGold } = useContext(UserContext);
  const [userGold, setUserGold] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [monsters, setMonsters] = useState([]);
  const [message, setMessage] = useState("");
  const [myHeroes, setMyHeroes] = useState([]);
  const [selectedHero, setSelectedHero] = useState(null);
  const [combatResult, setCombatResult] = useState(null);
  const [showStats, setShowStats] = useState(false);
  useEffect(() => {
    const fetchHeroes = async () => {
      if (user && user.id) {
        const heroes = await getHeroes();
        setMyHeroes(heroes);
      }
    };
    fetchHeroes();
  }, [user]);

  const isLevelUnlocked = (level) => {
    if (!dungeonProgress) return level === 1;
    return dungeonProgress.includes(level - 1) || level === 1;
  };

  const handleSelectLevel = (level) => {
    if (!isLevelUnlocked(level)) {
      setMessage("Level is locked. Complete previous levels first.");
      return;
    }
    setSelectedLevel(level);
    const lvl = dungeonLevels.find(l => l.level === level);
    setMonsters(generateDungeonMonsters(lvl.maxPower));
    setSelectedHero(null);
    setMessage("");
  };

  // Simulate combat between hero and monsters
  const handleCompleteLevel = async () => {
    if (!selectedHero) {
      setMessage("Select a hero to fight!");
      return;
    }
    // Aggregate monster stats for the level
    const monsterStats = monsters.reduce(
      (acc, m) => {
        acc.strength += m.power;
        acc.defense += Math.floor(m.power * 0.7);
        acc.speed += Math.floor(m.power * 0.5);
        return acc;
      },
      { strength: 0, defense: 0, speed: 0 }
    );
    // Calculate hero stats
    const heroCombat = calculateCombatStats(selectedHero, selectedHero.weapons || [], selectedHero.shields || []);
    // Simulate combat using analyzeCombat
    const analysis = analyzeCombat(heroCombat, { totalStats: monsterStats });
    // Add randomness to win chance
    const randomFactor = Math.random() * 10 - 5;
    const adjustedWinChance = Math.max(5, Math.min(95, analysis.winChance + randomFactor));
    const heroWins = Math.random() * 100 < adjustedWinChance;
    // Battle log
    const battleLog = [
      `Your hero ${selectedHero.name} faces the dungeon monsters!`,
      `Dungeon monsters have combined stats: STR ${monsterStats.strength}, DEF ${monsterStats.defense}, SPD ${monsterStats.speed}.`,
      `Combat analysis: Win chance ${Math.round(adjustedWinChance)}%.`,
      heroWins ? `${selectedHero.name} defeats the monsters!` : `${selectedHero.name} is defeated by the monsters!`
    ];
    // Calculate gold earned for this level
    const goldEarned = heroWins ? dungeonLevels.find(l => l.level === selectedLevel).maxPower : 0;
    setCombatResult({
      hero: selectedHero,
      monsterStats,
      analysis,
      adjustedWinChance: Math.round(adjustedWinChance),
      heroWins,
      battleLog,
      goldEarned
    });
    // Award gold and update progress only if hero wins
    if (heroWins) {
      if (!dungeonProgress.includes(selectedLevel)) {
        setDungeonProgress([...dungeonProgress, selectedLevel]);
      }
      const goldEarned = dungeonLevels.find(l => l.level === selectedLevel).maxPower;
      let goldEntry;
      if (user && user.id) {
        goldEntry = await getGoldByUserId(user.id);
        if (goldEntry && goldEntry.id) {
          await updateGold(goldEntry.id, { amount: goldEntry.amount + goldEarned });
          // Fetch updated gold and update state
          const updatedGoldEntry = await getGoldByUserId(user.id);
          setUserGold(updatedGoldEntry?.amount ?? 0);
          await fetchGold(); // <-- update global context for nav bar
        }
      }
    }
  };

  return (
    <div className="dungeon-container">
      <h2>Dungeons</h2>
      <div className="dungeon-level-select">
        <label htmlFor="dungeon-level-dropdown">Select Dungeon Level:</label>
        <select
          id="dungeon-level-dropdown"
          value={selectedLevel || ""}
          onChange={e => handleSelectLevel(Number(e.target.value))}
        >
          <option value="" disabled>Select a level</option>
          {dungeonLevels.map(lvl => (
            <option
              key={lvl.level}
              value={lvl.level}
              disabled={!isLevelUnlocked(lvl.level)}
            >
              Level {lvl.level} (Max Power: {lvl.maxPower}) {isLevelUnlocked(lvl.level) ? "" : "(Locked)"}
            </option>
          ))}
        </select>
      </div>
      {selectedLevel && (
        <div className="dungeon-monsters-center">
          {!combatResult ? (
            <>
              <div className="dungeon-monsters-list">
                <h3>Level {selectedLevel} Monsters</h3>
                <ul>
                  {monsters.map((m, idx) => (
                    <li key={idx}>{m.name} (Power: {m.power})</li>
                  ))}
                </ul>
              </div>
              <div className="flip-card-container">
                <div className={`flip-card${showStats ? ' flipped' : ''}`} onClick={() => setShowStats(s => !s)}>
                  <div className="flip-card-inner">
                    <div className="flip-card-front">
                      <HeroSelector
                        heroes={myHeroes}
                        selectedHero={selectedHero}
                        onHeroSelect={setSelectedHero}
                        title="Select Your Hero to Fight"
                        showOwner={false}
                        currentUserId={user?.id}
                        allUsers={[user]}
                      />
                      {/* Show Combat Stats button removed; flip is triggered by card click */}
                    </div>
                    <div className="flip-card-back">
                      {selectedHero && <CombatStats hero={selectedHero} showBreakdown={true} />}
                      {showStats && selectedHero && (
                        <button onClick={e => { e.stopPropagation(); handleCompleteLevel(); }} disabled={!selectedHero} style={{ marginTop: "2rem" }}>Fight Monsters</button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="dungeon-combat-results">
              <h3>Battle Results</h3>
              <ul>
                {combatResult.battleLog.map((event, idx) => (
                  <li key={idx}>{event}</li>
                ))}
              </ul>
              <div style={{ marginTop: "1rem" }}>
                <div style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "0.5rem" }}>
                  Win Chance: {combatResult.adjustedWinChance}%
                </div>
                <div style={{ fontSize: "2rem", fontWeight: "bold" }}>
                  Outcome: {combatResult.heroWins ? `Victory! You earned ${combatResult.goldEarned} gold.` : "Defeat! Try again or select a different hero."}
                </div>
              </div>
              <button onClick={() => setCombatResult(null)} style={{ marginTop: "1rem" }}>Try Again</button>
            </div>
          )}
        </div>
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default Dungeon;
