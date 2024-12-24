import { useContext, useEffect, useState } from "react";
import { Table, Button, Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { DarkModeContext } from "../contexts/dark_mode/DarkModeContext";
import { CurrentUserContext } from "../contexts/user/UserContext";
import supabase from "../config/supabase";
import PanelCell from "../components/PanelCell";
import { Answer, TemplateData } from "../types/types";

const UserPanel: React.FC = () => {
  const [templates, setTemplates] = useState<TemplateData[]>([]);
  const [filledForms, setFilledForms] = useState<Answer[]>([]);
  const [orderBy, setOrderBy] = useState<string>("order");
  const [orderTemplates, setOrderTemplates] = useState<boolean>(true);

  const navigate = useNavigate();

  const { t } = useTranslation();
  const { darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    const fetchAnswers = async () => {
      const { data, error } = await supabase
        .from("answers")
        .select()
        .eq("author_id", currentUser.id)
        .order(orderBy);
      if (error) {
        console.log(error);
      }
      if (data) {
        setFilledForms(data);
      }
    };
    fetchAnswers();
  }, [orderBy]);
  const formIds = Array.from(new Set(filledForms?.map((i) => i.form_id)));

  const addTemplate = async () => {
    const newTemplate = {
      creator_id: currentUser.id,
      title: "Untitled Form",
      description: "Form description",
      image_url: "",
      topic: "Other",
    };
    const { data, error } = await supabase
      .from("templates")
      .insert(newTemplate)
      .select();

    if (error) {
      console.log(error);
    }
    if (data) {
      setTemplates((prevTemplates) => [...prevTemplates, data[0]]);
    }
  };

  const deleteTemplate = async (id: number) => {
    const { error } = await supabase.from("templates").delete().eq("id", id);
    if (error) {
      console.log(error);
    }
    setTemplates(templates.filter((template) => template.id !== id));
  };

  useEffect(() => {
    const fetchTemplates = async () => {
      const { data, error } = await supabase
        .from("templates")
        .select()
        .eq("creator_id", currentUser.id)
        .order("title", { ascending: orderTemplates });
      if (error) {
        console.log(error);
      }
      if (data) {
        setTemplates(data);
      }
    };
    fetchTemplates();
  }, [orderTemplates]);

  const handleSortFilledForms = (column: string) => {
    setOrderBy(column);
  };

  useEffect(() => {
    if (!currentUser.name) {
      navigate("/");
    }
    // do we need currentUser.name as dep?
  }, []);

  return (
    <Container className="pt-4">
      {/* refactor as 2 components (with parent state) */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between">
            <h3 className="text-secondary">
              {t("user_panel.templates.title")}
            </h3>
            <Button variant="primary" onClick={addTemplate}>
              <i className="bi bi-plus" />{" "}
              {t("user_panel.templates.add_button")}
            </Button>
          </div>
          <Table
            bordered
            responsive
            hover
            variant={darkMode ? "dark" : ""}
            className="mt-3 text-center"
          >
            <thead>
              {/* add up down arrow here too */}
              <tr onClick={() => setOrderTemplates(!orderTemplates)}>
                <th>{t("user_panel.templates.tab.index")}</th>
                <th>{t("user_panel.templates.tab.template_title")}</th>
                <th>{t("user_panel.templates.tab.actions")}</th>
              </tr>
            </thead>
            <tbody>
              {templates.map((template, index) => (
                <tr key={template.id}>
                  <td onClick={() => navigate(`/template/${template.id}`)}>
                    {index + 1}
                  </td>
                  <td onClick={() => navigate(`/template/${template.id}`)}>
                    {template.title}
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => deleteTemplate(template.id)}
                    >
                      <i className="bi bi-trash" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
        <Col className="text-center">
          <h3 className="text-secondary">
            {t("user_panel.filled_forms.title")}
          </h3>
          <Table
            bordered
            responsive
            hover
            variant={darkMode ? "dark" : ""}
            className="mt-3"
            style={{ overflow: "auto" }}
          >
            <thead>
              <tr>
                <th onClick={() => handleSortFilledForms("order")}>
                  {/* add up and down arrows when clicked 
                  and make field cursor pointer */}
                  {t("user_panel.filled_forms.tab.index")}
                </th>
                <th onClick={() => handleSortFilledForms("template_title")}>
                  {t("user_panel.filled_forms.tab.template")}
                </th>
                <th onClick={() => handleSortFilledForms("author_name")}>
                  {t("user_panel.filled_forms.tab.author")}
                </th>
              </tr>
            </thead>
            <tbody>
              {formIds.map((formId, index) => (
                <PanelCell
                  key={formId}
                  answer={filledForms?.filter((j) => j.form_id === formId)[0]}
                  formId={formId}
                  index={index}
                />
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default UserPanel;
