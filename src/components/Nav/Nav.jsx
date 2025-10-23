import { NavLink } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { useContext, useState } from "react";
import "./Nav.css";

function Nav() {
  const { user } = useContext(UserContext);
  const [open, setOpen] = useState(false);

  const authenticatedOptions = (
    <>
      <NavLink className="nav-link" to="/heroes" onClick={() => setOpen(false)}>
        Heroes
      </NavLink>
      <NavLink
        className="nav-link"
        to="/heroes/add"
        onClick={() => setOpen(false)}
      >
        Add Hero
      </NavLink>
      <NavLink
        className="nav-link"
        to="/weapons"
        onClick={() => setOpen(false)}
      >
        Weapons
      </NavLink>
      <NavLink
        className="nav-link"
        to="/weapons/add"
        onClick={() => setOpen(false)}
      >
        Add Weapon
      </NavLink>
      <NavLink
        className="nav-link"
        to="/shields"
        onClick={() => setOpen(false)}
      >
        Shields
      </NavLink>
      <NavLink
        className="nav-link"
        to="/shields/add"
        onClick={() => setOpen(false)}
      >
        Add Shield *\{" "}
      </NavLink>
      <NavLink
        className="nav-link"
        to="/combat"
        // onClick={() => setOpen(false)}
      >
        Combat Arena
      </NavLink>
      <NavLink
        className="nav-link"
        to="/sign-out"
        onClick={() => setOpen(false)}
      >
        Log Out
      </NavLink>
    </>
  );

  const unauthenticatedOptions = (
    <>
      <NavLink className="nav-link" to="/" onClick={() => setOpen(false)}>
        Log-In
      </NavLink>
      <NavLink
        className="nav-link"
        to="/register"
        onClick={() => setOpen(false)}
      >
        Register
      </NavLink>
    </>
  );

  return (
    <nav>
      {user && <div className="link welcome">Welcome, {user.username}</div>}
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
