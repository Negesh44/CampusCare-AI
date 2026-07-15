import { useEffect, useState } from "react";
import API from "../services/api";

function ManagerDashboard() {

  const [complaints, setComplaints] =
    useState([]);

  useEffect(() => {
    loadComplaints();
  }, []);

  const loadComplaints = async () => {
    try {

      const response =
        await API.get(
          "/api/complaints"
        );

      setComplaints(response.data);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "30px" }}>

      <h1>
        Maintenance Manager Dashboard
      </h1>

      <table
        style={{
          width: "100%",
          marginTop: "20px",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th>Title</th>
            <th>Block</th>
            <th>Floor</th>
            <th>Assigned To</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>

          {complaints.map((c) => (
            <tr key={c.id}>
              <td>{c.title}</td>
              <td>{c.blockName}</td>
              <td>{c.floor}</td>
              <td>{c.assignedTo}</td>
              <td>{c.status}</td>
            </tr>
          ))}

        </tbody>
      </table>

    </div>
  );
}

export default ManagerDashboard;