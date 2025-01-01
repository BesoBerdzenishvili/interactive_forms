import { Button, Card, Stack } from "react-bootstrap";
import { Answer as AnswerType } from "../types/types";
import { useContext, useEffect, useState } from "react";
import supabase from "../config/supabase";
import EditableAnswer from "./EditableAnswer";
import { CurrentUserContext } from "../contexts/user/UserContext";

interface newAnswer extends AnswerType {
  id: number;
}

interface AnswerProps {
  answer: newAnswer;
  darkMode: boolean;
  deleteAnswer: (id: number) => void;
}

export default function AnswerPanel({
  answer,
  darkMode,
  deleteAnswer,
}: AnswerProps) {
  const { currentUser } = useContext(CurrentUserContext);
  const [answerText, setAnswerText] = useState("");

  useEffect(() => {
    setAnswerText(answer.answer);
  }, []);

  const updateAnswer = async (text: string) => {
    const { error } = await supabase
      .from("answers")
      .update({ answer: text })
      .eq("id", answer.id);
    if (error) {
      console.log(error);
    }
  };

  const hasAccess = answer.author_id === currentUser.id || currentUser.is_admin;

  return (
    <Card className={`mb-4 ${darkMode && "bg-dark text-white"}`}>
      <Card.Body>
        <Stack direction="horizontal">
          <Card.Title>{answer.title}</Card.Title>
          {hasAccess && (
            <Button
              className="ms-auto"
              variant="danger"
              onClick={() => deleteAnswer(answer.id)}
            >
              X
            </Button>
          )}
        </Stack>
        <Card.Subtitle className="mb-2 text-secondary">
          <i>{answer.description}</i>
        </Card.Subtitle>
        <Card.Text>
          <EditableAnswer
            hasAccess={hasAccess}
            value={answerText}
            setValue={setAnswerText}
            check={answer.type === "checkbox"}
            onSave={updateAnswer}
          />
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
