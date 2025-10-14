import { Routes, Route } from "react-router-dom";
import Home from "../screens/Home/Home";
import Catalogo from "../screens/Catalogo/Catalogo";
export default function AppNavigator() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/catalogo" element={<Catalogo />} />
    </Routes>
  );
}
