import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../config/supabase";
import DismissibleAlert from "../components/Alert";

interface RegistrationForm {
  name: string;
  email: string;
  password: string;
}

const Registration: React.FC = () => {
  const [formData, setFormData] = useState<RegistrationForm>({
    name: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    color: "",
    heading: "",
    text: "",
  });
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  const { t } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from("profiles").insert(formData);
      if (error) {
        setErrorMessage({
          color: "danger",
          heading: "Error!",
          text: error.details,
        });
        setShow(true);
      }
      !error && navigate("/login");
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="bg-primary position-absolute top-50 start-50 translate-middle p-3 rounded-3">
      {show && <DismissibleAlert data={errorMessage} setShow={setShow} />}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>{t("registration.name")}</Form.Label>
          <br />
          <Form.Control
            type="text"
            placeholder={t("registration.name_placeholder")}
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>{t("registration.email")}</Form.Label>
          <br />
          <Form.Control
            type="email"
            placeholder={t("registration.email_placeholder")}
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>{t("registration.password")}</Form.Label>
          <br />
          <Form.Control
            type="password"
            placeholder={t("registration.password_placeholder")}
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <div className="d-flex justify-content-between mt-4">
          <Button variant="outline-light" type="submit">
            {t("registration.register")}
          </Button>
          <Link to="/login">
            <Button variant="outline-light">{t("registration.login")}</Button>
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default Registration;
