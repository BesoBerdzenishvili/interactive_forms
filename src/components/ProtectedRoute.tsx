import React, { useContext, useEffect, useState } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";
import { CurrentUserContext } from "../contexts/user/UserContext";
import useFormAccess from "../hooks/useFormAccess";
import supabase from "../config/supabase";

interface ProtectedRouteProps {
  checkAdmin?: boolean;
  checkTemplate?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  checkAdmin = false,
  checkTemplate = false,
}) => {
  const { currentUser } = useContext(CurrentUserContext);
  const { id } = useParams();
  const [templates, setTemplates] = useState<number[]>([]);

  useEffect(() => {
    const fetchTemplate = async () => {
      const { data, error } = await supabase
        .from("templates")
        .select("who_can_fill")
        .eq("id", id)
        .single();
      if (error) {
        console.log(error);
      }
      if (data) {
        setTemplates(data.who_can_fill);
      }
    };
    fetchTemplate();
  }, []);

  if (!checkTemplate && !checkAdmin && currentUser.name) {
    return <Navigate to="/" />;
  }
  if (!checkTemplate && checkAdmin && !currentUser.is_admin) {
    return <Navigate to="/no-access" />;
  }
  if (checkTemplate && !checkAdmin && !useFormAccess(templates)) {
    return <Navigate to="/no-access" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
