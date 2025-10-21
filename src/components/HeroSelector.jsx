import './HeroSelector.css';

function HeroSelector({ 
  heroes, 
  selectedHero, 
  onHeroSelect, 
  filterByUser = null,
  excludeUser = null,
  showOwner = true,
  title = "Select Hero",
  currentUserId = null,
  allUsers = []
}) {
  // Helper function to get username from user ID
  const getUsernameById = (userId) => {
    const user = allUsers.find(u => u.id === userId);
    return user?.username || 'Unknown';
  };

  let filteredHeroes = heroes;

  if (filterByUser) {
    filteredHeroes = heroes.filter(hero => 
      hero.owner?.id === filterByUser.id || hero.user?.id === filterByUser.id
    );
  }

  if (excludeUser) {
    filteredHeroes = filteredHeroes.filter(hero => 
      hero.owner?.id !== excludeUser.id && hero.user?.id !== excludeUser.id
    );
  }

  if (filteredHeroes.length === 0) {
    return (
      <div className="hero-selector">
        <h3>{title}</h3>
        <p className="no-heroes">No heroes available for selection.</p>
      </div>
    );
  }

  return (
    <div className="hero-selector">
      <h3>{title}</h3>
      <div className="heroes-grid">
        {filteredHeroes.map(hero => {
          const owner = hero.owner || hero.user;
          const isMyHero = currentUserId && (
            (typeof owner === 'object' ? owner?.id : owner) === currentUserId ||
            hero.user === currentUserId
          );
          
          return (
            <div 
              key={hero.id} 
              className={`hero-card-container ${selectedHero?.id === hero.id ? 'selected' : ''}`}
            >
              {showOwner && (owner || hero.user) && (
                <div className={`hero-owner ${isMyHero ? 'my-hero' : 'other-hero'}`}>
                  {isMyHero ? '👑 Your Hero' : `⚔️ ${getUsernameById(hero.user)}'s Hero`}
                </div>
              )}
              
              <div 
                className="hero-selection-card"
                onClick={() => onHeroSelect(hero)}
              >
                <h4>{hero.name}</h4>
                
                {/* Character indicator */}
                <div className="character-indicator">
                  <span className="character-badge">
                    {getCharacterName(hero.character)}
                  </span>
                </div>

                {/* Base stats */}
                <div className="hero-base-stats">
                  <div className="stat">
                    <span className="stat-label">STR:</span>
                    <span className="stat-value">{hero.strength || 0}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">DEF:</span>
                    <span className="stat-value">{hero.defense || 0}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">SPD:</span>
                    <span className="stat-value">{hero.speed || 0}</span>
                  </div>
                </div>

                {/* Equipment count */}
                <div className="equipment-summary">
                  <span className="equipment-count">
                    ⚔️ {hero.weapons?.length || 0} | 🛡️ {hero.shields?.length || 0}
                  </span>
                </div>

                {/* Combat power indicator */}
                <div className="combat-power">
                  <span>Combat Power: {calculateQuickCombatPower(hero)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Helper function to get character name
function getCharacterName(character) {
  const characterMap = {
    "A": "Holy Paladin",
    "B": "Primal Barbarian", 
    "C": "Dragon Knight",
    "D": "Shadow Assassin",
    "E": "Demon Hunter",
    "F": "Chackie Jan",
    "G": "Hasidic Warrior",
    "H": "Mexican Vaquero",
    "I": "Death Knight",
    "J": "Every Italian Ever"
  };
  return characterMap[character] || character;
}

// Quick combat power calculation for display
function calculateQuickCombatPower(hero) {
  const baseStats = (hero.strength || 0) + (hero.defense || 0) + (hero.speed || 0);
  
  // Add rough equipment bonus
  const weaponBonus = hero.weapons?.length > 0 ? 10 : 0; // Rough estimate
  const shieldBonus = hero.shields?.length > 0 ? 8 : 0;   // Rough estimate
  
  return baseStats + weaponBonus + shieldBonus;
}

export default HeroSelector;