import { useState } from "react";
import { Navbar, Nav, Button, Badge, Form, FormControl } from "react-bootstrap";
import LanguageSwitch from "./LanguageSwitch";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface HeaderProps {
  currentUser?: string;
}
// make header sticky
const Header: React.FC<HeaderProps> = ({ currentUser = "" }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const { t } = useTranslation();

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Search query:", searchQuery);
    // Add search logic here
  };

  return (
    <Navbar expand="lg" className="bg-primary px-4">
      <Nav className="ml-auto d-flex align-items-center">
        <Navbar.Brand href="/">
          <h1>Q</h1>
        </Navbar.Brand>
        {/* add an actual logo to navigate to the main page '/' */}
        {/* maybe just a big Q as symbol (in dark purple) */}
        <i
          // add different color on toggle
          // or replace it with different icons (moon and stars)
          className="bi bi-lightbulb hand-cursor"
          style={{ fontSize: "1.5rem" }}
        />
        <LanguageSwitch />
      </Nav>
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
          {currentUser ? (
            <h3 className="px-3">
              <Badge pill bg="danger" className="pb-2">
                {currentUser}
              </Badge>
            </h3>
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
