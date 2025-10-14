import { Routes, Route } from "react-router-dom";
import Home from "../screens/Home/Home";
import Catalogo from "../screens/Catalogo/Catalogo";
import Login from "../screens/Auth/Login/Login";
import Register from "../screens/Auth/Register/Register";
import PublicRoutes from "./PublicRoutes";

export default function AppNavigator() {
  return (
    <>
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </>
  );
}
