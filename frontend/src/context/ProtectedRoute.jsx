import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthContext.jsx";
import UserDashboard from "../pages/UserDashboard.jsx";
import AdminDashboard from "../pages/AdminDashboard.jsx";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user } = useContext(AuthContext);
  if (user==null) return <Navigate to="/login" />;

  if (!allowedRoles.includes(user.role)) {
    return <Navigate
            to={user.role === "admin" ? "/adminDashboard" : "/userDashboard"}
            replace
        />
  }

  return children;
};

export default ProtectedRoute;
export { ProtectedRoute };