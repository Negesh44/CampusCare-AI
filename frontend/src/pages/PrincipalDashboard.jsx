import Sidebar from "../components/Sidebar";

function PrincipalDashboard() {
  return (
    <div>
      <Sidebar />

      <div style={{ marginLeft: "260px" }}>
        <h1>Principal Dashboard</h1>

        <h3>Total Complaints : 50</h3>
        <h3>Resolved : 30</h3>
        <h3>Pending : 20</h3>
      </div>
    </div>
  );
}

export default PrincipalDashboard;