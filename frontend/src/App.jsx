import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import RaiseComplaint from "./pages/RaiseComplaint";
import MyComplaints from "./pages/MyComplaints";

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

      </Routes>
    </BrowserRouter>
  );
}

export default App;