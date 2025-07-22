import { Navigate } from "react-router-dom";
import useAuth from "./auth";

 const PublicRoute = ({ children }) => {
  const { userData, token } = useAuth();
  console.log('User Data:',userData)
  if (userData && token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;