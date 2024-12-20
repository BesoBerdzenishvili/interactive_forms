import { useContext, useMemo } from "react";
import { CurrentUserContext } from "../contexts/user/UserContext";

export default function useIsFormCreatorOrAdmin(form_creator_id: string) {
  const { currentUser } = useContext(CurrentUserContext);
  const currentUserId = currentUser.id.toString();
  const isAdmin = currentUser.is_admin;

  return useMemo(() => {
    return currentUserId === form_creator_id || isAdmin;
  }, [currentUserId, form_creator_id, isAdmin]);
}
