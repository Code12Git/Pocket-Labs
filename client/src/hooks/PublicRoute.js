import { Navigate } from "react-router-dom";
import useAuth from "./auth";

export const PublicRoute = ({ children }) => {
  const { userData, token } = useAuth();

  if (userData && token) {
    return <Navigate to="/" replace />;
  }

  return children;
};