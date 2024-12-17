import { createContext } from "react";

type DarkModeContextType = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

export const DarkModeContext = createContext<DarkModeContextType>({
  darkMode: false,
  toggleDarkMode: () => {},
});
