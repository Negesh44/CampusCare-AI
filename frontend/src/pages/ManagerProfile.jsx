import ManagerSidebar from "../components/ManagerSidebar";

function ManagerProfile() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const initials = user?.name
    ?.split(" ")
    .map(word => word[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f5f7fb",
      }}
    >
      <ManagerSidebar />

      <div
        style={{
          flex: 1,
          padding: "40px",
        }}
      >
        <h1
          style={{
            marginBottom: "10px",
          }}
        >
          Maintenance Manager Profile
        </h1>

        <p
          style={{
            color: "#64748b",
            marginBottom: "25px",
          }}
        >
          View maintenance manager information and account details.
        </p>

        <div
          style={{
            background: "white",
            padding: "30px",
            borderRadius: "20px",
            boxShadow:
              "0 4px 12px rgba(0,0,0,0.05)",
          }}
        >

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "25px",
              marginBottom: "30px",
            }}
          >
            <div
              style={{
                width: "110px",
                height: "110px",
                borderRadius: "50%",
                background: "#2563eb",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "38px",
                fontWeight: "700",
              }}
            >
              {initials || "MM"}
            </div>

            <div>
              <h2
                style={{
                  marginBottom: "8px",
                }}
              >
                {user?.name}
              </h2>

              <p
                style={{
                  color: "#64748b",
                }}
              >
                Assistant Manager - Maintenance
              </p>
            </div>
          </div>

          <hr />

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(250px,1fr))",
              gap: "20px",
              marginTop: "25px",
            }}
          >

            <div
              style={{
                background: "#f8fafc",
                padding: "18px",
                borderRadius: "12px",
              }}
            >
              <strong>Email</strong>
              <p>{user?.email}</p>
            </div>

            <div
              style={{
                background: "#f8fafc",
                padding: "18px",
                borderRadius: "12px",
              }}
            >
              <strong>Department</strong>
              <p>Maintenance</p>
            </div>

            <div
              style={{
                background: "#f8fafc",
                padding: "18px",
                borderRadius: "12px",
              }}
            >
              <strong>Role</strong>
              <p>Maintenance Manager</p>
            </div>

            <div
              style={{
                background: "#f8fafc",
                padding: "18px",
                borderRadius: "12px",
              }}
            >
              <strong>Employee ID</strong>
              <p>MGR-{user?.id}</p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default ManagerProfile;