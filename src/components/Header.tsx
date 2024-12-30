import { useContext, useState } from "react";
import { Navbar, Nav, Button, Form, FormControl, Stack } from "react-bootstrap";
import LanguageSwitch from "./LanguageSwitch";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { DarkModeContext } from "../contexts/dark_mode/DarkModeContext";
import UserMenu from "./UserMenu";

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { t } = useTranslation();
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    navigate(`/search/${searchQuery}`);
  };
  document.body.style.backgroundColor = darkMode ? "black" : "";
  return (
    <Navbar expand="lg" className="bg-primary px-4 z-1">
      <Stack direction="horizontal" gap={3}>
        <Navbar.Brand href="/">
          <h1 className="fw-bold">Q</h1>
        </Navbar.Brand>
        <i
          className={`bi bi-${darkMode ? "brightness-high" : "moon"}-fill fs-3`}
          onClick={toggleDarkMode}
        />
        <LanguageSwitch />
      </Stack>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mx-auto">
          <Form onSubmit={handleSearch} className="d-flex m-2">
            <FormControl
              type="text"
              placeholder={t("header.search")}
              className="mr-sm-2 border-success"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button variant="danger" type="submit" className="ms-2">
              <i className="bi bi-search" />
            </Button>
          </Form>
        </Nav>
        <Nav className="ml-auto ">
          <UserMenu />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
