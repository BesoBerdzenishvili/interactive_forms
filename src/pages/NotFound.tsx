import { Container, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const NotFound: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Container
      fluid
      // use bg-light for dark mode
      className="vh-100 d-flex flex-column align-items-center justify-content-center bg-light text-center"
    >
      <h1 className="display-1 fw-bold">404</h1>
      <h2 className="text-secondary">{t("not_found.title")}</h2>
      <p className="text-muted">{t("not_found.message")}</p>
      <Button href="/" variant="outline-primary" className="mt-3">
        {t("not_found.button")}
      </Button>
    </Container>
  );
};

export default NotFound;
