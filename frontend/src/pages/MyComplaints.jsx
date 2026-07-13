import { useEffect, useState } from "react";
import API from "../services/api";

import Sidebar from "../components/Sidebar";

function MyComplaints() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    loadComplaints();
  }, []);

  const loadComplaints = async () => {
    try {
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      const response = await API.get(
        `/api/complaints/student/${user.id}`
      );

      setComplaints(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "OPEN":
        return (
          <span
            style={{
              background: "#fef3c7",
              color: "#92400e",
              padding: "6px 12px",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: "600",
            }}
          >
            🟡 Open
          </span>
        );

      case "IN_PROGRESS":
        return (
          <span
            style={{
              background: "#dbeafe",
              color: "#1d4ed8",
              padding: "6px 12px",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: "600",
            }}
          >
            🔵 In Progress
          </span>
        );

      case "RESOLVED":
        return (
          <span
            style={{
              background: "#dcfce7",
              color: "#166534",
              padding: "6px 12px",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: "600",
            }}
          >
            🟢 Resolved
          </span>
        );

      default:
        return status;
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="main-content">
        <div
          style={{
            padding: "20px",
            height: "calc(100vh - 90px)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h1
            style={{
              fontSize: "32px",
              fontWeight: "700",
              marginBottom: "8px",
            }}
          >
            Request History
          </h1>

          <p
            style={{
              color: "#6b7280",
              marginBottom: "20px",
            }}
          >
            View and track all submitted service requests.
          </p>

          <div
            style={{
              background: "#ffffff",
              borderRadius: "16px",
              padding: "20px",
              flex: 1,
              overflowY: "auto",
              overflowX: "auto",
              boxShadow:
                "0 4px 12px rgba(0,0,0,0.05)",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                border: "1px solid #e5e7eb",
              }}
            >
              <thead
                style={{
                  position: "sticky",
                  top: 0,
                  background: "#ffffff",
                  zIndex: 1,
                }}
              >
                <tr>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "15px",
                      border: "1px solid #e5e7eb",
                    }}
                  >
                    Title
                  </th>

                  <th
                    style={{
                      textAlign: "left",
                      padding: "15px",
                      border: "1px solid #e5e7eb",
                    }}
                  >
                    Category
                  </th>

                  <th
                    style={{
                      textAlign: "left",
                      padding: "15px",
                      border: "1px solid #e5e7eb",
                    }}
                  >
                    Block
                  </th>

                  <th
                    style={{
                      textAlign: "left",
                      padding: "15px",
                      border: "1px solid #e5e7eb",
                    }}
                  >
                    Priority
                  </th>

                  <th
                    style={{
                      textAlign: "left",
                      padding: "15px",
                      border: "1px solid #e5e7eb",
                    }}
                  >
                    Status
                  </th>

                  <th
                    style={{
                      textAlign: "left",
                      padding: "15px",
                      border: "1px solid #e5e7eb",
                    }}
                  >
                    Assigned Faculty
                  </th>

                  <th
                    style={{
                      textAlign: "left",
                      padding: "15px",
                      border: "1px solid #e5e7eb",
                    }}
                  >
                    Date & Time
                  </th>
                </tr>
              </thead>

              <tbody>
                {complaints.map((c) => (
                  <tr key={c.id}>
                    <td
                      style={{
                        padding: "15px",
                        border: "1px solid #e5e7eb",
                      }}
                    >
                      {c.title}
                    </td>

                    <td
                      style={{
                        padding: "15px",
                        border: "1px solid #e5e7eb",
                      }}
                    >
                      {c.category}
                    </td>

                    <td
                      style={{
                        padding: "15px",
                        border: "1px solid #e5e7eb",
                      }}
                    >
                      {c.blockName}
                    </td>

                    <td
                      style={{
                        padding: "15px",
                        border: "1px solid #e5e7eb",
                      }}
                    >
                      {c.priority}
                    </td>

                    <td
                      style={{
                        padding: "15px",
                        border: "1px solid #e5e7eb",
                      }}
                    >
                      {getStatusBadge(c.status)}
                    </td>

                    <td
                      style={{
                        padding: "15px",
                        border: "1px solid #e5e7eb",
                      }}
                    >
                      {c.assignedFacultyName || "Not Assigned"}
                    </td>

                    <td
                      style={{
                        padding: "15px",
                        border: "1px solid #e5e7eb",
                      }}
                    >
                      {c.createdAt
                        ? new Date(
                            c.createdAt
                          ).toLocaleString()
                        : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {complaints.length === 0 && (
              <p
                style={{
                  textAlign: "center",
                  padding: "40px",
                  color: "#6b7280",
                }}
              >
                No service requests found.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyComplaints;