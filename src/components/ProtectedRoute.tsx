import React, { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { CurrentUserContext } from "../contexts/user/UserContext";

interface ProtectedRouteProps {
  checkAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  checkAdmin = false,
}) => {
  const { currentUser } = useContext(CurrentUserContext);
  const location = useLocation();

  if (!checkAdmin && currentUser.name) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (checkAdmin && !currentUser.is_admin) {
    return <Navigate to="/no-access" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
