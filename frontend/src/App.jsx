import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";

import StudentDashboard from "./pages/StudentDashboard";
import RaiseComplaint from "./pages/RaiseComplaint";
import MyComplaints from "./pages/MyComplaints";
import Profile from "./pages/Profile";

import FacultyDashboard from "./pages/FacultyDashboard";
import FacultyProfile from "./pages/FacultyProfile";

import PrincipalDashboard from "./pages/PrincipalDashboard";
import PrincipalProfile from "./pages/PrincipalProfile";
import ManagerDashboard from "./pages/ManagerDashboard";
import ManagerProfile from "./pages/ManagerProfile";
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
  path="/manager"
  element={<ManagerDashboard />}
/>
    <Route
  path="/manager-profile"
  element={<ManagerProfile />}
/>
        <Route
          path="/principal-profile"
          element={<PrincipalProfile />}
        />
          <Route
  path="*"
  element={<Navigate to="/" replace />}
/>
      </Routes>

    </BrowserRouter>
  );
}

export default App;