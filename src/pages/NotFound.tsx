import { Container, Button } from "react-bootstrap";

const NotFound: React.FC = () => {
  return (
    <Container
      fluid
      // use bg-light for dark mode
      className="vh-100 d-flex flex-column align-items-center justify-content-center bg-light text-center"
    >
      <h1 className="display-1 fw-bold">404</h1>
      <h2 className="text-secondary">Page Not Found</h2>
      <p className="text-muted">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Button href="/" variant="outline-primary" className="mt-3">
        Go Back Home
      </Button>
    </Container>
  );
};

export default NotFound;
