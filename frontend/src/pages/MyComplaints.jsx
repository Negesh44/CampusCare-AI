import { useEffect, useState } from "react";
import API from "../services/api";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function MyComplaints() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    loadComplaints();
  }, []);

  const loadComplaints = async () => {
    try {
      const response = await API.get(
        "/api/complaints"
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
            Awaiting Review
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
            In Progress
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
            Resolved
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
        <Topbar />

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
            View and track all submitted
            service requests.
          </p>

          <div
            style={{
              background: "#ffffff",
              borderRadius: "16px",
              padding: "20px",
              flex: 1,
              overflowY: "auto",
              boxShadow:
                "0 4px 12px rgba(0,0,0,0.05)",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
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
                <tr
                  style={{
                    borderBottom:
                      "1px solid #e5e7eb",
                  }}
                >
                  <th
                    style={{
                      textAlign: "left",
                      padding: "15px",
                    }}
                  >
                    Title
                  </th>

                  <th
                    style={{
                      textAlign: "left",
                      padding: "15px",
                    }}
                  >
                    Category
                  </th>

                  <th
                    style={{
                      textAlign: "left",
                      padding: "15px",
                    }}
                  >
                    Block
                  </th>

                  <th
                    style={{
                      textAlign: "left",
                      padding: "15px",
                    }}
                  >
                    Priority
                  </th>

                  <th
                    style={{
                      textAlign: "left",
                      padding: "15px",
                    }}
                  >
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {complaints.map((c) => (
                  <tr
                    key={c.id}
                    style={{
                      borderBottom:
                        "1px solid #f3f4f6",
                    }}
                  >
                    <td
                      style={{
                        padding: "15px",
                      }}
                    >
                      {c.title}
                    </td>

                    <td
                      style={{
                        padding: "15px",
                      }}
                    >
                      {c.category}
                    </td>

                    <td
                      style={{
                        padding: "15px",
                      }}
                    >
                      {c.blockName}
                    </td>

                    <td
                      style={{
                        padding: "15px",
                      }}
                    >
                      {c.priority}
                    </td>

                    <td
                      style={{
                        padding: "15px",
                      }}
                    >
                      {getStatusBadge(
                        c.status
                      )}
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