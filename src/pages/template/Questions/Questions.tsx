import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Answer, Question as QType, TemplateData } from "../../../types/types";
import Question from "./Question";
import supabase from "../../../config/supabase";
import { CurrentUserContext } from "../../../contexts/user/UserContext";
import DismissibleAlert from "../../../components/Alert";
import alert from "../../../utils/alertMessages";

// Each time form is filled increase filled_forms with one
// actually we can calculate total answers like in aggregation

interface QuestionsProps {
  hasAccess: boolean;
  templateData: TemplateData;
} // replace id and title from templateData

interface newAnswer extends Answer {
  id: number;
}

export default function Questions({ hasAccess, templateData }: QuestionsProps) {
  const { currentUser } = useContext(CurrentUserContext);
  const [questions, setQuestions] = useState<QType[]>([]);
  const [answers, setAnswers] = useState<newAnswer[]>();
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState({
    color: "",
    heading: "",
    text: "",
  });

  useEffect(() => {
    setAnswers(
      questions?.map((i) => ({
        ...i,
        answer: "",
        author_id: currentUser.id,
        author_name: currentUser.name,
        template_title: templateData.title,
        send_id: (Date.now() + currentUser.id).toString(),
      }))
    );
  }, [questions]);

  const updateAnswer = (id: number, field: string, value: string) => {
    setAnswers(
      answers?.map((a) => (a.id === id ? { ...a, [field]: value } : a))
    );
  };

  const increaseFilledForms = async () => {
    const { error } = await supabase
      .from("templates")
      .update({
        filled_forms: templateData.filled_forms + 1,
        users_who_filled: [...templateData.users_who_filled, currentUser.id],
      })
      .eq("id", templateData.id);
    if (error) {
      console.log(error);
      setShow(true);
      const { text, ...rest } = alert.questions.sendError;
      setMessage({ ...rest, text: error.message });
      return;
    }
  };

  const sendAnswers = async () => {
    if (templateData.users_who_filled.includes(currentUser.id)) {
      setShow(true);
      setMessage(alert.questions.alreadySend);
      return;
    }
    const { error } = await supabase.from("answers").insert(
      answers
        ?.map((i) => ({
          ...i,
          author_name: currentUser.name,
          template_title: templateData.title,
        }))
        .map(({ id, ...rest }) => rest)
    );
    if (error) {
      console.log(error);
      setShow(true);
      const { text, ...rest } = alert.questions.sendError;
      setMessage({ ...rest, text: error.message });
    }
    increaseFilledForms();
    setAnswers([]);
    setShow(true);
    setMessage(alert.questions.sendSuccess);
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      const { data, error } = await supabase
        .from("questions")
        .select()
        .eq("form_id", templateData.id);
      if (data) {
        setQuestions(data);
      }

      if (error) {
        console.log(error);
      }
    };
    fetchQuestions();
    // do we need deps here?
  }, [templateData.id]);

  const { t } = useTranslation();

  const removeQuestion = async (id: number) => {
    await supabase.from("questions").delete().eq("id", id);
    setQuestions(questions.filter((i) => i.id !== id));
  };

  const handleAddQuestion = async () => {
    const { error } = await supabase.from("questions").insert({
      title: "Untitled question",
      description: "description",
      // automatically increase this field from db
      order: questions.length,
      form_id: templateData.id,
      type: "text",
    });

    if (error) {
      console.error("Error updating data:", error);
    }

    const newQuestion: QType = {
      id: Date.now(),
      title: "Untitled question",
      description: "description",
      form_id: templateData.id,
      order: questions.length,
      type: "text",
    };
    setQuestions([...questions, newQuestion]);
  };

  return (
    <>
      {show && <DismissibleAlert data={message} setShow={setShow} />}
      <div className="d-flex flex-column justify-content-center">
        <h4 className="mt-5 mb-4">
          {t("template.questions.questions")} ({questions?.length})
        </h4>

        {questions?.map((q) => (
          <Question
            key={q.id}
            hasAccess={hasAccess}
            q={q}
            answers={answers}
            removeQuestion={removeQuestion}
            updateAnswer={updateAnswer}
          />
        ))}
        {questions?.length > 0 && (
          <Button className="mb-4 self-center" onClick={sendAnswers}>
            {t("template.questions.submit_questions")}
          </Button>
        )}
        {hasAccess && (
          <div>
            <Button
              className="self-center"
              variant="primary"
              onClick={handleAddQuestion}
            >
              <i className="bi bi-plus"></i>{" "}
              {t("template.questions.add_question")}
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
