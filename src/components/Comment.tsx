import { useContext } from "react";
import { ListGroup } from "react-bootstrap";
import { DarkModeContext } from "../contexts/dark_mode/DarkModeContext";
import { Comment as CommentType } from "../types/types";
import useNameById from "../hooks/useNameById";

export default function Comment({ comment }: { comment: CommentType }) {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <ListGroup.Item className={darkMode ? "text-white bg-dark" : ""}>
      <strong>{useNameById(comment.author_id)}</strong>
      <p>{comment.text}</p>
    </ListGroup.Item>
  );
}
