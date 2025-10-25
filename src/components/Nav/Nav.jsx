import { NavLink } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { useContext, useState, useEffect } from "react";
import { getGold } from "../../services/gold";
import "./Nav.css";

function Nav() {
  const { user } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [gold, setGold] = useState();

  useEffect(() => {
    if (!user || !user.id) {
      setGold(0);
      return;
    }
    const fetchGold = async () => {
      if (user) {
        try {
          const goldData = await getGold();
          console.log("This is the gold", goldData.amount);
          setGold(goldData);
        } catch (error) {
          console.error("Error fetching gold:", error);
        }
      }
    };
    fetchGold();
  }, [user]);

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
      <div className="gold">Gold:{gold?.amount ?? 0}</div>
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
