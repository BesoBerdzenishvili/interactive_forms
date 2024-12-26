import { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { CurrentUserContext } from "../../../contexts/user/UserContext";
import { Answer, Question as Qtype } from "../../../types/types";
import supabase from "../../../config/supabase";

const questionTypes = ["text", "paragraph", "number", "checkbox"];

interface newAnswer extends Answer {
  id: number;
  answer: string;
}

export default function Question({
  q,
  hasAccess,
  removeQuestion,
  updateAnswer,
  answers,
}: // we may not need to fetch mockType as prop
{
  q: Qtype;
  hasAccess: boolean;
  mockType?: string;
  answers: newAnswer[] | undefined;
  removeQuestion: (id: number) => void;
  updateAnswer: (id: number, field: string, value: string) => void;
}) {
  const { currentUser } = useContext(CurrentUserContext);
  const [question, setQuestion] = useState({
    title: "",
    description: "",
    order: 0,
    form_id: 0,
    type: "",
  });

  useEffect(() => {
    setQuestion(q);
  }, []);

  useEffect(() => {
    updateQuestion(q.id, "order", String(q.order));
  }, [q.order]);

  const updateQuestion = async (id: number, field: string, value: string) => {
    updateAnswer(id, field, value);
    setQuestion((prevState) => ({
      ...prevState,
      [field]: value,
    }));

    const { error } = await supabase
      .from("questions")
      .update({ [field]: value })
      .eq("id", id);

    if (error) {
      console.error("Error updating data:", error);
    }
  };
  // by changing this to state uncontrolled component error will go
  let thisAnswer = answers?.filter((i) => i.id === q.id)[0];

  let inputElement;
  switch (question.type) {
    case "text":
      inputElement = (
        <Form.Control
          value={thisAnswer?.answer}
          onChange={(e) => updateAnswer(q.id, "answer", e.target.value)}
          type="text"
          placeholder="Enter answer"
        />
      );
      break;
    case "paragraph":
      inputElement = (
        <Form.Control
          value={thisAnswer?.answer}
          onChange={(e) => updateAnswer(q.id, "answer", e.target.value)}
          as="textarea"
          rows={3}
          placeholder="Enter answer"
        />
      );
      break;
    case "number":
      inputElement = (
        <Form.Control
          value={thisAnswer?.answer}
          onChange={(e) => updateAnswer(q.id, "answer", e.target.value)}
          type="number"
          placeholder="Enter number"
        />
      );
      break;
    case "checkbox":
      inputElement = (
        <Form.Check
          value={thisAnswer?.answer}
          onChange={(e) => updateAnswer(q.id, "answer", e.target.value)}
          type="checkbox"
          label="Check me out"
        />
      );
      break;
  }

  return (
    <div key={q.id} className="border rounded p-3 mb-3 w-sm-50">
      <Form.Group controlId={`question-title-${q.id}`} className="mb-2">
        <div className="d-flex justify-content-between align-items-end">
          <Form.Label>
            <b>Question Title</b>
          </Form.Label>
          {hasAccess && (
            <Button
              onClick={() => removeQuestion(q.id)}
              variant="danger"
              className="mb-3"
            >
              X
            </Button>
          )}
        </div>
        {hasAccess ? (
          <Form.Control
            type="text"
            value={question.title}
            required
            onChange={(e) => updateQuestion(q.id, "title", e.target.value)}
          />
        ) : (
          <h6>
            <i>{q.title}</i>
          </h6>
        )}
      </Form.Group>
      <Form.Group controlId={`question-description-${q.id}`} className="mb-2">
        <Form.Label>
          <b>Question Description</b>
        </Form.Label>
        {hasAccess ? (
          <Form.Control
            type="text"
            value={question.description}
            required
            onChange={(e) =>
              updateQuestion(q.id, "description", e.target.value)
            }
          />
        ) : (
          <h6>
            <i>{q.description}</i>
          </h6>
        )}
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label className="font-weight-bold">
          <b>Question Type</b>
        </Form.Label>
        {hasAccess ? (
          <Form.Select
            value={question.type}
            onChange={(e) => updateQuestion(q.id, "type", e.target.value)}
          >
            {questionTypes.map((i) => {
              return (
                <option key={i} value={i}>
                  {i}
                </option>
              );
            })}
          </Form.Select>
        ) : (
          <h6>
            <i>{q.type}</i>
          </h6>
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
