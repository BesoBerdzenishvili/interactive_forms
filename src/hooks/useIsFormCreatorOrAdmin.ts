import { useContext, useMemo } from "react";
import { CurrentUserContext } from "../contexts/user/UserContext";

export default function useIsFormCreatorOrAdmin(form_creator_id: number) {
  const { currentUser } = useContext(CurrentUserContext);
  const currentUserId = currentUser.id;
  const isAdmin = currentUser.is_admin;

  return useMemo(() => {
    return currentUserId === form_creator_id || isAdmin;
  }, [currentUserId, form_creator_id, isAdmin]);
}
