import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  User,
  LogOut,
} from "lucide-react";

function PrincipalSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
  };

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

  return (
    <div className="principal-sidebar">

      <div>

        <h1>
          CampusCare AI
        </h1>

        <p className="principal-subtitle">
          Principal Portal
        </p>
        
        <div className="principal-menu">

          <Link
            to="/principal"
            style={menuStyle("/principal")}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </Link>

          

          <Link
            to="/principal-profile"
            style={menuStyle("/principal-profile")}
          >
            <User size={20} />
            Profile
          </Link>

        </div>

      </div>

      <div>

        <div className="principal-profile-card">

          <div className="principal-avatar">
            PR
          </div>

          <h3>
            Principal
          </h3>

          <p>
            Administration
          </p>

          <p
            style={{
              fontSize: "12px",
              marginTop: "8px",
            }}
          >
            principal@eec.srmrmp.edu.in
          </p>

        </div>

        <button
          className="principal-logout"
          onClick={logout}
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>

    </div>
  );
}

export default PrincipalSidebar;