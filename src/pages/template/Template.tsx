import { useContext, useEffect, useState } from "react";
import { Container, Nav, Form, Button, ListGroup } from "react-bootstrap";
import Comment from "../../components/Comment";
import Results from "./Results";
import Questions from "./Questions/Questions";
import Aggregation from "./Aggregation";
import { useTranslation } from "react-i18next";
import { DarkModeContext } from "../../contexts/dark_mode/DarkModeContext";
import Likes from "../../components/Likes";
import supabase from "../../config/supabase";
import { useParams } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/user/UserContext";
import { TemplateData } from "../../types/types";
import useIsFormCreatorOrAdmin from "../../hooks/useIsFormCreatorOrAdmin";

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

  const [data, setData] = useState<TemplateData>({
    title: "",
    description: "",
    likes: [],
    tags: [],
    topic: "",
    creator_id: "",
    image_url: "",
    who_can_fill: [],
  });

  const { id } = useParams();
  const { currentUser } = useContext(CurrentUserContext);
  const { t } = useTranslation();
  const { darkMode } = useContext(DarkModeContext);

  useEffect(() => {
    const fetchTemplates = async () => {
      const { data, error } = await supabase
        .from("templates")
        .select()
        .eq("id", id)
        .single();
      if (data) {
        setData(data);
      }

      if (error) {
        console.log(error);
      }
    };
    fetchTemplates();
  }, []);

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  // maybe we can sync that with comments
  const handleLike = async () => {
    setData((prevState) => ({
      ...prevState,
      likes: [...data.likes, currentUser.id.toString()],
    }));
    const { error } = await supabase
      .from("templates")
      .update({ likes: [...data.likes, currentUser.id.toString()] })
      .eq("id", id);

    if (error) {
      console.error("Error updating data:", error);
    }
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

  const hasAccess = useIsFormCreatorOrAdmin(data.creator_id);

  return (
    <Container className={`px-5 pb-3 px-sm-2 ${darkMode ? "text-white" : ""}`}>
      {hasAccess && (
        // should we make nav a component?
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
            <Nav.Link
              onClick={() => handleTabClick("Results")}
              eventKey="link-2"
            >
              {t("template.nav.results")}
            </Nav.Link>
          </Nav.Item>
        </Nav>
      )}

      <div className="mt-4">
        {activeTab === "Questions" && (
          <Questions
            hasAccess={hasAccess}
            templateData={data}
            setTemplateData={setData}
          />
        )}
        {activeTab === "Aggregation" && <Aggregation />}
        {activeTab === "Results" && <Results />}
      </div>

      <Likes likes={data.likes} handleLike={handleLike} />

      <div className="mt-5">
        <h4> {t("template.comments.title")}:</h4>
        <ListGroup className="my-4">
          {comments.map((comment) => (
            <Comment comment={comment} key={comment.id} />
          ))}
        </ListGroup>

        {currentUser.name && (
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
                rows={3}
                type="text"
                // make those 50 above sm and 100 by default
                className={`w-sm-50`}
                placeholder={t("template.comments.placeholder")}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleAddComment}>
              {t("template.comments.add_button")}
            </Button>
          </Form>
        )}
      </div>
    </Container>
  );
};

export default Template;
