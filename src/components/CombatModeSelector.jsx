import './CombatModeSelector.css';

function CombatModeSelector({ mode, onModeChange }) {
  return (
    <div className="combat-mode-selector">
      <h3>Combat Mode</h3>
      <div className="mode-buttons">
        <button 
          className={`mode-button ${mode === 'my-vs-any' ? 'active' : ''}`}
          onClick={() => onModeChange('my-vs-any')}
        >
          <div className="mode-icon">⚔️</div>
          <div className="mode-info">
            <h4>My Hero vs Anyone</h4>
            <p>Select your hero to fight others</p>
          </div>
        </button>
        
        <button 
          className={`mode-button ${mode === 'any-vs-any' ? 'active' : ''}`}
          onClick={() => onModeChange('any-vs-any')}
        >
          <div className="mode-icon">👁️</div>
          <div className="mode-info">
            <h4>Spectator Mode</h4>
            <p>Watch any heroes battle</p>
          </div>
        </button>
      </div>
    </div>
  );
}

export default CombatModeSelector;