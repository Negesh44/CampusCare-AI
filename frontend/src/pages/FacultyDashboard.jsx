import Sidebar from "../components/Sidebar";

function FacultyDashboard() {
  return (
    <div>
      <Sidebar />

      <div style={{ marginLeft: "260px" }}>
        <h1>Faculty Dashboard</h1>

        <table border="1">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>1</td>
              <td>Water Leakage</td>
              <td>OPEN</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FacultyDashboard;