import "./Topbar.css";
import { Bell } from "lucide-react";

function Topbar() {
  return (
    <div className="topbar">

      <div className="topbar-title">

        <h2>
          Campus Service Portal
        </h2>

        <p>
          Manage service requests, monitor issue resolution,
          and stay informed about institutional updates and
          campus maintenance activities.
        </p>

      </div>

      <div className="topbar-right">

        <div className="notification-icon">

          <Bell size={22} />

          <span className="notification-badge">
            3
          </span>

        </div>

        <div className="profile-wrapper">

          <div className="profile-circle">
            NB
          </div>

          <div className="profile-info">

            <h4>
             {user?.name}
            </h4>

            <p>
              Student • CSE (AIML)
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Topbar;