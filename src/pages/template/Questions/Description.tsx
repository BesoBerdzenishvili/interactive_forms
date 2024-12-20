import { Form } from "react-bootstrap";
import ReactMarkdownEditor from "@uiw/react-markdown-editor";
import { useTranslation } from "react-i18next";

export default function Description({
  description,
  onChange,
  hasAccess,
}: {
  description: string;
  onChange: (name: string, value: string) => void;
  hasAccess: boolean;
}) {
  const { t } = useTranslation();

  const handleDescriptionChange = (e: string) => {
    // find why is in ReactMarkdownEditor e string
    onChange("description", e);
  };
  return (
    <Form.Group className="mb-3 w-sm-25">
      <Form.Label>{t("template.questions.description")}</Form.Label>

      {hasAccess ? (
        <ReactMarkdownEditor
          value={description}
          onChange={handleDescriptionChange}
          height="100px"
        />
      ) : (
        <h4>{description}</h4>
      )}
    </Form.Group>
  );
}
