import { useEffect, useState } from "react";
import { TemplateData } from "../../types/types";
import { useNavigate } from "react-router-dom";
import supabase from "../../config/supabase";
import { Carousel, Image } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import MarkdownEditor from "@uiw/react-markdown-editor";

export default function LatestTemplates() {
  const [latestTemplates, setLatestTemplates] = useState<TemplateData[]>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  useEffect(() => {
    const fetchTemplates = async () => {
      const { data, error } = await supabase
        .from("templates")
        .select()
        .order("date", { ascending: false })
        .limit(5);
      if (error) {
        console.log(error);
      }
      if (data) {
        setLatestTemplates(data);
      }
    };
    fetchTemplates();
  }, []);
  return latestTemplates?.length ? (
    <>
      <h3 className="my-3">{t("main.latest_title")}</h3>
      <Carousel className="w-50 h-100 d-flex flex-column justify-content-center align-items-center">
        {latestTemplates?.map((template, index) => (
          <Carousel.Item
            className="pointer"
            key={index}
            onClick={() => navigate(`/template/${template.id}`)}
          >
            <Image
              src={
                template.image_url
                  ? template.image_url
                  : "https://cdn12.picryl.com/photo/2016/12/31/blue-blueness-light-blue-backgrounds-textures-7cd256-1024.jpg"
              }
              alt={template.title}
              className="img-fluid"
            />
            <Carousel.Caption className="position-absolute top-50 start-50 translate-middle text-outline">
              <h3>
                {template.title.length > 30
                  ? template.title.split(" ").slice(0, 4).join(" ") + "..."
                  : template.title}
              </h3>
              <MarkdownEditor.Markdown
                className="bg-transparent text-light fs-2"
                source={
                  template.description.length > 30
                    ? template.description.split(" ").slice(0, 4).join(" ") +
                      "..."
                    : template.description
                }
              />
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  ) : (
    <p>{t("no_data.no_templates")}</p>
  );
}
