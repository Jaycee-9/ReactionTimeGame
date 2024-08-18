import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoutes = () => {
  const data = JSON.parse(localStorage.getItem("user"));
  return data ? <Outlet /> : <Navigate to="/login" />;
};
