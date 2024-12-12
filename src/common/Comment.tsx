import { ListGroup } from "react-bootstrap";

// take to types if server sends same
interface Comment {
  id: number;
  name: string;
  text: string;
}

export default function Comment({ comment }: { comment: Comment }) {
  return (
    <ListGroup.Item>
      <strong>{comment.name}</strong>
      <p>{comment.text}</p>
    </ListGroup.Item>
  );
}
