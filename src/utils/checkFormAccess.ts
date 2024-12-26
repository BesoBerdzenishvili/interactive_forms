import { useContext } from "react";
import { CurrentUserContext } from "../contexts/user/UserContext";

export default function checkFormAccess(templates: number[]) {
  const { currentUser } = useContext(CurrentUserContext);
  if (templates?.length === 0 || currentUser.is_admin) {
    return true;
  } else if (templates?.length > 0 && !currentUser.name) {
    return false;
  } else {
    return templates?.includes(Number(currentUser.id));
  }
}
