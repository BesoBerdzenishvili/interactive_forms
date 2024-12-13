import { useState } from "react";
import { Container, Nav, Form, Button, ListGroup } from "react-bootstrap";
import Comment from "../../common/Comment";
import Results from "./Results";
import Questions from "./Questions/Questions";
import Aggregation from "./Questions/Aggregation";

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
    <Container className="px-5 pb-3 px-sm-2">
      <Nav justify variant="tabs" defaultActiveKey="/home">
        <Nav.Item>
          <Nav.Link onClick={() => handleTabClick("Questions")} href="/home">
            Questions
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => handleTabClick("Aggregation")}
            eventKey="link-1"
          >
            Aggregation
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          {/* if opening the page won't fetch list then make this href like questions */}
          <Nav.Link onClick={() => handleTabClick("Results")} eventKey="link-2">
            Results
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <div className="mt-4">
        {activeTab === "Questions" && <Questions />}
        {activeTab === "Aggregation" && <Aggregation />}
        {activeTab === "Results" && <Results />}
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
              // make those 50 above sm and 100 by default
              className="w-sm-50"
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
