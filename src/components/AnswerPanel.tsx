import { Card } from "react-bootstrap";
import { Answer as AnswerType } from "../types/types";

interface AnswerProps {
  answer: AnswerType;
  darkMode: boolean;
}

export default function AnswerPanel({ answer, darkMode }: AnswerProps) {
  return (
    <Card className={`mb-4 ${darkMode && "bg-dark text-white"}`}>
      <Card.Body>
        <Card.Title>{answer.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-secondary">
          <i>{answer.description}</i>
        </Card.Subtitle>
        <Card.Text>
          <i>
            {answer.type === "checkbox"
              ? answer.answer
                ? "Yes"
                : "No"
              : answer.answer}
          </i>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
