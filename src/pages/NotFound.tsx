import { Container, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Container
      fluid
      className="vh-100 d-flex flex-column align-items-center justify-content-center text-center"
    >
      <h1 className="display-1 fw-bold">404</h1>
      <h2 className="text-secondary">{t("not_found.title")}</h2>
      <p className="text-secondary">{t("not_found.message")}</p>
      <Link to="/">
        <Button href="/" variant="outline-primary" className="mt-3">
          {t("not_found.button")}
        </Button>
      </Link>
    </Container>
  );
};

export default NotFound;
