import { useEffect, useState } from "react";
import API from "../services/api";
import ManagerSidebar from "../components/ManagerSidebar";

function ManagerDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [searchTerm, setSearchTerm] =
  useState("");
  const [statusFilter, setStatusFilter] =
  useState("ALL");
const isMobile =
  window.innerWidth < 900;
 useEffect(() => {
  loadComplaints();
}, []);
const [currentPage, setCurrentPage] =
  useState(1);

const complaintsPerPage = 8;
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
  const updateStatus = async (
  complaintId,
  newStatus
) => {

  try {

    await API.put(
      `/api/complaints/${complaintId}/status?status=${newStatus}`
    );

    loadComplaints();

  } catch (error) {

    console.error(error);

    alert(
      "Failed to update status"
    );
  }
};
const total = complaints.length;

const open = complaints.filter(
  (c) => c.status === "OPEN"
).length;

const progress = complaints.filter(
  (c) => c.status === "IN_PROGRESS"
).length;

const resolved = complaints.filter(
  (c) => c.status === "RESOLVED"
).length;
const indexOfLastComplaint =
  currentPage * complaintsPerPage;

const indexOfFirstComplaint =
  indexOfLastComplaint -
  complaintsPerPage;

const filteredComplaints =
  complaints.filter((c) => {

    const matchesSearch =
      c.title
        ?.toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        ) ||
      c.category
        ?.toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        ) ||
      c.blockName
        ?.toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        );

    const matchesStatus =
      statusFilter === "ALL"
        ? true
        : c.status === statusFilter;

    return (
      matchesSearch &&
      matchesStatus
    );
  });

const currentComplaints =
  filteredComplaints.slice(
    indexOfFirstComplaint,
    indexOfLastComplaint
  );

