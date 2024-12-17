import { useContext } from "react";
import { ListGroup } from "react-bootstrap";
import { DarkModeContext } from "../contexts/dark_mode/DarkModeContext";

// take to types if server sends same
interface Comment {
  id: number;
  name: string;
  text: string;
}

export default function Comment({ comment }: { comment: Comment }) {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <ListGroup.Item className={darkMode ? "text-white bg-dark" : ""}>
      <strong>{comment.name}</strong>
      <p>{comment.text}</p>
    </ListGroup.Item>
  );
}
