import { useContext, useEffect, useState } from "react";
import { Form, Container, Card, Badge, Image } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { DarkModeContext } from "../contexts/dark_mode/DarkModeContext";
import supabase from "../config/supabase";
import { Answer, TemplateData } from "../types/types";
import { useParams } from "react-router-dom";

interface newTemplateData extends TemplateData {
  date: string;
}

interface newAnswer extends Answer {
  id: number;
}

const UserForm = () => {
  const [formData, setFormData] = useState<newTemplateData | undefined>();
  const [answers, setAnswers] = useState<newAnswer[]>([]);
  const { t } = useTranslation();
  const { darkMode } = useContext(DarkModeContext);

  const { formId, userId } = useParams();

  useEffect(() => {
    const fetchTemplates = async () => {
      const { data, error } = await supabase
        .from("templates")
        .select()
        .eq("id", formId)
        .single();
      if (data) {
        setFormData(data);
      }

      if (error) {
        console.log(error);
      }
    };
    fetchTemplates();
  }, []);

  useEffect(() => {
    const fetchAnswers = async () => {
      const { data, error } = await supabase
        .from("answers")
        .select()
        .eq("form_id", formId)
        .eq("author_id", userId)
        .order("order");
      if (data) {
        setAnswers(data);
      }

      if (error) {
        console.log(error);
      }
    };
    fetchAnswers();
  }, []);

  return (
    <Container>
      {/* Form Header */}
      <Card className={`mb-4 px-3 py-4 ${darkMode && "bg-dark text-white"}`}>
        {formData?.image_url && (
          <Image
            width={400}
            height={400}
            src={formData.image_url}
            alt={formData.title}
            className="self-center mb-3"
            rounded
            fluid
          />
        )}
        <Card.Title className="bg-primary text-white text-center p-2">
          {formData?.title}
        </Card.Title>
        <Card.Text>{formData?.description}</Card.Text>
        <Card.Text>
          <strong>{t("user_form.topic")}:</strong> <br /> {formData?.topic}
        </Card.Text>
        <Card.Text>
          <strong>{t("user_form.created_by")}:</strong> <br />
          {answers[0]?.author_name}
        </Card.Text>
        <Card.Text>
          <strong>{t("user_form.created_at")}:</strong>
          <br />
          {formData?.date?.split("T")[0]}
        </Card.Text>
        <Card.Text>
          <strong className="me-2">{t("user_form.tags")}:</strong>
          <br />
          {(formData?.tags ?? []).map((tag) => (
            <Badge bg="primary" key={tag} className="me-2 mt-2">
              {tag}
            </Badge>
          ))}
        </Card.Text>
        {/* center vertically */}
        <Card.Text className="d-flex align-items-center">
          {formData?.likes?.length}
          <i className="bi bi-heart-fill text-danger ms-1" />
        </Card.Text>
      </Card>

      {/* Form Questions */}
      {/* refactor */}
      <Form>
        {answers.map((answer) => (
          <Card
            key={answer.id}
            className={`mb-4 ${darkMode && "bg-dark text-white"}`}
          >
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
        ))}
      </Form>
    </Container>
  );
};

export default UserForm;
