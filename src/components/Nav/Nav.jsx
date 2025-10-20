import { NavLink } from "react-router-dom";
import "./Nav.css";
function Nav({ user }) {
  const authenticatedOptions = (
    <>
      <NavLink className="nav-link" to="/heroes">
        Heroes
      </NavLink>
      <NavLink className="nav-link" to="/heroes/add">
        Add Hero
      </NavLink>
      <NavLink className="nav-link" to="/weapons">
        Weapons
      </NavLink>
      <NavLink className="nav-link" to="/weapons/add">
        Add Weapon
      </NavLink>
      <NavLink className="nav-link" to="/shields">
        Shields
      </NavLink>
      <NavLink className="nav-link" to="/shields/add">
        Add Shield
      </NavLink>
      <NavLink className="nav-link" to="/sign-out">
        Log Out
      </NavLink>
    </>
  );

  const unauthenticatedOptions = (
    <>
      <NavLink className="nav-link" to="/">
        Log-In
      </NavLink>
      <NavLink className="nav-link" to="/register">
        Register
      </NavLink>
    </>
  );

  return (
    <nav>
      {user && <div className="link welcome">Welcome, {user.username}</div>}
      <div className="nav-links">
        {user ? authenticatedOptions : unauthenticatedOptions}
      </div>
    </nav>
  );
}

export default Nav;
