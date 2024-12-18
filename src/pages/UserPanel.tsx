import { useContext, useEffect, useState } from "react";
import { Table, Button, Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { DarkModeContext } from "../contexts/dark_mode/DarkModeContext";
import { CurrentUserContext } from "../contexts/user/UserContext";

interface Template {
  id: number;
  title: string;
}

interface FilledForm {
  index: number;
  templateName: string;
  authorName: string;
}

const UserPanel: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([
    { id: 1, title: "Template 1" },
    { id: 2, title: "Template 2" },
  ]);

  const navigate = useNavigate();

  const [filledForms, setFilledForms] = useState<FilledForm[]>([
    { index: 1, templateName: "Template 1", authorName: "User A" },
    { index: 2, templateName: "Template 2", authorName: "User B" },
  ]);

  const { t } = useTranslation();
  const { darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(CurrentUserContext);

  const addTemplate = () => {
    const newTemplate = {
      id: templates.length + 1,
      title: `Template ${templates.length + 1}`,
    };
    setTemplates([...templates, newTemplate]);
  };

  const deleteTemplate = (id: number) => {
    setTemplates(templates.filter((template) => template.id !== id));
  };

  const handleSortTemplates = (column: string) => {
    const sortedTemplates = [...templates].sort((a, b) =>
      a[column as keyof Template] > b[column as keyof Template] ? 1 : -1
    );
    setTemplates(sortedTemplates);
  };

  const handleSortFilledForms = (column: string) => {
    const sortedFilledForms = [...filledForms].sort((a, b) =>
      a[column as keyof FilledForm] > b[column as keyof FilledForm] ? 1 : -1
    );
    setFilledForms(sortedFilledForms);
  };

  useEffect(() => {
    if (!currentUser.name) {
      navigate("/");
    }
  }, []);

  return (
    <Container className="pt-4">
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
              <tr>
                <th onClick={() => handleSortTemplates("id")}>
                  {t("user_panel.templates.tab.index")}
                </th>
                <th onClick={() => handleSortTemplates("title")}>
                  {t("user_panel.templates.tab.template_title")}
                </th>
                <th>{t("user_panel.templates.tab.actions")}</th>
              </tr>
            </thead>
            <tbody>
              {templates.map((template) => (
                <tr
                  key={template.id}
                  onClick={() => navigate("/template/ttrj")}
                >
                  <td>{template.id}</td>
                  <td>{template.title}</td>
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
                <th onClick={() => handleSortFilledForms("index")}>
                  {t("user_panel.filled_forms.tab.index")}
                </th>
                <th onClick={() => handleSortFilledForms("templateName")}>
                  {t("user_panel.filled_forms.tab.template")}
                </th>
                <th onClick={() => handleSortFilledForms("authorName")}>
                  {t("user_panel.filled_forms.tab.author")}
                </th>
              </tr>
            </thead>
            <tbody>
              {filledForms.map((form) => (
                <tr key={form.index} onClick={() => navigate("/template/ttrj")}>
                  <td>{form.index}</td>
                  <td>{form.templateName}</td>
                  <td>{form.authorName}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default UserPanel;
