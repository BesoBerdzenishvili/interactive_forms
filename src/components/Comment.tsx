import { useContext } from "react";
import { ListGroup } from "react-bootstrap";
import { DarkModeContext } from "../contexts/dark_mode/DarkModeContext";
import { Comment as CommentType } from "../types/types";

// take to types if server sends same

export default function Comment({ comment }: { comment: CommentType }) {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <ListGroup.Item className={darkMode ? "text-white bg-dark" : ""}>
      {/* 
        find author name by id
        from props get list of users
        find user with that name
        display it's name

        or do above in parent component and pass name here
      */}
      <strong>{comment.author_name}</strong>
      <p>{comment.text}</p>
    </ListGroup.Item>
  );
}
