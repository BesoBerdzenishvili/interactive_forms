import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import supabase from "../../../config/supabase";

interface TopicsProps {
  handleInputChange: (name: string, value: string) => void;
  initialTopic: string;
  hasAccess: boolean;
}

interface Topic {
  id: number;
  topic: string;
}

export default function Topics({
  handleInputChange,
  initialTopic,
  hasAccess,
}: TopicsProps) {
  const [topic, setTopic] = useState("");

  useEffect(() => {
    setTopic(initialTopic);
    const fetchTpoics = async () => {
      const { data, error } = await supabase.from("topics").select();
      if (data) {
        setTopics(data);
      }

      if (error) {
        console.log(error);
      }
    };
    fetchTpoics();
  }, [initialTopic]);

  const [topics, setTopics] = useState<Topic[]>([]);
  const { t } = useTranslation();

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTopic(e.target.value);
    handleInputChange("topic", e.target.value);
  };
  return (
    <Form.Group className="mb-3 w-sm-25">
      <Form.Label>{t("template.questions.topic")}</Form.Label>
      {hasAccess ? (
        <Form.Select value={topic} onChange={handleChange}>
          {topics.map((topic) => (
            <option key={topic.id} value={topic.topic}>
              {topic.topic}
            </option>
          ))}
        </Form.Select>
      ) : (
        <h5>{topic && topic}</h5>
      )}
    </Form.Group>
  );
}
