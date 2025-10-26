import { NavLink } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { useContext, useState, useEffect, useRef } from "react";
import {
  getUnreadBattles,
  getBattleLogs,
  markBattlesAsRead,
} from "../../services/battles";
import { Bell } from "lucide-react";

import "./Nav.css";

function Nav() {
  const { user, gold, fetchGold } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const fetchUnread = async () => {
    try {
      const unread = await getUnreadBattles();
      setNotifications(unread);
    } catch (error) {
      console.error("Error fetching unread battles:", error);
    }
  };

  useEffect(() => {
    if (!user) {
      setNotifications([]); //  clear notifications on logout
      return;
    }

    const fetchAll = async () => {
      try {
        await fetchGold(); // only when logged in
        const unread = await getUnreadBattles();
        setNotifications(Array.isArray(unread) ? unread : []);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setNotifications([]); //  ensure consistent empty array
      }
    };

    fetchAll();
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = async () => {
    if (showDropdown) {
      setShowDropdown(false);
      return;
    }
    try {
      const logs = await getBattleLogs();
      setNotifications(logs.slice(0, 5)); // show last 5 only
      await markBattlesAsRead(); // mark all read
      setShowDropdown(true);
    } catch (error) {
      console.error("Error loading notifications:", error);
    }
  };

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  const authenticatedOptions = (
    <>
      <NavLink className="nav-link" to="/heroes" onClick={() => setOpen(false)}>
        Heroes
      </NavLink>
      <NavLink className="nav-link" to="/combat" onClick={() => setOpen(false)}>
        Combat Arena
      </NavLink>
      <NavLink
        className="nav-link"
        to="/dungeon"
        onClick={() => setOpen(false)}
      >
        Dungeon
      </NavLink>
      {/* 🔔 Notifications Dropdown */}
      <div className="nav-notifications" ref={dropdownRef}>
        <button className="bell-btn" onClick={toggleDropdown}>
          <Bell className="bell-icon" />
          {unreadCount > 0 && (
            <span className="notif-count">{unreadCount}</span>
          )}
        </button>

        {showDropdown && (
          <div className="notif-dropdown">
            {notifications.length === 0 ? (
              <p className="notif-empty">No recent battles</p>
            ) : (
              notifications.map((log) => (
                <div key={log.id} className="notif-item">
                  <p>
                    <strong>{log.hero_attacker}</strong> ({log.attacker_name}){" "}
                    {log.winner === log.attacker
                      ? "defeated"
                      : "was defeated by"}{" "}
                    <strong>
                      {log.hero_winner === log.hero_attacker
                        ? log.hero_loser
                        : log.hero_winner}
                    </strong>
                  </p>
                  <span className="notif-time">
                    {new Date(log.created_at).toLocaleString()}
                  </span>
                </div>
              ))
            )}
          </div>
        )}
      </div>
      <NavLink
        className="nav-profile-link"
        to={user ? `/users/${user.id}` : "/register"}
        onClick={() => setOpen(false)}
      >
        {user?.profile_picture ? (
          <img
            src={`http://localhost:8000${user.profile_picture}`}
            alt="Profile"
            className="nav-profile-img"
          />
        ) : (
          <div className="nav-profile-placeholder">
            {user?.username?.[0]?.toUpperCase() || "?"}
          </div>
        )}
      </NavLink>
      <div className="gold">Gold: {gold?.amount ?? 0}</div>
    </>
  );

  const unauthenticatedOptions = (
    <>
      <NavLink className="nav-link" to="/" onClick={() => setOpen(false)}>
        Log-In
      </NavLink>
    </>
  );

  return (
    <nav className="nav-container">
      {user && (
        <div className="link welcome">
          <strong>{user.username}</strong>
        </div>
      )}
      <button
        className="nav-hamburger"
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={open}
        aria-controls="nav-links"
        onClick={() => setOpen((o) => !o)}
      >
        <span aria-hidden="true">☰</span>
      </button>

      <div id="nav-links" className={`nav-links${open ? " open" : " closed"}`}>
        {user ? authenticatedOptions : unauthenticatedOptions}
      </div>
    </nav>
  );
}

export default Nav;
