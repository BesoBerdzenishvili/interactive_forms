import { Form } from "react-bootstrap";
import ReactMarkdownEditor from "@uiw/react-markdown-editor";
import { useTranslation } from "react-i18next";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { useContext } from "react";
import { DarkModeContext } from "../../../contexts/dark_mode/DarkModeContext";

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
  const { darkMode } = useContext(DarkModeContext);

  const handleDescriptionChange = (e: string) => {
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
        <MarkdownEditor.Markdown
          className={`mb-3 ${darkMode && "bg-black text-white"}`}
          source={description}
        />
      )}
    </Form.Group>
  );
}
