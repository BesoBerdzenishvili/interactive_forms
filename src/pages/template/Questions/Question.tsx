import { Form } from "react-bootstrap";

interface Question {
  id: number;
  title: string;
  description: string;
  type: string;
}
const mockQTypes = ["text", "paragraph", "number", "ckeckbox"];

export default function Question({
  q,
  handleUpdateQuestion,
}: {
  q: Question;
  handleUpdateQuestion: (id: number, field: string, value: string) => void;
}) {
  return (
    <div key={q.id} className="border p-3 mb-3 w-sm-50">
      <Form.Group controlId={`question-title-${q.id}`} className="mb-2">
        <Form.Label>Question Title</Form.Label>
        <Form.Control
          type="text"
          value={q.title}
          required
          onChange={(e) => handleUpdateQuestion(q.id, "title", e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId={`question-description-${q.id}`} className="mb-2">
        <Form.Label>Question Description</Form.Label>
        <Form.Control
          type="text"
          value={q.description}
          required
          onChange={(e) =>
            handleUpdateQuestion(q.id, "description", e.target.value)
          }
        />
      </Form.Group>
      <Form.Group controlId={`question-type-${q.id}`} className="mb-2">
        <Form.Label>Question Type</Form.Label>
        <Form.Select
          value={q.type}
          onChange={(e) => handleUpdateQuestion(q.id, "type", e.target.value)}
        >
          {mockQTypes.map((i) => {
            return (
              <option key={i} value={i}>
                {i}
              </option>
            );
          })}
        </Form.Select>
      </Form.Group>
    </div>
  );
}
