
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  LayoutDashboard,
  User,
  LogOut,
} from "lucide-react";

function ManagerSidebar() {
const isMobile = window.innerWidth < 900;   
  const location = useLocation();
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const menuStyle = (path) => ({
  display: "flex",
  alignItems: "center",
  gap: "12px",

  padding: isMobile
    ? "14px"
    : "16px",

  borderRadius: "14px",

  textDecoration: "none",

  color: "white",

  background:
    location.pathname === path
      ? "#2563eb"
      : "transparent",
});

  const handleLogout = () => {

    const confirmLogout =
      window.confirm(
        "Are you sure you want to logout?"
      );

    if (confirmLogout) {
      localStorage.clear();
      navigate("/");
    }
  };

  const getInitials = () => {

    if (!user?.name) return "MM";

    return user.name
      .replace("Dr. ", "")
      .split(" ")
      .map((word) => word[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  return (
   <div
  className="faculty-sidebar"
  style={{
    width: isMobile ? "100%" : "280px",
    minHeight: isMobile ? "auto" : "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  }}
>

      <div>

        <h1>
          CampusCare AI
        </h1>

        <p className="faculty-subtitle">
          Maintenance Manager
        </p>

        <div
          className="faculty-profile-card"
          style={{
  marginTop: "20px",
  marginBottom: "20px",
  padding: isMobile ? "15px" : "20px",
}}
        >
          <div className="faculty-avatar">
            {getInitials()}
          </div>

          <h3>
            {user?.name || "Manager"}
          </h3>

          <p>
            Maintenance Department
          </p>

          <p
            style={{
              fontSize: "12px",
              marginTop: "8px",
              wordBreak: "break-word",
            }}
          >
            {user?.email}
          </p>
        </div>

        <div className="faculty-menu">

          <Link
            to="/manager"
            style={menuStyle("/manager")}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </Link>

          <Link
            to="/manager-profile"
            style={menuStyle(
              "/manager-profile"
            )}
          >
            <User size={20} />
            Profile
          </Link>

        </div>

      </div>

      <button
        className="faculty-logout"
        onClick={handleLogout}
      >
        <LogOut size={18} />
        Logout
      </button>

    </div>
  );
}

export default ManagerSidebar;  