import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { t } = useTranslation();
  // use context for currentUser
  return (
    <div className="bg-primary position-absolute top-50 start-50 translate-middle p-3 rounded-3">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>{t("login.email")}</Form.Label>
          <br />
          <Form.Control
            type="email"
            placeholder={t("login.email_placeholder")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>{t("login.password")}</Form.Label>
          <br />
          <Form.Control
            type="password"
            placeholder={t("login.password_placeholder")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <div className="d-flex justify-content-between mt-4">
          <Button variant="outline-light" type="submit">
            {t("login.login")}
          </Button>
          <Link to="/registration">
            <Button variant="outline-light">{t("login.register")}</Button>
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default Login;
