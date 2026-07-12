import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div
      style={{
        textAlign: "center",
        paddingTop: "100px"
      }}
    >
      <h1>CampusCare AI</h1>

      <p>
        Smart Campus Maintenance &
        Complaint Management System
      </p>

      <Link to="/student">
        <button>Enter System</button>
      </Link>
    </div>
  );
}

export default LandingPage;