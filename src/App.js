import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";
import { Container } from "react-bootstrap";
import PrivateRoute from "./interceptors/PrivateRoute";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import Layouts from "./layouts/Layouts";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import FamilyList from "./views/FamilyList";

function App() {
  return (
    // <BrowserRouter>
    <div>
      {/* <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      > */}
      <div className="w-100">
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route exact path="/" element={<PrivateRoute />}>
                <Route exact path="/" element={<Layouts />}>
                  <Route path="/home" element={<FamilyList />} />
                  <Route path="/" element={<Navigate to="/home" />} />{" "}
                  {/* Redirect all other routes to the root */}
                </Route>
              </Route>
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />
            </Routes>
          </BrowserRouter>
          {/* <Routes>
              <Route exact path="/" element={<PrivateRoute />}>
                <Route exact path="/" element={<Dashboard />} />
              </Route>
              <Route path="/login" element={<Login />} />

              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />

              <Route path="/update-profile" element={<PrivateRoute />}>
                <Route path="/update-profile" element={<UpdateProfile />} />
              </Route>
            </Routes> */}
        </AuthProvider>
      </div>
      {/* </Container> */}
    </div>
    // </BrowserRouter>
  );
}

export default App;
