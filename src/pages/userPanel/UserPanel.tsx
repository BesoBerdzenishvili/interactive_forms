import { useContext, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/user/UserContext";
import UserTemplates from "./UserTemplates";
import FilledForms from "./FilledForms";
import SalesforceConnector from "./SalesforceConnector";
import JiraTickets from "./JiraTickets";

const UserPanel: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    if (!currentUser.name) {
      navigate("/");
    }
  }, [currentUser.name]);
  return (
    <Container className="pt-4">
      <div className="d-flex justify-content-end align-items-center">
        <SalesforceConnector />
        <JiraTickets />
      </div>
      <Row className="mb-4">
        <UserTemplates />
        <FilledForms />
      </Row>
    </Container>
  );
};

export default UserPanel;
