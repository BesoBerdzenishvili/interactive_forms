import { useEffect, useState } from "react";
import { TemplateData } from "../../types/types";
import { useNavigate } from "react-router-dom";
import supabase from "../../config/supabase";
import { Carousel, Image } from "react-bootstrap";

export default function LatestTemplates() {
  const [latestTemplates, setLatestTemplates] = useState<TemplateData[]>();
  const navigate = useNavigate();

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
  return (
    <>
      {/* translate */}
      <h3>Latest Templates</h3>
      <Carousel className="w-50 h-50">
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
            <Carousel.Caption>
              <h3>{template.title}</h3>
              <p>{template.description}</p>
              <h5>User Name (after refactoring)</h5>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
}
