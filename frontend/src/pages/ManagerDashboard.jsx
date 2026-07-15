import { useEffect, useState } from "react";
import API from "../services/api";
import ManagerSidebar from "../components/ManagerSidebar";

function ManagerDashboard() {
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
          padding: "30px",
        }}
      >
        <h1
          style={{
            marginBottom: "10px",
            fontSize: "32px",
            color: "#111827",
          }}
        >
          Maintenance Manager Dashboard
        </h1>

        <p
          style={{
            color: "#64748b",
            marginBottom: "25px",
          }}
        >
          Monitor all complaints and faculty assignments.
        </p>

        <div
          style={{
            background: "white",
            borderRadius: "20px",
            padding: "20px",
            boxShadow:
              "0 4px 12px rgba(0,0,0,.05)",
          }}
        >
          <h2
            style={{
              marginBottom: "20px",
            }}
          >
            All Complaints
          </h2>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr
                style={{
                  background: "#f8fafc",
                }}
              >
                <th
                  style={{
                    padding: "14px",
                    textAlign: "left",
                  }}
                >
                  Title
                </th>

                <th
                  style={{
                    padding: "14px",
                    textAlign: "left",
                  }}
                >
                  Block
                </th>

                <th
                  style={{
                    padding: "14px",
                    textAlign: "left",
                  }}
                >
                  Floor
                </th>

                <th
                  style={{
                    padding: "14px",
                    textAlign: "left",
                  }}
                >
                  Assigned To
                </th>

                <th
                  style={{
                    padding: "14px",
                    textAlign: "left",
                  }}
                >
                  Priority
                </th>

                <th
                  style={{
                    padding: "14px",
                    textAlign: "left",
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
                      "1px solid #e5e7eb",
                  }}
                >
                  <td
                    style={{
                      padding: "14px",
                    }}
                  >
                    {c.title}
                  </td>

                  <td
                    style={{
                      padding: "14px",
                    }}
                  >
                    {c.blockName}
                  </td>

                  <td
                    style={{
                      padding: "14px",
                    }}
                  >
                    {c.floor}
                  </td>

                  <td
                    style={{
                      padding: "14px",
                    }}
                  >
                    {c.assignedTo ||
                      "Not Assigned"}
                  </td>

                  <td
                    style={{
                      padding: "14px",
                    }}
                  >
                    <span
                      style={{
                        padding:
                          "6px 12px",
                        borderRadius:
                          "20px",
                        fontSize: "12px",
                        fontWeight: "700",
                        background:
                          c.priority ===
                          "HIGH"
                            ? "#fee2e2"
                            : c.priority ===
                              "MEDIUM"
                            ? "#fef3c7"
                            : "#dcfce7",
                        color:
                          c.priority ===
                          "HIGH"
                            ? "#dc2626"
                            : c.priority ===
                              "MEDIUM"
                            ? "#d97706"
                            : "#16a34a",
                      }}
                    >
                      {c.priority}
                    </span>
                  </td>

                  <td
                    style={{
                      padding: "14px",
                    }}
                  >
                    <span
                      style={{
                        padding:
                          "6px 12px",
                        borderRadius:
                          "20px",
                        fontSize: "12px",
                        fontWeight: "700",
                        background:
                          c.status ===
                          "OPEN"
                            ? "#fef3c7"
                            : c.status ===
                              "IN_PROGRESS"
                            ? "#dbeafe"
                            : "#dcfce7",
                        color:
                          c.status ===
                          "OPEN"
                            ? "#b45309"
                            : c.status ===
                              "IN_PROGRESS"
                            ? "#2563eb"
                            : "#16a34a",
                      }}
                    >
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ManagerDashboard;