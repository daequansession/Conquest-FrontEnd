/**
 * Combat Statistics Utility Functions
 * Used to calculate combined hero, weapon, and shield stats for combat
 */

/**
 * Normalizes stat names to handle inconsistent capitalization
 * @param {Object} item - weapon, shield, or hero object
 * @returns {Object} - normalized stats object
 */
export const normalizeStats = (item) => {
  if (!item) return { strength: 0, defense: 0, speed: 0 };
  
  return {
    strength: item.strength || item.Strength || 0,
    defense: item.defense || item.Defense || 0,
    speed: item.speed || item.Speed || 0
  };
};

/**
 * Calculates total combat stats for a hero including equipped items
 * Equipment Limits: 1 weapon and 1 shield maximum
 * @param {Object} hero - hero object with base stats
 * @param {Array} weapons - array of equipped weapons (only first one counts)
 * @param {Array} shields - array of equipped shields (only first one counts)
 * @returns {Object} - combined stats object
 */
export const calculateCombatStats = (hero, weapons = [], shields = []) => {
  const heroStats = normalizeStats(hero);
  
  // Equipment Limit: Only use first weapon and first shield
  const primaryWeapon = weapons.length > 0 ? weapons[0] : null;
  const primaryShield = shields.length > 0 ? shields[0] : null;
  
  // Get weapon stats (only from primary weapon)
  const weaponStats = primaryWeapon ? normalizeStats(primaryWeapon) : { strength: 0, defense: 0, speed: 0 };
  
  // Get shield stats (only from primary shield)
  const shieldStats = primaryShield ? normalizeStats(primaryShield) : { strength: 0, defense: 0, speed: 0 };
  
  // Calculate final combined stats
  return {
    baseStats: heroStats,
    weaponStats: weaponStats,
    shieldStats: shieldStats,
    primaryWeapon: primaryWeapon,
    primaryShield: primaryShield,
    totalStats: {
      strength: heroStats.strength + weaponStats.strength + shieldStats.strength,
      defense: heroStats.defense + weaponStats.defense + shieldStats.defense,
      speed: heroStats.speed + weaponStats.speed + shieldStats.speed
    }
  };
};

/**
 * Calculates combat power/rating based on total stats
 * @param {Object} totalStats - combined stats object
 * @returns {number} - combat power rating
 */
export const calculateCombatPower = (totalStats) => {
  // You can adjust these weights based on how you want to balance combat
  const strengthWeight = 1.2; // Slightly favor strength
  const defenseWeight = 1.0;
  const speedWeight = 1.1;   // Slightly favor speed
  
  return Math.round(
    (totalStats.strength * strengthWeight) + 
    (totalStats.defense * defenseWeight) + 
    (totalStats.speed * speedWeight)
  );
};

/**
 * Equipment limit constants
 */
export const EQUIPMENT_LIMITS = {
  MAX_WEAPONS: 1,
  MAX_SHIELDS: 1
};

/**
 * Check if hero can equip a weapon
 * @param {Object} hero - hero object with weapons array
 * @returns {boolean} - true if can equip weapon
 */
export const canEquipWeapon = (hero) => {
  const currentWeapons = hero.weapons ? hero.weapons.length : 0;
  return currentWeapons < EQUIPMENT_LIMITS.MAX_WEAPONS;
};

/**
 * Check if hero can equip a shield
 * @param {Object} hero - hero object with shields array
 * @returns {boolean} - true if can equip shield
 */
export const canEquipShield = (hero) => {
  const currentShields = hero.shields ? hero.shields.length : 0;
  return currentShields < EQUIPMENT_LIMITS.MAX_SHIELDS;
};

/**
 * Get equipment status for hero
 * @param {Object} hero - hero object
 * @returns {Object} - equipment status information
 */
export const getEquipmentStatus = (hero) => {
  const weaponsCount = hero.weapons ? hero.weapons.length : 0;
  const shieldsCount = hero.shields ? hero.shields.length : 0;
  
  return {
    weapons: {
      current: weaponsCount,
      max: EQUIPMENT_LIMITS.MAX_WEAPONS,
      canEquip: weaponsCount < EQUIPMENT_LIMITS.MAX_WEAPONS,
      isFull: weaponsCount >= EQUIPMENT_LIMITS.MAX_WEAPONS
    },
    shields: {
      current: shieldsCount,
      max: EQUIPMENT_LIMITS.MAX_SHIELDS,
      canEquip: shieldsCount < EQUIPMENT_LIMITS.MAX_SHIELDS,
      isFull: shieldsCount >= EQUIPMENT_LIMITS.MAX_SHIELDS
    }
  };
};

/**
 * Determines combat effectiveness against another hero
 * @param {Object} attacker - attacking hero's combat stats
 * @param {Object} defender - defending hero's combat stats
 * @returns {Object} - combat analysis
 */
export const analyzeCombat = (attacker, defender) => {
  const attackerPower = calculateCombatPower(attacker.totalStats);
  const defenderPower = calculateCombatPower(defender.totalStats);
  
  const powerDifference = attackerPower - defenderPower;
  const winChance = Math.max(0, Math.min(100, 50 + (powerDifference * 2)));
  
  return {
    attackerPower,
    defenderPower,
    powerDifference,
    winChance: Math.round(winChance),
    advantage: powerDifference > 0 ? 'attacker' : powerDifference < 0 ? 'defender' : 'even'
  };
};