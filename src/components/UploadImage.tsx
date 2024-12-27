import React, { useRef, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

interface UploadComponentProps {
  handleInputChange: (name: string, value: string) => void;
}
interface CloudinaryError {
  message: string;
  status?: number;
}

interface CloudinaryUploadResult {
  event: string;
  info: {
    secure_url: string;
  };
}

const UploadComponent: React.FC<UploadComponentProps> = ({
  handleInputChange,
}) => {
  const cloudinaryRef = useRef<any>();
  const widgetRef = useRef<any>();
  const { t } = useTranslation();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    if (cloudinaryRef.current) {
      widgetRef.current = cloudinaryRef.current.createUploadWidget(
        {
          cloudName: import.meta.env.VITE_COUDINARY_CLOUD_NAME,
          uploadPreset: import.meta.env.VITE_COUDINARY_PRESET_NAME,
          resourceType: "image",
        },
        (error: CloudinaryError, result: CloudinaryUploadResult) => {
          if (!error && result && result.event === "success") {
            handleInputChange("image_url", result.info.secure_url);
          }
          if (error) {
            console.log(error);
          }
        }
      );
    }
  }, []);

  return (
    <Button variant="outline-primary" onClick={() => widgetRef.current.open()}>
      {t("template.questions.image_choice")}
    </Button>
  );
};

export default UploadComponent;
