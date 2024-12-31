import React, { useContext, useEffect, useState } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";
import { CurrentUserContext } from "../contexts/user/UserContext";
import useFormAccess from "../hooks/useFormAccess";
import supabase from "../config/supabase";

interface ProtectedRouteProps {
  checkAdmin?: boolean;
  checkTemplate?: boolean;
}

interface Template {
  who_can_fill: number[];
  creator_id: number;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  checkAdmin = false,
  checkTemplate = false,
}) => {
  const { currentUser } = useContext(CurrentUserContext);
  const { id } = useParams();
  const [templates, setTemplates] = useState<Template>();

  useEffect(() => {
    const fetchTemplate = async () => {
      const { data, error } = await supabase
        .from("templates")
        .select("who_can_fill, creator_id")
        .eq("id", id)
        .single();
      if (error) {
        console.log(error);
      }
      if (data) {
        setTemplates(data);
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
  if (
    checkTemplate &&
    !checkAdmin &&
    !useFormAccess(templates?.who_can_fill, templates?.creator_id)
  ) {
    return <Navigate to="/no-access" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
