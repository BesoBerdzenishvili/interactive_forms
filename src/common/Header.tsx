import { useState } from "react";
import { Navbar, Nav, Button, Badge, Form, FormControl } from "react-bootstrap";

interface HeaderProps {
  currentUser?: string;
}

const Header: React.FC<HeaderProps> = ({ currentUser = "" }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Search query:", searchQuery);
    // Add search logic here
  };

  return (
    <Navbar expand="lg" className="bg-primary px-4">
      <Navbar.Brand href="#home">
        <i
          // add different color on toggle
          // or replace it with different icons (moon and stars)
          className="bi bi-lightbulb hand-cursor"
          style={{ fontSize: "1.5rem" }}
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mx-auto">
          <Form onSubmit={handleSearch} className="d-flex">
            <FormControl
              type="text"
              placeholder="Search..."
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
              <Button variant="warning" className="me-2">
                Register
              </Button>
              <Button variant="warning">Login</Button>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
