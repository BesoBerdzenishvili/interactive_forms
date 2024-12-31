import { useContext } from "react";
import { CurrentUserContext } from "../contexts/user/UserContext";

export default function useFormAccess(
  templates: number[] = [],
  creator_id: number = 0
) {
  const { currentUser } = useContext(CurrentUserContext);
  if (
    templates?.length === 0 ||
    currentUser.is_admin ||
    currentUser.id === creator_id
  ) {
    return true;
  } else if (templates?.length > 0 && !currentUser.name) {
    return false;
  } else {
    return templates?.includes(Number(currentUser.id));
  }
}
