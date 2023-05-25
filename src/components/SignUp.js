import React, { useRef, useState } from "react";
import { Card, Button, Form, Alert, Container } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Password do not match");
    }
    try {
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history("/");
    } catch (e) {
      console.log(e.message);
      setError("Failed to create an account");
      setError("");
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
            <h2 className="text-center mb-4">Sign up</h2>
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
              <Form.Group id="password-confirm">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  required
                  ref={passwordConfirmRef}
                ></Form.Control>
              </Form.Group>
              <Button disabled={loading} className="w-100 mt-2" type="submit">
                {" "}
                Sign up
              </Button>
            </Form>
          </Card.Body>
          <div className="w-100 text-center mt-2">
            Already have an account? <Link to="/login">Login </Link>
          </div>
        </Card>
      </div>{" "}
    </Container>
  );
};

export default Signup;
