import { useContext, useState } from "react";
import { Button, Offcanvas, Form } from "react-bootstrap";
import { DarkModeContext } from "../../contexts/dark_mode/DarkModeContext";
import { useTranslation } from "react-i18next";

export default function SalesforceConnector() {
  const [show, setShow] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleClose = () => {
    setSuccessMessage("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const { darkMode } = useContext(DarkModeContext);
  const { t } = useTranslation();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const response = await fetch(import.meta.env.VITE_ADD_SALESFORCE_USER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: firstName, email, lastname: lastName }),
      });

      const data = await response.json();
      setSuccessMessage(data.message);
    } catch (error) {
      console.error("Error:", error);
      setSuccessMessage("Something Went Wrong!");
    }
  };

  return (
    <div className="d-flex justify-content-end">
      <Button variant="success" onClick={handleShow} className="mb-3">
        Salesforce
      </Button>

      <Offcanvas
        className={`${darkMode && "bg-dark text-light"}`}
        show={show}
        onHide={handleClose}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            {t("user_panel.salesforce.sidebar.title")}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {successMessage ? (
            <p className="position-absolute top-50 start-50 translate-middle text-center">
              {successMessage}
            </p>
          ) : (
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formFirstName">
                <Form.Label>
                  {t("user_panel.salesforce.sidebar.first_name")}
                </Form.Label>
                <Form.Control
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder={t(
                    "user_panel.salesforce.sidebar.first_name_placeholder"
                  )}
                />
              </Form.Group>

              <Form.Group className="mt-2">
                <Form.Label>
                  {t("user_panel.salesforce.sidebar.last_name")}
                  <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder={t(
                    "user_panel.salesforce.sidebar.last_name_placeholder"
                  )}
                  required
                />
              </Form.Group>

              <Form.Group className="mt-2">
                <Form.Label>
                  {t("user_panel.salesforce.sidebar.email")}
                </Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t(
                    "user_panel.salesforce.sidebar.email_placeholder"
                  )}
                />
              </Form.Group>

              <Button variant="success" type="submit" className="mt-4">
                {t("user_panel.salesforce.sidebar.register_button")}
              </Button>
            </Form>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}
