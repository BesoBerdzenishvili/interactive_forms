import React, { useState, useEffect } from "react";
import { CurrentUserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";
import { User } from "../../types/types";

export const CurrentUserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = localStorage.getItem("currentUser4");
    return saved
      ? JSON.parse(saved)
      : {
          id: "",
          name: "",
          email: "",
          created_at: "",
          is_blocked: false,
          is_admin: false,
        };
  });

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("currentUser4", JSON.stringify(currentUser));
  }, [currentUser]);

  const login = (newUser: User) => {
    setCurrentUser(newUser);
    navigate("/");
  };

  const update = (newUser: User) => {
    setCurrentUser(newUser);
  };

  const logout = () => {
    setCurrentUser({
      id: "0",
      name: "",
      email: "",
      created_at: "",
      is_blocked: false,
      is_admin: false,
    });
    navigate("/login");
  };

  return (
    <CurrentUserContext.Provider value={{ currentUser, login, logout, update }}>
      {children}
    </CurrentUserContext.Provider>
  );
};
