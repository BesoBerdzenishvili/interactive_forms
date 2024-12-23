import { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Results from "./Results";
import Questionnaire from "./Questions/Questionnaire";
import Aggregation from "./Aggregation";
import { DarkModeContext } from "../../contexts/dark_mode/DarkModeContext";
import Likes from "../../components/Likes";
import supabase from "../../config/supabase";
import { useParams } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/user/UserContext";
import { TemplateData } from "../../types/types";
import useIsFormCreatorOrAdmin from "../../hooks/useIsFormCreatorOrAdmin";
import Comments from "./Comments";
import NavBar from "./NavBar";

const Template: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Questions");

  const [data, setData] = useState<TemplateData>({
    id: 0,
    title: "",
    description: "",
    likes: [],
    tags: [],
    topic: "",
    creator_id: 0,
    image_url: "",
    who_can_fill: [],
  });

  const { id } = useParams();
  const { currentUser } = useContext(CurrentUserContext);
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

  // that's how you insert several rows in a table (for answers submit)
  // const { data, error } = await supabase
  // .from('your_table_name')
  // .insert([{id:1},{id:2}]);

  return (
    <Container className={`px-5 pb-3 px-sm-2 ${darkMode ? "text-white" : ""}`}>
      {hasAccess && <NavBar handleTabClick={handleTabClick} />}

      <div className="mt-4">
        {activeTab === "Questions" && (
          <Questionnaire
            hasAccess={hasAccess}
            templateData={data}
            setTemplateData={setData}
          />
        )}
        {activeTab === "Aggregation" && <Aggregation formId={data.id} />}
        {activeTab === "Results" && <Results formId={data.id} />}
      </div>

      <Likes likes={data.likes} handleLike={handleLike} />

      <Comments formId={data.id} />
    </Container>
  );
};

export default Template;
