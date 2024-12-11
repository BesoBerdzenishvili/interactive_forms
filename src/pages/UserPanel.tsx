import { useState } from "react";
import { Table, Button, Container, Row, Col } from "react-bootstrap";

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

  const [filledForms, setFilledForms] = useState<FilledForm[]>([
    { index: 1, templateName: "Template 1", authorName: "User A" },
    { index: 2, templateName: "Template 2", authorName: "User B" },
  ]);

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

  return (
    <Container className="pt-4">
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between">
            <h3>Templates</h3>
            <Button variant="primary" onClick={addTemplate}>
              <i className="bi bi-plus" /> Add Template
            </Button>
          </div>
          <Table
            bordered
            responsive
            hover
            variant="dark"
            className="mt-3 text-center"
          >
            <thead>
              <tr>
                <th onClick={() => handleSortTemplates("id")}>Index</th>
                <th onClick={() => handleSortTemplates("title")}>
                  Template Title
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {templates.map((template) => (
                <tr key={template.id}>
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
          <h3>Filled Forms</h3>
          <Table
            bordered
            responsive
            hover
            variant="dark"
            className="mt-3"
            style={{ overflow: "auto" }}
          >
            <thead>
              <tr>
                <th onClick={() => handleSortFilledForms("index")}>Index</th>
                <th onClick={() => handleSortFilledForms("templateName")}>
                  Template
                </th>
                <th onClick={() => handleSortFilledForms("authorName")}>
                  Author
                </th>
              </tr>
            </thead>
            <tbody>
              {filledForms.map((form) => (
                <tr key={form.index}>
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
