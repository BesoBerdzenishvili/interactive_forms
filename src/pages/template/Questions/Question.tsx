import { useContext } from "react";
import { Form } from "react-bootstrap";
import { CurrentUserContext } from "../../../contexts/user/UserContext";
import { Question as Qtype } from "../../../types/types";

const mockQTypes = ["text", "paragraph", "number", "ckeckbox"];

export default function Question({
  q,
  handleUpdateQuestion,
  hasAccess,
  mockType = "ckeckbox",
}: // we may not need to fetch mockType as prop
{
  q: Qtype;
  handleUpdateQuestion: (id: string, field: string, value: string) => void;
  hasAccess: boolean;
  mockType?: string;
}) {
  const { currentUser } = useContext(CurrentUserContext);

  let inputElement;
  switch (mockType) {
    case "text":
      inputElement = <Form.Control type="text" placeholder="Enter answer" />;
      break;
    case "paragraph":
      inputElement = (
        <Form.Control as="textarea" rows={3} placeholder="Enter answer" />
      );
      break;
    case "number":
      inputElement = <Form.Control type="number" placeholder="Enter number" />;
      break;
    case "ckeckbox":
      inputElement = <Form.Check type="checkbox" label="Check me out" />;
      break;
  }

  return (
    <div key={q.id} className="border rounded p-3 mb-3 w-sm-50">
      <Form.Group controlId={`question-title-${q.id}`} className="mb-2">
        <Form.Label>Question Title</Form.Label>
        {hasAccess ? (
          <Form.Control
            type="text"
            value={q.title}
            required
            onChange={(e) =>
              handleUpdateQuestion(q.id, "title", e.target.value)
            }
          />
        ) : (
          <h3>Test Title</h3>
        )}
      </Form.Group>
      <Form.Group controlId={`question-description-${q.id}`} className="mb-2">
        <Form.Label>Question Description</Form.Label>
        {hasAccess ? (
          <Form.Control
            type="text"
            value={q.description}
            required
            onChange={(e) =>
              handleUpdateQuestion(q.id, "description", e.target.value)
            }
          />
        ) : (
          <h3>Test Description</h3>
        )}
      </Form.Group>
      <Form.Group className="mb-2">
        {hasAccess && (
          <>
            <Form.Label>Question Type</Form.Label>
            <Form.Select
              value={q.type}
              onChange={(e) =>
                handleUpdateQuestion(q.id, "type", e.target.value)
              }
            >
              {mockQTypes.map((i) => {
                return (
                  <option key={i} value={i}>
                    {i}
                  </option>
                );
              })}
            </Form.Select>
          </>
        )}
      </Form.Group>
      {currentUser.name && (
        <>
          <Form.Label>Answer</Form.Label>
          {inputElement}
        </>
      )}
    </div>
  );
}
