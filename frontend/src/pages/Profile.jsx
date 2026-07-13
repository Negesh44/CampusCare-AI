import Sidebar from "../components/Sidebar";


function Profile() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="main-content">
        

        <div
          style={{
            padding: "30px",
          }}
        >
          <h1
            style={{
              fontSize: "32px",
              fontWeight: "700",
              marginBottom: "8px",
            }}
          >
            Student Profile
          </h1>

          <p
            style={{
              color: "#6b7280",
              marginBottom: "30px",
            }}
          >
            View and manage your personal information.
          </p>

          <div
            style={{
              background: "#ffffff",
              borderRadius: "20px",
              padding: "30px",
              boxShadow:
                "0 4px 12px rgba(0,0,0,0.05)",
            }}
          >
            {/* Profile Header */}
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
                  width: "90px",
                  height: "90px",
                  borderRadius: "50%",
                  background: "#2563eb",
                  color: "#ffffff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "32px",
                  fontWeight: "700",
                }}
              >
               {user?.name
  ?.split(" ")
  .map(n => n[0])
  .join("")
  .substring(0,2)}
              </div>

              <div>
                <h2
                  style={{
                    margin: 0,
                    fontSize: "32px",
                  }}
                >
                  {user?.name}
                </h2>

                <p
                  style={{
                    margin: 0,
                    color: "#6b7280",
                    fontSize: "18px",
                  }}
                >
                  B.E Computer Science &
                  Engineering (Artificial
                  Intelligence and Machine
                  Learning)
                </p>
              </div>
            </div>

            <hr />

            {/* Student Information */}
            <h3
              style={{
                marginTop: "30px",
                marginBottom: "20px",
                fontSize: "24px",
              }}
            >
              Student Information
            </h3>

            <div
              style={{
                lineHeight: "2.4",
                fontSize: "17px",
              }}
            >
              <p>
                <strong>
                  Register Number:
                </strong>{" "}
                23AIML001
              </p>

              <p>
                <strong>
                  Department:
                </strong>{" "}
                CSE (AIML)
              </p>

              <p>
                <strong>Year:</strong>{" "}
                III Year
              </p>  

              <p>
                <strong>
                  College Email:
                </strong>{" "}
                {user?.email}
              </p>

              <p>
                <strong>
                  Contact Number:
                </strong>{" "}
                +91 XXXXX XXXXX
              </p>
            </div>

            {/* Account Information */}
            <h3
              style={{
                marginTop: "35px",
                marginBottom: "20px",
                fontSize: "24px",
              }}
            >
              Account Information
            </h3>

            <div
              style={{
                lineHeight: "2.4",
                fontSize: "17px",
              }}
            >
              <p>
                <strong>Role:</strong>{" "}
                Student
              </p>

              <p>
                <strong>Status:</strong>{" "}
                Active
              </p>

              <p>
                <strong>
                  Last Login:
                </strong>{" "}
                Today
              </p>

              <p>
                <strong>
                  Platform:
                </strong>{" "}
                CampusCare AI
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;