import { useEffect, useState } from "react";

import API from "../services/api";

import PrincipalSidebar from "../components/PrincipalSidebar";

import "../styles/PrincipalDashboard.css";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

function PrincipalDashboard() {

 const [complaints, setComplaints] =
  useState([]);
  

const [search, setSearch] =
  useState("");

const [statusFilter, setStatusFilter] =
  useState("ALL");
const [page, setPage] =
  useState(1);

const itemsPerPage = 10;
  useEffect(() => {
    loadComplaints();
  }, []);

  const loadComplaints = async () => {

    try {

      const response =
        await API.get(
          "/api/complaints"
        );

      setComplaints(
        response.data
      );

    } catch (error) {
      console.error(error);
    }
  };

  const totalComplaints =
    complaints.length;

  const openComplaints =
    complaints.filter(
      (c) => c.status === "OPEN"
    ).length;

  const workingComplaints =
    complaints.filter(
      (c) => c.status === "IN_PROGRESS"
    ).length;

  const resolvedComplaints =
    complaints.filter(
      (c) => c.status === "RESOLVED"
    ).length;

  const electrical =
    complaints.filter(
      (c) =>
        c.category === "Electrical"
    ).length;

  const water =
    complaints.filter(
      (c) =>
        c.category ===
        "Water Leakage"
    ).length;

  const furniture =
    complaints.filter(
      (c) =>
        c.category ===
        "Furniture"
    ).length;

  const wifi =
    complaints.filter(
      (c) =>
        c.category ===
        "Internet / WiFi"
    ).length;

  const statusData = [
    {
      name: "Open",
      value: openComplaints,
    },
    {
      name: "Working",
      value: workingComplaints,
    },
    {
      name: "Resolved",
      value: resolvedComplaints,
    },
  ];

  const categoryData = [
    {
      name: "Electrical",
      value: electrical,
    },
    {
      name: "Water",
      value: water,
    },
    {
      name: "Furniture",
      value: furniture,
    },
    {
      name: "WiFi",
      value: wifi,
    },
  ];

  const COLORS = [
    "#f59e0b",
    "#2563eb",
    "#22c55e",
  ];

  const facultyStats = {};

  complaints.forEach((c) => {

    const faculty =
      c.assignedFacultyName ||
      "Not Assigned";

    if (!facultyStats[faculty]) {

      facultyStats[faculty] = {
        faculty,
        location:
          c.assignedLocation ||
          "-",
        open: 0,
        working: 0,
        resolved: 0,
      };
    }

    if (c.status === "OPEN") {
      facultyStats[faculty].open++;
    }

    if (c.status === "IN_PROGRESS") {
      facultyStats[faculty].working++;
    }

    if (c.status === "RESOLVED") {
      facultyStats[faculty].resolved++;
    }

  });
const filteredComplaints =
  complaints.filter((c) => {

    const matchesSearch =
      c.title
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        ) ||

      c.category
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        ) ||

      c.assignedFacultyName
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
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

const paginatedComplaints =
  filteredComplaints.slice(
    (page - 1) *
      itemsPerPage,
    page *
      itemsPerPage
  );
  return (

    <div className="principal-container">

      <PrincipalSidebar />

      <div className="principal-main">

        <div className="principal-header">

          <h1>
            Principal Dashboard
          </h1>

          <p>
            Campus-wide complaint
            monitoring and analytics
          </p>

        </div>

        <div className="principal-cards">

          <div className="principal-card total">
            <h3>Total Complaints</h3>
            <h2>{totalComplaints}</h2>
          </div>

          <div className="principal-card open">
            <h3>Start Work</h3>
            <h2>{openComplaints}</h2>
          </div>

          <div className="principal-card working">
            <h3>Working</h3>
            <h2>{workingComplaints}</h2>
          </div>

          <div className="principal-card done">
            <h3>Done</h3>
            <h2>{resolvedComplaints}</h2>
          </div>

        </div>
        <div className="recent-card">

  <h2>
    Recent Complaints
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
      value={search}
      onChange={(e) => {
  setSearch(e.target.value);
  setPage(1);
}}
      style={{
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        flex: 1,
        minWidth: "250px",
      }}
    />

    <select
      value={statusFilter}
      onChange={(e) => {
  setStatusFilter(e.target.value);
  setPage(1);
}}    
      style={{
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "8px",
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
        Resolved
      </option>

    </select>

  </div>

          <table>

            <thead>

              <tr>
  <th>Title</th>
  <th>Category</th>
  <th>Faculty</th>
  <th>Location</th>
  <th>Priority</th>
  <th>Status</th>
  <th>Raised On</th>
</tr>

            </thead>

            <tbody>

             {paginatedComplaints.map((c) => (

              <tr key={c.id}>

  <td>{c.title}</td>

  <td>{c.category}</td>

  <td>{c.assignedFacultyName}</td>

  <td>{c.assignedLocation}</td>

  <td>{c.priority}</td>

  <td>{c.status}</td>

  <td>
    {c.createdAt
      ? new Date(c.createdAt)
  .toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  })
      : "-"}
  </td>

</tr>
                  

              ))}

            </tbody>

          </table>
          <div
  style={{
    display: "flex",
    justifyContent:
      "center",
    gap: "10px",
    marginTop: "20px",
  }}
>

  <button
    onClick={() =>
      setPage(page - 1)
    }
    disabled={page === 1}
  >
    Previous
  </button>

  <span>
    Page {page}
  </span>

  <button
    onClick={() =>
      setPage(page + 1)
    }
    disabled={
      page >=
      Math.ceil(
        filteredComplaints.length /
        itemsPerPage
      )
    }
  >
    Next
  </button>

</div>

        </div>
        <div className="recent-card">

          <h2>
            Faculty Performance
          </h2>

          <table>

            <thead>

              <tr>
                <th>Faculty</th>
                <th>Assigned Area</th>
                <th>Open</th>
                <th>Working</th>
                <th>Resolved</th>
<th>Total</th>
              </tr>

            </thead>

            <tbody>

{Object.values(facultyStats).map(
  (faculty) => (

<tr key={faculty.faculty}>

<td>{faculty.faculty}</td>

<td>{faculty.location}</td>

<td>{faculty.open}</td>

<td>{faculty.working}</td>

<td>{faculty.resolved}</td>

<td>
  {faculty.open +
   faculty.working +
   faculty.resolved}
</td>

</tr>

))
}

</tbody>

          </table>

        </div>
<div className="analytics-card">

  <h2>Campus Insights</h2>

  <div className="analytics-item">
    <span>Total Complaints</span>
    <strong>{totalComplaints}</strong>
  </div>

  <div className="analytics-item">
    <span>Pending</span>
    <strong>{openComplaints}</strong>
  </div>

  <div className="analytics-item">
    <span>Working</span>
    <strong>{workingComplaints}</strong>
  </div>

  <div className="analytics-item">
    <span>Resolved</span>
    <strong>{resolvedComplaints}</strong>
  </div>

</div>
        <div className="chart-grid">

          <div className="analytics-card">

            <h2>
              Complaint Status
            </h2>

            <ResponsiveContainer
              width="100%"
              height={300}
            >

              <PieChart>

                <Pie
                  data={statusData}
                  dataKey="value"
                  outerRadius={100}
                  label
                >

                  {statusData.map(
                    (
                      entry,
                      index
                    ) => (

                      <Cell
                        key={index}
                        fill={
                          COLORS[index]
                        }
                      />

                    )
                  )}

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

          <div className="analytics-card">

            <h2>
              Category Analysis
            </h2>

            <ResponsiveContainer
              width="100%"
              height={300}
            >

              <BarChart
                data={
                  categoryData
                }
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey="name"
                />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="value"
                  fill="#2563eb"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        

      </div>

    </div>

  );
}

export default PrincipalDashboard; 