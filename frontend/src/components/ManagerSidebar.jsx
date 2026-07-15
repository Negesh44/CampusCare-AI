
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
  className="principal-sidebar"
  style={{
    width: isMobile ? "100%" : "280px",
    height: isMobile ? "auto" : "100vh",
    minHeight: isMobile ? "auto" : "100vh",
    display: "flex",
    flexDirection: "column",
    flexShrink: 0,
  }}
>

      <div>

        <h1>
          CampusCare AI
        </h1>
<p className="principal-subtitle">
          Maintenance Manager
        </p>

       

        <div className="principal-menu">

          <Link
            to="/manager"
            style={menuStyle("/manager")}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </Link>


        </div>

      </div>

      <button
  className="principal-logout"
        onClick={handleLogout}
      >
        <LogOut size={18} />
        Logout
      </button>

    </div>
  );
}

export default ManagerSidebar;  