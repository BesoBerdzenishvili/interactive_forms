import React, { useContext } from "react";
import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";
import { CurrentUserContext } from "../contexts/user/UserContext";
import useFormAccess from "../hooks/useFormAccess";

interface ProtectedRouteProps {
  checkAdmin?: boolean;
  checkTemplate?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  checkAdmin = false,
  checkTemplate = false,
}) => {
  const { currentUser } = useContext(CurrentUserContext);
  const location = useLocation();
  const { id } = useParams();
  // console.log(useFormAccess(id), "result");

  if (!checkTemplate && !checkAdmin && currentUser.name) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (!checkTemplate && checkAdmin && !currentUser.is_admin) {
    return <Navigate to="/no-access" state={{ from: location }} replace />;
  }

  if (checkTemplate && !checkAdmin && useFormAccess(id)) {
    return <Navigate to="/no-access" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
