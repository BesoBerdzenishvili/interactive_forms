import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface FullScreenOverlayProps {
  show: boolean;
  onHide: () => void;
}

export default function FullScreenOverlay({
  show,
  onHide,
}: FullScreenOverlayProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const onClose = () => {
    navigate("/");
    onHide();
  };
  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="text-center"
    >
      <Modal.Header>
        <Modal.Title>{t("template.overlay.title")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{t("template.overlay.message")}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button className="self-center" onClick={onClose}>
          {t("template.overlay.button")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
