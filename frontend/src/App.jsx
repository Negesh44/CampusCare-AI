import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";

import StudentDashboard from "./pages/StudentDashboard";
import RaiseComplaint from "./pages/RaiseComplaint";
import MyComplaints from "./pages/MyComplaints";
import Profile from "./pages/Profile";

import FacultyDashboard from "./pages/FacultyDashboard";
import FacultyProfile from "./pages/FacultyProfile";

import PrincipalDashboard from "./pages/PrincipalDashboard";
import PrincipalProfile from "./pages/PrincipalProfile";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/student"
          element={<StudentDashboard />}
        />
        

        <Route
          path="/raise-complaint"
          element={<RaiseComplaint />}
        />

        <Route
          path="/my-complaints"
          element={<MyComplaints />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/faculty"
          element={<FacultyDashboard />}
        />

        <Route
          path="/faculty-profile"
          element={<FacultyProfile />}
        />

        <Route
          path="/principal"
          element={<PrincipalDashboard />}
        />

        <Route
          path="/principal-profile"
          element={<PrincipalProfile />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;