const totalPages =
  Math.ceil(
    filteredComplaints.length /
    complaintsPerPage
  );
  return (
    <div
  style={{
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    minHeight: "100vh",
    background: "#f5f7fb",
  }}
>
      <ManagerSidebar />

    <div
  style={{
    flex: 1,
    width: "100%",
    padding: isMobile ? "15px" : "30px",
  }}
>
        <h1
          style={{
            marginBottom: "10px",
            fontSize: isMobile
  ? "24px"
  : "32px",
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
    display: "grid",
   gridTemplateColumns:
  isMobile
    ? "1fr 1fr"
    : "repeat(4,1fr)",
    gap: isMobile
  ? "12px"
  : "20px",
    marginBottom: "25px",
  }}
>
  <div className="manager-card">
    <h3>Total Complaints</h3>
    <h2>{total}</h2>
  </div>

  <div className="manager-card">
    <h3>Open</h3>
    <h2>{open}</h2>
  </div>

  <div className="manager-card">
    <h3>In Progress</h3>
    <h2>{progress}</h2>
  </div>

  <div className="manager-card">
    <h3>Resolved</h3>
    <h2>{resolved}</h2>
  </div>
</div>
        <div
          style={{
            background: "white",
            borderRadius: "20px",
           padding: isMobile
  ? "12px"
  : "20px",
    overflow: "hidden",
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
          <div
  style={{
    display: "flex",
    gap: "15px",
    marginBottom: "20px",
    flexWrap: "wrap",
  }}
>
  <input
    type="text"
    placeholder="Search complaints..."
    value={searchTerm}
    onChange={(e) =>
      setSearchTerm(
        e.target.value
      )
    }
    style={{
      flex: 1,
      minWidth: "250px",
      padding: "12px",
      borderRadius: "10px",
      border: "1px solid #ddd",
      fontSize: "14px",
    }}
  />

  <select
    value={statusFilter}
    onChange={(e) =>
      setStatusFilter(
        e.target.value
      )
    }
    style={{
      padding: "12px",
      borderRadius: "10px",
      border: "1px solid #ddd",
      minWidth: "180px",
    }}
  >
    <option value="ALL">
      All Status
    </option>

    <option value="OPEN">
      Open
    </option>

    <option value="IN_PROGRESS">
      In Progress
    </option>

    <option value="RESOLVED">
      Done
    </option>
  </select>
</div>
<p
  style={{
    color: "#64748b",
    marginBottom: "5px",
  }}
>
  Showing Page {currentPage} of {totalPages}
</p>

{isMobile && (
  <div
    style={{
      color: "#2563eb",
      fontSize: "13px",
      marginBottom: "15px",
      fontWeight: "500",
    }}
  >
    ← Swipe left / right to view all columns →
  </div>
)}
         <div
  style={{
    overflowX: "auto",
    width: "100%",
    maxWidth: "100%",
    WebkitOverflowScrolling: "touch",
  }}
>
 <table
  style={{
    minWidth: "1100px",
    width: "max-content",
    borderCollapse: "collapse",
  }}
>
          
           <thead>
  <tr
    style={{
      background: "#f8fafc",
    }}
  >
    <th style={{ padding: "10px" }}>#</th>

    <th style={{ padding: "10px" }}>
      Title
    </th>

    

    

    <th style={{ padding: "10px" }}>
      Location
    </th>
    <th style={{ padding: "10px" }}>
  Room
</th>
<th style={{ padding: "10px" }}>
  Incharge Faculty
</th>

    <th style={{ padding: "10px" }}>
      Priority
    </th>

    <th style={{ padding: "10px" }}>
      Status
    </th>

    <th style={{ padding: "10px" }}>
      Raised On
    </th>
    <th style={{ padding: "10px" }}>
  Date Completed
</th>
  </tr>
</thead>

            <tbody>
  {currentComplaints.map((c) => (
                <tr
                  key={c.id}
                  style={{
                    borderBottom:
                      "1px solid #e5e7eb",
                  }}
                >
                <td
  style={{
    padding: "10px",
    whiteSpace: "nowrap",
  }}
>
  {c.id}
</td>

<td
  style={{
    padding: "10px",
    whiteSpace: "nowrap",
  }}
>
  {c.title}
</td>
<td
  style={{
    padding: "10px",
    whiteSpace: "nowrap",
  }}
>
  {c.category}
</td>



<td
  style={{
    padding: "10px",
    whiteSpace: "nowrap",
  }}
>
  {c.assignedLocation ||
    `${c.blockName} - Floor ${c.floor}`}
</td>
<td
  style={{
    padding: "10px",
    whiteSpace: "nowrap",
  }}
>
  {c.roomNumber || "-"}
</td>
<td
  style={{
    padding: "10px",
    whiteSpace: "nowrap",
  }}
>
  {c.assignedTo || "-"}
</td>
                  <td
                    style={{
                      padding: "10px",
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
    padding: "10px",
  }}
>
 <select
  value={c.status}
  disabled={c.status === "RESOLVED"}
  onChange={(e) =>
    updateStatus(
      c.id,
      e.target.value
    )
  }
  style={{
    padding: "8px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    cursor:
      c.status === "RESOLVED"
        ? "not-allowed"
        : "pointer",
    background:
      c.status === "RESOLVED"
        ? "#dcfce7"
        : "white",
  }}
>
  <option value="OPEN">
    OPEN
  </option>

  <option value="IN_PROGRESS">
    IN PROGRESS
  </option>

  <option value="RESOLVED">
    DONE
  </option>
</select>
</td>
<td
  style={{
    padding: "10px",
    whiteSpace: "nowrap",
  }}
>
  {c.createdAt
    ? new Date(
        c.createdAt
      ).toLocaleString()
    : "-"}
</td>
<td
  style={{
    padding: "10px",
    whiteSpace: "nowrap",
  }}
>
  {c.resolvedAt
    ? new Date(
        c.resolvedAt
      ).toLocaleString()
    : "-"}
</td>
                </tr>
              ))}
            </tbody>
            </table>
</div>
          <div
  style={{
    display: "flex",
    justifyContent: "center",
    gap: "8px",
    marginTop: "20px",
    flexWrap: "wrap",
  }}
>
  {[...Array(totalPages)].map(
    (_, index) => (
      <button
        key={index}
        onClick={() =>
          setCurrentPage(
            index + 1
          )
        }
        style={{
          padding: "8px 12px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          background:
            currentPage === index + 1
              ? "#2563eb"
              : "#e5e7eb",
          color:
            currentPage === index + 1
              ? "white"
              : "black",
          fontWeight: "600",
        }}
      >
        {index + 1}
      </button>
    )
  )}
</div>
        </div>
      </div>
    </div>
  );
}

export default ManagerDashboard;    