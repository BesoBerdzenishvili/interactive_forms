import { Form } from "react-bootstrap";
import ReactMarkdownEditor from "@uiw/react-markdown-editor";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

export default function Descroption({
  description,
  setDescription,
}: {
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
}) {
  const { t } = useTranslation();
  // change the any type
  const handleDescriptionChange = (e: any) => {
    setDescription(e.target.value);
  };
  // basic value ('question description') must be coming from db
  return (
    <Form.Group controlId="formDescription" className="mb-3 w-sm-25">
      <Form.Label>{t("template.questions.description")}</Form.Label>

      <ReactMarkdownEditor
        value={description}
        onChange={handleDescriptionChange}
        height="100px"
      />
    </Form.Group>
  );
}
