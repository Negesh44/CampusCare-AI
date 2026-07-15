import ManagerSidebar from "../components/ManagerSidebar";

function ManagerProfile() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

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
        <h1>Manager Profile</h1>

        <div
          style={{
            background: "white",
            padding: "30px",
            borderRadius: "20px",
            marginTop: "20px",
          }}
        >
          <h2>{user?.name}</h2>

          <p>
            <strong>Email:</strong>{" "}
            {user?.email}
          </p>

          <p>
            <strong>Department:</strong>{" "}
            {user?.department}
          </p>

          <p>
            <strong>Role:</strong>{" "}
            {user?.role}
          </p>

          <p>
            <strong>ID:</strong>{" "}
            {user?.id}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ManagerProfile;