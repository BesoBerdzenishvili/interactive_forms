import { useContext, useEffect, useState } from "react";
import { Button, Col, Table } from "react-bootstrap";
import supabase from "../../config/supabase";
import { TemplateData } from "../../types/types";
import { useTranslation } from "react-i18next";
import { DarkModeContext } from "../../contexts/dark_mode/DarkModeContext";
import { CurrentUserContext } from "../../contexts/user/UserContext";
import { useNavigate } from "react-router-dom";
import SortArrow from "../../components/SortArrow";

type newTemplateData = Pick<TemplateData, "id" | "title">;

export default function UserTemplates() {
  const [templates, setTemplates] = useState<newTemplateData[]>([]);
  const [asc, setAsc] = useState<boolean>(true);

  const { t } = useTranslation();
  const { darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(CurrentUserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTemplates = async () => {
      const { data, error } = await supabase
        .from("templates")
        .select("id, title")
        .eq("creator_id", currentUser.id)
        .order("title", { ascending: asc });
      if (error) {
        console.log(error);
      }
      if (data) {
        setTemplates(data);
      }
    };
    fetchTemplates();
  }, [asc]);

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
  return (
    <Col>
      <div className="d-flex justify-content-between">
        <h3 className="text-secondary">{t("user_panel.templates.title")}</h3>
        <Button variant="primary" onClick={addTemplate}>
          <i className="bi bi-plus" /> {t("user_panel.templates.add_button")}
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
          <tr onClick={() => setAsc(!asc)}>
            <th>{t("user_panel.templates.tab.index")}</th>
            <th>
              {t("user_panel.templates.tab.template_title")}
              <SortArrow orderBy="title" fieldName="title" asc={asc} />
            </th>
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
  );
}
