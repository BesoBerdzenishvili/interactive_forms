import { useState } from "react";
import { Container, Nav, Form, Button, ListGroup } from "react-bootstrap";
import Comment from "../../common/Comment";
import Results from "./Results";
import Questions from "./Questions/Questions";
import Aggregation from "./Aggregation";
import { useTranslation } from "react-i18next";

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
// https://reactrouter.com/start/framework/routing#dynamic-segments
// get route parameters
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
  const { t } = useTranslation();

  return (
    <Container className="px-5 pb-3 px-sm-2">
      <Nav justify variant="tabs" defaultActiveKey="/">
        <Nav.Item>
          <Nav.Link
            onClick={(e) => {
              e.preventDefault();
              handleTabClick("Questions");
            }}
            href="/"
          >
            {t("template.nav.questions")}
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => handleTabClick("Aggregation")}
            eventKey="link-1"
          >
            {t("template.nav.aggregation")}
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          {/* if opening the page won't fetch list then make this href like questions */}
          <Nav.Link onClick={() => handleTabClick("Results")} eventKey="link-2">
            {t("template.nav.results")}
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <div className="mt-4">
        {activeTab === "Questions" && <Questions />}
        {activeTab === "Aggregation" && <Aggregation />}
        {activeTab === "Results" && <Results />}
      </div>

      <div className="mt-5">
        <h4> {t("template.comments.title")}:</h4>
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
              placeholder={t("template.comments.placeholder")}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleAddComment}>
            {t("template.comments.add_button")}
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default Template;
