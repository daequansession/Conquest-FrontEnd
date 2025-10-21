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
    battleLog: generateBattleLog(hero1, hero2, hero1Combat, hero2Combat, hero1Wins, analysis)
  };
};

/**
 * Generates a narrative battle log with strategic matchup analysis
 * @param {Object} hero1 - First hero
 * @param {Object} hero2 - Second hero
 * @param {Object} hero1Combat - Hero1's combat stats
 * @param {Object} hero2Combat - Hero2's combat stats
 * @param {boolean} hero1Wins - Whether hero1 won
 * @param {Object} analysis - Combat analysis with matchups
 * @returns {Array} - Array of battle events
 */
const generateBattleLog = (hero1, hero2, hero1Combat, hero2Combat, hero1Wins, analysis) => {
  const events = [];
  
  events.push(`${hero1.name} and ${hero2.name} enter the battlefield!`);
  
  // Combat style analysis
  const hero1Dominant = analysis.matchups.attackerDominantStat;
  const hero2Dominant = analysis.matchups.defenderDominantStat;
  
  events.push(`${hero1.name} specializes in ${hero1Dominant.toUpperCase()}, while ${hero2.name} focuses on ${hero2Dominant.toUpperCase()}.`);
  
  // Strategic matchup commentary
  if (analysis.matchups.strengthAdvantage) {
    events.push(`${hero1.name}'s raw STRENGTH overwhelms ${hero2.name}'s speed-based tactics!`);
  }
  if (analysis.matchups.speedAdvantage) {
    events.push(`${hero1.name}'s lightning SPEED finds gaps in ${hero2.name}'s defenses!`);
  }
  if (analysis.matchups.defenseAdvantage) {
    events.push(`${hero2.name}'s sturdy DEFENSE deflects ${hero1.name}'s powerful strikes!`);
  }
  
  // Equipment advantages
  if (hero1Combat.weaponStats.strength > hero2Combat.weaponStats.strength) {
    events.push(`${hero1.name}'s superior weaponry provides a combat edge!`);
  } else if (hero2Combat.weaponStats.strength > hero1Combat.weaponStats.strength) {
    events.push(`${hero2.name}'s deadly weapons tip the scales!`);
  }
  
  if (hero1Combat.shieldStats.defense > hero2Combat.shieldStats.defense) {
    events.push(`${hero1.name}'s advanced shielding proves invaluable!`);
  } else if (hero2Combat.shieldStats.defense > hero1Combat.shieldStats.defense) {
    events.push(`${hero2.name}'s protective gear absorbs critical damage!`);
  }
  
  // Battle progression
  events.push("The tactical battle unfolds with strategic precision!");
  
  // Speed comparison for initiative
  if (hero1Combat.totalStats.speed > hero2Combat.totalStats.speed) {
    events.push(`${hero1.name} seizes the initiative with superior speed!`);
  } else if (hero2Combat.totalStats.speed > hero1Combat.totalStats.speed) {
    events.push(`${hero2.name} strikes first with blinding agility!`);
  } else {
    events.push("Both heroes move in perfect synchronization!");
  }
  
  events.push("Combat styles clash in an epic display of strategy and skill!");
  events.push("The battle reaches its decisive moment...");
  
  // Victory with style reference
  if (hero1Wins) {
    events.push(`${hero1.name}'s ${hero1Dominant}-focused approach proves victorious!`);
    events.push(`${hero2.name}'s ${hero2Dominant} specialization wasn't enough to secure victory.`);
  } else {
    events.push(`${hero2.name}'s ${hero2Dominant} mastery claims the day!`);
    events.push(`${hero1.name}'s ${hero1Dominant} tactics fall short in the end.`);
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