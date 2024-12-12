import { useState } from "react";
import { Container, Nav, Form, Button, ListGroup } from "react-bootstrap";
import Comment from "../common/Comment";

interface Comment {
  id: number;
  name: string;
  text: string;
}

const mockComments: Comment[] = [
  { id: 1, name: "Alice", text: "This is a great feature!" },
  { id: 2, name: "Bob", text: "Thanks for adding this functionality." },
  { id: 3, name: "Charlie", text: "Looking forward to more updates!" },
];

const Template: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Questions");
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [newComment, setNewComment] = useState<string>("");

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const newId = comments.length ? comments[comments.length - 1].id + 1 : 1;
      const newCommentObj: Comment = {
        id: newId,
        name: "Anonymous",
        text: newComment,
      };
      setComments([...comments, newCommentObj]);
      setNewComment("");
    }
  };

  return (
    <Container>
      <Nav justify variant="tabs" defaultActiveKey="/home">
        <Nav.Item>
          <Nav.Link onClick={() => handleTabClick("Questions")} href="/home">
            Questions
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => handleTabClick("Statistics")}
            eventKey="link-1"
          >
            Statistics
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => handleTabClick("Answers")} eventKey="link-2">
            Answers
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <div className="mt-4">
        {activeTab === "Questions" && <h2>Questions</h2>}
        {activeTab === "Statistics" && <h2>Statistics</h2>}
        {activeTab === "Answers" && <h2>Answers</h2>}
      </div>

      <div className="mt-5">
        <h4>Comments:</h4>
        <ListGroup className="mb-3">
          {comments.map((comment) => (
            <Comment comment={comment} key={comment.id} />
          ))}
        </ListGroup>

        <Form>
          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              rows={3}
              type="text"
              className="w-50"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleAddComment}>
            Add Comment
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default Template;
