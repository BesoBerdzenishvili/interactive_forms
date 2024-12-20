import { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import DismissibleAlert from "../components/Alert";
import supabase from "../config/supabase";
import { CurrentUserContext } from "../contexts/user/UserContext";
import alert from "../utils/alertMessages";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    color: "",
    heading: "",
    text: "",
  });

  const { t } = useTranslation();
  const { login } = useContext(CurrentUserContext);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data, error } = await supabase.from("profiles").select();
    const thisUser = data && data.filter((i) => i.email === email);
    if (!thisUser?.length || thisUser[0].password !== password) {
      setErrorMessage(alert.login.incorrect);
      setShow(true);
      return;
    }
    if (thisUser[0].is_blocked) {
      setErrorMessage(alert.login.blocked);
      setShow(true);
      return;
    }
    if (error) {
      console.error(error);
      setErrorMessage({
        color: "danger",
        heading: "Error!",
        text: error.details,
      });
      setShow(true);
    }
    if (thisUser) {
      login(thisUser[0]);
    }
  };
  return (
    <div className="bg-primary position-absolute top-50 start-50 translate-middle p-3 rounded-3">
      {show && <DismissibleAlert data={errorMessage} setShow={setShow} />}
      <Form onSubmit={handleSubmit}>
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
