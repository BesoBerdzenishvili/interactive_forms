import { Dispatch, SetStateAction, useState } from "react";
import { Form, Button, InputGroup, Image } from "react-bootstrap";
import AllowedUsersList from "./AllowedUsersList";
import Description from "./Description";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import supabase from "../../../config/supabase";
import { TemplateData } from "../../../types/types";
import Topics from "./Topics";
import UploadComponent from "../../../components/UploadImage";
import Questions from "./Questions";

const Questionnaire = ({
  templateData,
  setTemplateData,
  hasAccess,
}: {
  templateData: TemplateData;
  setTemplateData: Dispatch<SetStateAction<TemplateData>>;
  hasAccess: boolean;
}) => {
  const [tagInput, setTagInput] = useState("");

  const { t } = useTranslation();
  const { id } = useParams();

  const handleAddTag = () => {
    if (tagInput && !templateData.tags.includes(tagInput)) {
      setTemplateData((prevState: TemplateData) => ({
        ...prevState,
        tags: [...templateData.tags, tagInput],
      }));
      handleInputChange("tags", [...templateData.tags, tagInput]);
    }
  };

  const handleInputChange = async (
    name: string,
    value: string | string[] | number[]
  ) => {
    // console.log(name, "name", value);
    setTemplateData((prevState: TemplateData) => ({
      ...prevState,
      [name]: value,
    }));

    const { error } = await supabase
      .from("templates")
      .update({ [name]: value })
      .eq("id", id);
    if (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-center">{t("template.questions.title")}</h2>

      {templateData.image_url && (
        <Image
          rounded
          fluid
          className="text-center d-block mx-auto mt-4"
          src={templateData.image_url}
          alt="user's uploaded image"
        />
      )}

      <Form>
        {/* Title */}
        <Form.Group controlId="formTitle" className="my-3 w-sm-25">
          <Form.Label>{t("template.questions.form_title")}</Form.Label>
          {hasAccess ? (
            <Form.Control
              type="text"
              placeholder={t("template.questions.title_placeholder")}
              value={templateData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
            />
          ) : (
            <h2>{templateData.title}</h2>
          )}
        </Form.Group>

        {/* Description */}
        <Description
          description={templateData.description}
          hasAccess={hasAccess}
          onChange={handleInputChange}
        />

        {/* Topic */}
        <Topics
          handleInputChange={handleInputChange}
          initialTopic={templateData.topic}
          hasAccess={hasAccess}
        />

        {/* Tags */}
        <Form.Group controlId="formTags" className="mb-3 w-sm-25">
          <Form.Label>{t("template.questions.tags")}</Form.Label>
          {hasAccess && (
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
          )}
          <div className="mt-2">
            {templateData.tags.map((tag, index) => (
              <span key={index} className="badge bg-primary me-2">
                {tag}
              </span>
            ))}
          </div>
        </Form.Group>

        {/* Image */}
        {hasAccess && (
          <>
            <Form.Group className="mb-3 w-sm-25">
              <Form.Label>{t("template.questions.image")}</Form.Label>
              <br />
              <UploadComponent handleInputChange={handleInputChange} />
            </Form.Group>

            <AllowedUsersList
              whoCanFill={templateData.who_can_fill}
              handleInputChange={handleInputChange}
            />
          </>
        )}

        {/* Questions */}

        <Questions
          hasAccess={hasAccess}
          formId={templateData.id}
          formTitle={templateData.title}
        />
      </Form>
    </div>
  );
};

export default Questionnaire;
