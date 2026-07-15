import {
  LayoutDashboard,
  User,
  LogOut,
} from "lucide-react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

function ManagerSidebar() {

  const navigate = useNavigate();

  const logout = () => {

    localStorage.clear();

    navigate("/");
  };

  return (
    <div
      style={{
        width: "260px",
        background: "#03153F",
        color: "white",
        padding: "20px",
      }}
    >
      <h2>
        CampusCare AI
      </h2>

      <p>
        Maintenance Manager
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          marginTop: "30px",
        }}
      >
        <Link
          to="/manager"
          style={{ color: "white" }}
        >
          <LayoutDashboard />
          Dashboard
        </Link>

        <Link
          to="/manager-profile"
          style={{ color: "white" }}
        >
          <User />
          Profile
        </Link>
      </div>

      <button
        onClick={logout}
        style={{
          marginTop: "50px",
        }}
      >
        <LogOut />
        Logout
      </button>
    </div>
  );
}

export default ManagerSidebar;