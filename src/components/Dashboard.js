import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, Outlet, useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useNavigate();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      {console.log(currentUser)}
      <Card>
        <Card.Body>
          {/* {JSON.stringify(currentUser)}{" "} */}
          {currentUser.providerData[0].email}
          <h2 className="mb-4 text-center">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser?.email}
          <Link to="/update-profile" className="mt-3 btn btn-primary w-100">
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className="mt-2 text-center w-100">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  );
};
export default Dashboard;
