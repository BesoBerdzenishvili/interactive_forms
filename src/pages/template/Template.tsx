import { useContext, useEffect, useState } from "react";
import { Container, Nav } from "react-bootstrap";
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
import Comments from "./Comments";

const Template: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Questions");

  const [data, setData] = useState<TemplateData>({
    id: 0,
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

      <Comments formId={data.id} />
    </Container>
  );
};

export default Template;
