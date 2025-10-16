import { Navigate, Outlet } from "react-router-dom";
export default function AuthenticatedRoutes() {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login"></Navigate>;
  }

  return <Outlet />;
}
