import { useContext } from "react";
import { Card } from "react-bootstrap";
import { DarkModeContext } from "../contexts/dark_mode/DarkModeContext";
import { Comment as CommentType } from "../types/types";
import useNameById from "../hooks/useNameById";

export default function Comment({ comment }: { comment: CommentType }) {
  const { darkMode } = useContext(DarkModeContext);
  const date = comment.created_at.split("T");
  return (
    <Card className={`mb-3 ${darkMode && "text-white bg-dark"}`}>
      <Card.Header className="bg-primary d-flex justify-content-between">
        <strong>{useNameById(comment.author_id)}</strong>
        <strong>
          {date[0]}, {date[1].slice(0, 5)}
        </strong>
      </Card.Header>
      <Card.Body>
        <Card.Text>{comment.text}</Card.Text>
      </Card.Body>
    </Card>
  );
}
