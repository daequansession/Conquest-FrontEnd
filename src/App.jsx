import { useState, useEffect } from "react";
import { verifyUser } from "./services/users.js";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Register from "./pages/Register";
import SignOut from "./pages/SignOut.jsx";
import Hero from "./pages/Hero.jsx";
import HeroDetail from "./pages/HeroDetail.jsx";
import CreateHero from "./pages/CreateHero.jsx";
import EditHero from "./pages/EditHero.jsx";
import Shields from "./pages/shields.jsx";
import ShieldDetail from "./pages/ShieldDetail";
import CreateShield from "./pages/CreateShield";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Weapons from "./components/Weapon.jsx";
import CreateWeapon from "./pages/CreateWeapon.jsx";
import WeaponDetail from "./pages/WeaponDetail.jsx";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await verifyUser();
      user ? setUser(user) : setUser(null);
    };

    fetchUser();
  }, []);

  return (
    <>
      <Nav user={user} />
      <Routes>
        <Route path="/" element={<Home setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="/sign-out" element={<SignOut setUser={setUser} />} />
        <Route path="/heroes" element={<Hero />} />
        <Route path="/heroes/add" element={<CreateHero />} />
        <Route path="/heroes/:heroId/edit" element={<EditHero />} />
        <Route path="/heroes/:heroId" element={<HeroDetail />} />
        <Route path="/shields" element={<Shields />} />
        <Route path="/shields/add" element={<CreateShield />} />
        <Route path="/shields/:shieldId" element={<ShieldDetail />} />
        <Route path="/weapons" element={<Weapons />} />
        <Route path="/shields/add" element={<CreateWeapon />} />
        <Route path="/shields/:shieldId" element={<WeaponDetail />} />
      </Routes>
    </>
  );
}

export default App;
