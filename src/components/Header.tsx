import { useContext, useState } from "react";
import {
  Navbar,
  Nav,
  Button,
  Badge,
  Form,
  FormControl,
  Stack,
} from "react-bootstrap";
import LanguageSwitch from "./LanguageSwitch";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../contexts/dark_mode/DarkModeContext";
import { CurrentUserContext } from "../contexts/user/UserContext";

interface HeaderProps {
  currentUser?: string;
}
// make header sticky (sticky-top)
const Header: React.FC<HeaderProps> = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { t } = useTranslation();
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const { currentUser, logout } = useContext(CurrentUserContext);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Search query:", searchQuery);
    // Add search logic here
  };
  document.body.style.backgroundColor = darkMode ? "black" : "";
  return (
    <Navbar expand="lg" className="bg-primary px-4">
      <Stack direction="horizontal" gap={3}>
        <Navbar.Brand href="/">
          <h1>Q</h1>
        </Navbar.Brand>
        <i
          className={`bi bi-${darkMode ? "brightness-high" : "moon"}-fill`}
          style={{ fontSize: "1.5rem" }}
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
        <Nav className="ml-auto">
          {currentUser.name ? (
            <Stack direction="horizontal" gap={3}>
              <h3 className="px-3">
                <Link to="/user-panel">
                  <Badge pill bg="danger" className="pb-2">
                    {currentUser.name}
                  </Badge>
                </Link>
              </h3>
              {/* if Link has bad spacing use Button */}
              {currentUser.is_admin && (
                <Link to="/admin-panel">Admin Panel</Link>
              )}
              <Button onClick={logout}>Logout</Button>
            </Stack>
          ) : (
            <>
              <Link to="/registration">
                <Button variant="warning" className="m-1">
                  {t("header.register")}
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="warning" className="m-1">
                  {t("header.login")}
                </Button>
              </Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
