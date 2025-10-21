import { calculateCombatStats, analyzeCombat } from '../utils/combatStats.js';

/**
 * Combat System Service
 * Handles combat logic between heroes
 */

/**
 * Simulates combat between two heroes
 * @param {Object} hero1 - First hero with equipment
 * @param {Object} hero2 - Second hero with equipment
 * @returns {Object} - Combat result
 */
export const simulateCombat = (hero1, hero2) => {
  const hero1Combat = calculateCombatStats(hero1, hero1.weapons || [], hero1.shields || []);
  const hero2Combat = calculateCombatStats(hero2, hero2.weapons || [], hero2.shields || []);
  
  const analysis = analyzeCombat(hero1Combat, hero2Combat);
  
  // Simulate the actual combat with some randomness
  const randomFactor = Math.random() * 20 - 10; // -10 to +10 random modifier
  const adjustedWinChance = Math.max(5, Math.min(95, analysis.winChance + randomFactor));
  
  const hero1Wins = Math.random() * 100 < adjustedWinChance;
  
  return {
    winner: hero1Wins ? hero1 : hero2,
    loser: hero1Wins ? hero2 : hero1,
    hero1Stats: hero1Combat.totalStats,
    hero2Stats: hero2Combat.totalStats,
    analysis: analysis,
    finalWinChance: Math.round(adjustedWinChance),
    battleLog: generateBattleLog(hero1, hero2, hero1Combat, hero2Combat, hero1Wins)
  };
};

/**
 * Generates a narrative battle log
 * @param {Object} hero1 - First hero
 * @param {Object} hero2 - Second hero
 * @param {Object} hero1Combat - Hero1's combat stats
 * @param {Object} hero2Combat - Hero2's combat stats
 * @param {boolean} hero1Wins - Whether hero1 won
 * @returns {Array} - Array of battle events
 */
const generateBattleLog = (hero1, hero2, hero1Combat, hero2Combat, hero1Wins) => {
  const events = [];
  
  events.push(`${hero1.name} and ${hero2.name} enter the battlefield!`);
  
  // Analyze equipment advantages
  if (hero1Combat.weaponStats.strength > hero2Combat.weaponStats.strength) {
    events.push(`${hero1.name}'s weapons gleam with superior power!`);
  } else if (hero2Combat.weaponStats.strength > hero1Combat.weaponStats.strength) {
    events.push(`${hero2.name}'s weapons shine with deadly intent!`);
  }
  
  if (hero1Combat.shieldStats.defense > hero2Combat.shieldStats.defense) {
    events.push(`${hero1.name} raises their shields, providing excellent protection!`);
  } else if (hero2Combat.shieldStats.defense > hero1Combat.shieldStats.defense) {
    events.push(`${hero2.name}'s shields form an impressive defensive barrier!`);
  }
  
  // Battle progression
  events.push("The battle begins with fierce intensity!");
  
  if (hero1Combat.totalStats.speed > hero2Combat.totalStats.speed) {
    events.push(`${hero1.name} strikes first with lightning speed!`);
  } else if (hero2Combat.totalStats.speed > hero1Combat.totalStats.speed) {
    events.push(`${hero2.name} dashes forward with incredible agility!`);
  } else {
    events.push("Both heroes attack simultaneously!");
  }
  
  events.push("Steel clashes against steel in a spectacular display!");
  events.push("The battle reaches its climax...");
  
  // Victory
  if (hero1Wins) {
    events.push(`${hero1.name} emerges victorious!`);
    events.push(`${hero2.name} fights valiantly but is ultimately defeated.`);
  } else {
    events.push(`${hero2.name} claims victory!`);
    events.push(`${hero1.name} puts up an impressive fight but falls in the end.`);
  }
  
  return events;
};

/**
 * Gets the top heroes by combat power
 * @param {Array} heroes - Array of heroes with equipment
 * @param {number} limit - Number of top heroes to return
 * @returns {Array} - Sorted array of heroes with combat power
 */
export const getTopCombatHeroes = (heroes, limit = 10) => {
  return heroes
    .map(hero => {
      const combatStats = calculateCombatStats(hero, hero.weapons || [], hero.shields || []);
      return {
        ...hero,
        combatPower: calculateCombatPower(combatStats.totalStats),
        combatStats: combatStats
      };
    })
    .sort((a, b) => b.combatPower - a.combatPower)
    .slice(0, limit);
};

/**
 * Calculates combat power for utility
 */
const calculateCombatPower = (totalStats) => {
  const strengthWeight = 1.2;
  const defenseWeight = 1.0;
  const speedWeight = 1.1;
  
  return Math.round(
    (totalStats.strength * strengthWeight) + 
    (totalStats.defense * defenseWeight) + 
    (totalStats.speed * speedWeight)
  );
};