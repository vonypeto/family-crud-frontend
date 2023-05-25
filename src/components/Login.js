import React, { useRef, useState } from "react";
import { Card, Button, Form, Alert, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history("/");
    } catch {
      setError("Failed to log in");
    }

    setLoading(false);
  }
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Login In</h2>
            {/* {JSON.stringify(currentUser)} */}

            <Form onSubmit={handleSubmit}>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  required
                  ref={emailRef}
                ></Form.Control>
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  required
                  ref={passwordRef}
                ></Form.Control>
              </Form.Group>

              <Button disabled={loading} className="w-100 mt-2" type="submit">
                {" "}
                Login
              </Button>
            </Form>
          </Card.Body>
          <div className="w-100 text-center mt-2 mb-2">
            <Link to="/forgot-password">Forgot Password</Link>
          </div>
        </Card>
        <div className="w-100 text-center mt-2">
          Need an account? <Link to="/signup">Sign up </Link>
        </div>
      </div>
    </Container>
  );
};

export default Login;
