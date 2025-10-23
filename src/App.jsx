import Nav from "./components/Nav/Nav.jsx";
import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import SignOut from "./pages/SignOut.jsx";
import Hero from "./pages/Hero.jsx";
import HeroDetail from "./pages/HeroDetail.jsx";
import CreateHero from "./pages/CreateHero.jsx";
import EditHero from "./pages/EditHero.jsx";
import Shields from "./pages/Shields.jsx";
import ShieldDetail from "./pages/ShieldDetail.jsx";
import CreateShield from "./pages/CreateShield.jsx";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Weapons from "./pages/weapons.jsx";
import CreateWeapon from "./pages/CreateWeapon.jsx";
import WeaponDetail from "./pages/WeaponDetail.jsx";
import CombatArena from "./pages/CombatArena.jsx";
import GoldDetail from "./pages/GoldDetails.jsx";
import GoldList from "./pages/GoldList.jsx";
import Dungeon from "./pages/Dungeon.jsx";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />{" "}
        {/* pass setUser via context*/}
        <Route path="/sign-out" element={<SignOut />} />{" "}
        {/* pass setUser via context*/}
        <Route path="/heroes" element={<Hero />} />
        <Route path="/heroes/add" element={<CreateHero />} />
        <Route path="/heroes/:heroId/edit" element={<EditHero />} />
        <Route path="/heroes/:heroId" element={<HeroDetail />} />
        <Route path="/shields" element={<Shields />} />
        <Route path="/shields/add" element={<CreateShield />} />
        <Route path="/shields/:shieldId" element={<ShieldDetail />} />
        <Route path="/weapons" element={<Weapons />} />
        <Route path="/weapons/add" element={<CreateWeapon />} />
        <Route path="/weapons/:weaponId" element={<WeaponDetail />} />
        <Route path="/combat" element={<CombatArena />} />
        <Route path="/gold" element={<GoldList />} />
        <Route path="gold/:goldId" element={<GoldDetail />} />
        <Route path="/dungeon" element={<Dungeon />} />
      </Routes>
    </>
  );
}

export default App;
