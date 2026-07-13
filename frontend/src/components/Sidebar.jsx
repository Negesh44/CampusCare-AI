import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";



import {
  LayoutDashboard,
  ClipboardPlus,
  FileText,
  User,
  LogOut,
} from "lucide-react";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

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
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (confirmLogout) {
      localStorage.clear();
      navigate("/");
    }
  };

return (
  <div
    className="sidebar"
    style={{
      background: "#03153F",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "24px",
    }}
  >
    <div>

      <h1
        style={{
          color: "white",
          marginBottom: "5px",
        }}
      >
        CampusCare AI
      </h1>

      <p
        style={{
          color: "#cbd5e1",
          marginBottom: "40px",
        }}
      >
        Easwari Engineering College
      </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >

          <Link
            to="/student"
            style={menuStyle("/student")}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </Link>

          <Link
            to="/raise-complaint"
            style={menuStyle(
              "/raise-complaint"
            )}
          >
            <ClipboardPlus size={20} />
            Raise Complaint
          </Link>

          <Link
            to="/my-complaints"
            style={menuStyle(
              "/my-complaints"
            )}
          >
            <FileText size={20} />
            My Complaints
          </Link>

          <Link
            to="/profile"
            style={menuStyle("/profile")}
          >
            <User size={20} />
            Profile
          </Link>

        </div>
      </div>

      <button
        onClick={handleLogout}
        style={{
          border: "none",
          background: "#ef4444",
          color: "white",

          padding: "16px",

          borderRadius: "14px",

          fontSize: "16px",

          cursor: "pointer",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <LogOut size={18} />
        Logout
      </button>

    </div>
);
}

export default Sidebar;