import { useContext } from "react";
import { DarkModeContext } from "../../contexts/dark_mode/DarkModeContext";
import PopularTemplates from "./PopularTemplates";
import LatestTemplates from "./LatestTemplates";
import TagCloud from "./TagCloud";

export default function Main() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div
      className={`d-flex flex-column align-items-center px-3 ${
        darkMode && "text-light"
      }`}
    >
      <TagCloud />
      <LatestTemplates />
      <PopularTemplates />
    </div>
  );
}
