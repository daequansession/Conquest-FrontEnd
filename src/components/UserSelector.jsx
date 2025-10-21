import './UserSelector.css';

function UserSelector({ users, selectedUser, onUserSelect, currentUserId, title = "Select Opponent" }) {
  const otherUsers = users.filter(user => user.id !== currentUserId);

  if (otherUsers.length === 0) {
    return (
      <div className="user-selector">
        <h3>{title}</h3>
        <p className="no-users">No other users available for combat.</p>
      </div>
    );
  }

  return (
    <div className="user-selector">
      <h3>{title}</h3>
      <div className="users-grid">
        {otherUsers.map(user => (
          <div 
            key={user.id} 
            className={`user-card ${selectedUser?.id === user.id ? 'selected' : ''}`}
            onClick={() => onUserSelect(user)}
          >
            <div className="user-avatar">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <div className="user-info">
              <h4>{user.username}</h4>
              <p className="user-stats">
                Heroes: {user.hero_count || user.heroes?.length || 0}
              </p>
              {user.last_active && (
                <p className="last-active">
                  Last active: {new Date(user.last_active).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserSelector;