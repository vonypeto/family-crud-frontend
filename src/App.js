import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./interceptors/PrivateRoute";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import Layouts from "./layouts/Layouts";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import FamilyList from "./views/FamilyList";
import FamilyPreview from "./views/FamilyPreview";

function App() {
  return (
    <div>
      <div className="w-100">
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route exact path="/" element={<PrivateRoute />}>
                <Route exact path="/" element={<Layouts />}>
                  <Route path="/home" element={<FamilyList />} />{" "}
                  <Route path="/home/:id" element={<FamilyPreview />} />{" "}
                  <Route path="/" element={<Navigate to="/home" />} />{" "}
                  {/* Redirect all other routes to the root */}
                </Route>
              </Route>
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </div>
    </div>
  );
}

export default App;
