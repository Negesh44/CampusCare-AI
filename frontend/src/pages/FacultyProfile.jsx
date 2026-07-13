import FacultySidebar from "../components/FacultySidebar";

function FacultyProfile() {
  const isMobile = window.innerWidth < 900;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        minHeight: "100vh",
        background: "#f5f7fb",
      }}
    >
      <FacultySidebar />

      <div
        style={{
          flex: 1,
          padding: isMobile ? "15px" : "40px",
        }}
      >
        <h1
          style={{
            marginBottom: "10px",
            fontSize: isMobile ? "28px" : "36px",
          }}
        >
          Faculty Profile
        </h1>

        <p
          style={{
            color: "#64748b",
            marginBottom: "30px",
          }}
        >
          View faculty information and department details.
        </p>

        <div
          style={{
            background: "white",
            borderRadius: "20px",
            padding: isMobile ? "20px" : "30px",
            boxShadow:
              "0 4px 12px rgba(0,0,0,0.05)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              alignItems: "center",
              gap: "20px",
              marginBottom: "30px",
              textAlign: isMobile ? "center" : "left",
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
              FC
            </div>

            <div>
              <h2>Faculty C</h2>
              <p>Electrical Department</p>
            </div>
          </div>

          <hr />

          <div
            style={{
              marginTop: "25px",
              display: "grid",
              gap: "15px",
              fontSize: isMobile ? "16px" : "18px",
            }}
          >
            <div>
              <strong>Name:</strong> Faculty C
            </div>

            <div>
              <strong>Email:</strong>{" "}
              facultyc@eec.srmrmp.edu.in
            </div>

            <div>
              <strong>Department:</strong>{" "}
              Electrical
            </div>

            <div>
              <strong>Role:</strong> Faculty
            </div>

            <div>
              <strong>Employee ID:</strong>{" "}
              FAC001
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FacultyProfile;