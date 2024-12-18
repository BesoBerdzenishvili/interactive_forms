import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const NoAccess = () => {
  const { t } = useTranslation();
  return (
    <Container
      fluid
      className="vh-100 d-flex flex-column align-items-center justify-content-center text-center"
    >
      <h1 className="display-1 fw-bold">403</h1>
      <h2 className="text-secondary">{t("no_access.title")}</h2>
      <p className="text-secondary">{t("no_access.message")}</p>
    </Container>
  );
};

export default NoAccess;
