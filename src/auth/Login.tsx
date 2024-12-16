import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="bg-primary position-absolute top-50 start-50 translate-middle p-3 rounded-3">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <br />
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <br />
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <div className="d-flex justify-content-between mt-4">
          <Button variant="outline-light" type="submit">
            Login
          </Button>
          <Link to="/registration">
            <Button variant="outline-light">Register</Button>
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default Login;
