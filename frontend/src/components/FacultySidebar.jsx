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

function FacultySidebar() {

  const location = useLocation();
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const menuStyle = (path) => ({
    display: "flex",
    alignItems: "center",
    gap: "12px",

    padding: "16px",

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

    if (!user?.name) return "FC";

    return user.name
      .replace("Dr. ", "")
      .split(" ")
      .map((word) => word[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  return (
    <div className="faculty-sidebar">

      <div>

        <h1>
          CampusCare AI
        </h1>

        <p className="faculty-subtitle">
          Faculty Portal
        </p>

        <div className="faculty-menu">

          <Link
            to="/faculty"
            style={menuStyle("/faculty")}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </Link>

          <Link
            to="/faculty-profile"
            style={menuStyle(
              "/faculty-profile"
            )}
          >
            <User size={20} />
            Profile
          </Link>

        </div>

      </div>

      <div>

        <div className="faculty-profile-card">

          <div className="faculty-avatar">
            {getInitials()}
          </div>

          <h3>
            {user?.name || "Faculty"}
          </h3>

          <p>
            {user?.assignedLocation ||
              "Location Not Assigned"}
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

        <button
          className="faculty-logout"
          onClick={handleLogout}
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>

    </div>
  );
}

export default FacultySidebar;