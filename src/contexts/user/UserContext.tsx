import { createContext } from "react";
import { User } from "../../types/types";

type CurrentUserContextType = {
  currentUser: User;
  login: (newUser: User) => void;
  logout: () => void;
};

export const CurrentUserContext = createContext<CurrentUserContextType>({
  currentUser: {
    id: 0,
    name: "",
    email: "",
    created_at: "",
    is_blocked: false,
    is_admin: false,
  },
  login: () => {},
  logout: () => {},
});
