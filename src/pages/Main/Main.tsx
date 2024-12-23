import { useContext } from "react";
import { DarkModeContext } from "../../contexts/dark_mode/DarkModeContext";
import PopularTemplates from "./PopularTemplates";
import LatestTemplates from "./LatestTemplates";
import TagCloud from "./TagCloud";

export default function Main() {
  const { darkMode } = useContext(DarkModeContext);
  // figure out other way to center main
  // position absolute causes lot's of trouble (hits header, on mobile version hits burger menu)

  return (
    <div
      className={`d-flex flex-column mt-5 align-items-center justify-content-evenly w-75 h-100 position-absolute top-50 start-50 translate-middle ${
        darkMode && "text-light"
      }`}
    >
      <TagCloud />
      <LatestTemplates />
      <PopularTemplates />
    </div>
  );
}
