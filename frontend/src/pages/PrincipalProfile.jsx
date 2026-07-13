import PrincipalSidebar from "../components/PrincipalSidebar";

import "../styles/PrincipalDashboard.css";

function PrincipalProfile() {
  return (
    <div className="principal-container">

      <PrincipalSidebar />

      <div className="principal-main">

        <div className="principal-header">

          <h1>
            Principal Profile
          </h1>

          <p>
            View principal information and administration details.
          </p>

        </div>

        <div className="recent-card">

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              marginBottom: "30px",
            }}
          >

            <div
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                background: "#2563eb",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "36px",
                fontWeight: "700",
              }}
            >
              PR
            </div>

            <div>

              <h2
                style={{
                  margin: 0,
                }}
              >
                Dr. Deiva Sundari
              </h2>

              <p
                style={{
                  color: "#64748b",
                  marginTop: "8px",
                }}
              >
                Administration Department
              </p>

            </div>

          </div>

          <hr />

          <div
            style={{
              marginTop: "30px",
              display: "grid",
              gap: "18px",
            }}
          >

            <div>
              <strong>Name:</strong>
              {" "}Dr. Deiva Sundari
            </div>

            <div>
              <strong>Email:</strong>
              {" "}principal@eec.srmrmp.edu.in
            </div>

            <div>
              <strong>Department:</strong>
              {" "}Administration
            </div>

            <div>
              <strong>Role:</strong>
              {" "}Dr. Deiva Sundari
            </div>

            <div>
              <strong>Employee ID:</strong>
              {" "}PRN001
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default PrincipalProfile;