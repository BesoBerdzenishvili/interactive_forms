import { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import Question from "./Question";
import AllowedUsersList from "./AllowedUsersList";
import Descroption from "./Descroption";
import { useTranslation } from "react-i18next";

interface Question {
  id: number;
  title: string;
  description: string;
  order: number;
  type: string;
}

interface User {
  id: number;
  name: string;
  email: string;
}

const mockTopics = ["Education", "Quiz", "Other"];
const mockUsers: User[] = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
];

const Questions: React.FC = () => {
  // we get id as prop to fetch data for given template
  const [formTitle, setFormTitle] = useState("");
  const [description, setDescription] = useState("");
  const [topic, setTopic] = useState(mockTopics[0]);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [image, setImage] = useState<string | null>(null);
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");

  const { t } = useTranslation();

  const handleAddTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

  const handleAddQuestion = () => {
    const newQuestion: Question = {
      id: Date.now(),
      title: "",
      description: "",
      order: questions.length,
      type: "other",
    };
    setQuestions([...questions, newQuestion]);
  };

  const handleUpdateQuestion = (id: number, field: string, value: string) => {
    const updatedQuestions = questions.map((q) =>
      q.id === id ? { ...q, [field]: value } : q
    );
    setQuestions(updatedQuestions);
    console.log("Updated questions:", updatedQuestions);
  };

  const handleAddUser = () => {
    if (newUserName && newUserEmail) {
      const newUser: User = {
        id: Date.now(),
        name: newUserName,
        email: newUserEmail,
      };
      setUsers([...users, newUser]);
      setNewUserName("");
      setNewUserEmail("");
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-center">{t("template.questions.title")}</h2>
      <Form>
        {/* Title */}
        <Form.Group controlId="formTitle" className="my-3 w-sm-25">
          <Form.Label>{t("template.questions.form_title")}</Form.Label>
          <Form.Control
            type="text"
            placeholder={t("template.questions.title_placeholder")}
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
          />
        </Form.Group>

        {/* Description */}
        <Descroption
          description={description}
          setDescription={setDescription}
        />

        {/* Topic */}
        <Form.Group controlId="formTopic" className="mb-3 w-sm-25">
          <Form.Label>{t("template.questions.topic")}</Form.Label>
          <Form.Select value={topic} onChange={(e) => setTopic(e.target.value)}>
            {mockTopics.map((topic, index) => (
              <option key={index} value={topic}>
                {topic}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        {/* Tags */}
        <Form.Group controlId="formTags" className="mb-3 w-sm-25">
          <Form.Label>{t("template.questions.tags")}</Form.Label>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder={t("template.questions.tags_placeholder")}
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
            />
            <Button onClick={handleAddTag}>
              <i className="bi bi-plus-circle"></i>
            </Button>
          </InputGroup>
          <div className="mt-2">
            {tags.map((tag, index) => (
              <span key={index} className="badge bg-primary me-2">
                {tag}
              </span>
            ))}
          </div>
        </Form.Group>

        {/* Image */}
        <Form.Group controlId="formImage" className="mb-3 w-sm-25">
          <Form.Label>{t("template.questions.image")}</Form.Label>
          <Form.Control type="file" onChange={handleImageChange} />
        </Form.Group>

        {image && <img src={image} alt="user's uploaded image" />}

        <AllowedUsersList
          users={users}
          handleAddUser={handleAddUser}
          newUserName={newUserName}
          setNewUserName={setNewUserName}
          newUserEmail={newUserEmail}
          setNewUserEmail={setNewUserEmail}
        />

        {/* Questions */}
        <h4 className="mt-5">{t("template.questions.questions")}</h4>

        {questions.map((q) => (
          <Question q={q} handleUpdateQuestion={handleUpdateQuestion} />
        ))}
        <Button variant="primary" onClick={handleAddQuestion}>
          <i className="bi bi-plus"></i> {t("template.questions.add_question")}
        </Button>
      </Form>
    </div>
  );
};

export default Questions;
