import { calculateCombatStats, calculateCombatPower, getEquipmentStatus } from '../utils/combatStats.js';
import './CombatStats.css';

function CombatStats({ hero, showBreakdown = false }) {
  if (!hero) {
    return <div>Loading combat stats...</div>;
  }

  const combatStats = calculateCombatStats(hero, hero.weapons || [], hero.shields || []);
  const combatPower = calculateCombatPower(combatStats.totalStats);
  const equipmentStatus = getEquipmentStatus(hero);

  return (
    <div className="combat-stats-container">
      <h3>Combat Stats</h3>
      
      {/* Equipment Status */}
      <div className="equipment-status">
        <div className="equipment-slot">
          <span>Weapon: {equipmentStatus.weapons.current}/{equipmentStatus.weapons.max}</span>
          {combatStats.primaryWeapon && <span className="equipped-item">({combatStats.primaryWeapon.name})</span>}
        </div>
        <div className="equipment-slot">
          <span>Shield: {equipmentStatus.shields.current}/{equipmentStatus.shields.max}</span>
          {combatStats.primaryShield && <span className="equipped-item">({combatStats.primaryShield.name})</span>}
        </div>
      </div>

      {/* Total Combat Stats - Always Shown */}
      <div className="total-stats">
        <h4>Total Combat Power: {combatPower}</h4>
        <div className="stat-row">
          <span className="stat-label">Total Strength:</span>
          <span className="stat-value">{combatStats.totalStats.strength}</span>
        </div>
        <div className="stat-row">
          <span className="stat-label">Total Defense:</span>
          <span className="stat-value">{combatStats.totalStats.defense}</span>
        </div>
        <div className="stat-row">
          <span className="stat-label">Total Speed:</span>
          <span className="stat-value">{combatStats.totalStats.speed}</span>
        </div>
      </div>

      {/* Detailed Breakdown - Optional */}
      {showBreakdown && (
        <div className="stats-breakdown">
          <div className="base-stats">
            <h5>Base Hero Stats</h5>
            <div className="stat-row">
              <span>Strength: {combatStats.baseStats.strength}</span>
              <span>Defense: {combatStats.baseStats.defense}</span>
              <span>Speed: {combatStats.baseStats.speed}</span>
            </div>
          </div>

          <div className="weapon-stats">
            <h5>Weapon Bonuses</h5>
            <div className="stat-row">
              <span>+{combatStats.weaponStats.strength} Strength</span>
              <span>+{combatStats.weaponStats.defense} Defense</span>
              <span>+{combatStats.weaponStats.speed} Speed</span>
            </div>
          </div>

          <div className="shield-stats">
            <h5>Shield Bonuses</h5>
            <div className="stat-row">
              <span>+{combatStats.shieldStats.strength} Strength</span>
              <span>+{combatStats.shieldStats.defense} Defense</span>
              <span>+{combatStats.shieldStats.speed} Speed</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CombatStats;