import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";

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

        {/* STUDENT */}

        <Route
          path="/student"
          element={
            <ProtectedRoute allowedRole="STUDENT">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/raise-complaint"
          element={
            <ProtectedRoute allowedRole="STUDENT">
              <RaiseComplaint />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-complaints"
          element={
            <ProtectedRoute allowedRole="STUDENT">
              <MyComplaints />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRole="STUDENT">
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* FACULTY */}

        <Route
          path="/faculty"
          element={
            <ProtectedRoute allowedRole="FACULTY">
              <FacultyDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/faculty-profile"
          element={
            <ProtectedRoute allowedRole="FACULTY">
              <FacultyProfile />
            </ProtectedRoute>
          }
        />

        {/* PRINCIPAL */}

        <Route
          path="/principal"
          element={
            <ProtectedRoute allowedRole="PRINCIPAL">
              <PrincipalDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/principal-profile"
          element={
            <ProtectedRoute allowedRole="PRINCIPAL">
              <PrincipalProfile />
            </ProtectedRoute>
          }
        />

        {/* MANAGER */}

        <Route
          path="/manager"
          element={
            <ProtectedRoute allowedRole="MANAGER">
              <ManagerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manager-profile"
          element={
            <ProtectedRoute allowedRole="MANAGER">
              <ManagerProfile />
            </ProtectedRoute>
          }
        />

        {/* INVALID URL */}

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;