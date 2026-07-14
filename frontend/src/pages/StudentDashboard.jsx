import { useEffect, useState } from "react";

import API from "../services/api";

import Sidebar from "../components/Sidebar";

import DashboardCards from "../components/DashboardCards";

import "../styles/StudentDashboard.css";
const user = JSON.parse(
  localStorage.getItem("user")
);
function StudentDashboard() {
  const [complaints, setComplaints] = useState([]);

  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    progress: 0,
    resolved: 0,
  });

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

    const data = response.data;

      setComplaints(data);

      const total = data.length;

      const pending =
        data.filter(
          (c) => c.status === "OPEN"
        ).length;

      const progress =
        data.filter(
          (c) =>
            c.status === "IN_PROGRESS"
        ).length;

      const resolved =
        data.filter(
          (c) =>
            c.status === "RESOLVED"
        ).length;

      setStats({
        total,
        pending,
        progress,
        resolved,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="main-content">
        

        <DashboardCards
          total={stats.total}
          pending={stats.pending}
          progress={stats.progress}
          resolved={stats.resolved}
        />

        <div className="recent-section">

          <div className="recent-card">

            <div className="section-header">
              <h2>
                Recent Service Requests
              </h2>
            </div>

            {complaints
              .slice(0, 5)
              .map((c) => (
                <div
                  key={c.id}
                  className="complaint-item"
                >
                  <div>
                    <strong>
                      {c.title}
                    </strong>

                    <p>
                      {c.blockName}
                      {" • "}
                      Room {c.roomNumber}
                    </p>
                  </div>

                  <span>
                    {c.status}
                  </span>
                </div>
              ))}

          </div>

          <div className="recent-card">

            <h2>
  Campus Notices
</h2>

<div className="notice">
  🧹 Keep classrooms, corridors, and common areas clean at all times.
</div>

<div className="notice">
  🚯 Use designated dustbins and avoid littering anywhere on campus.
</div>

<div className="notice">
  🔇 Maintain silence in academic blocks, library, and study areas.
</div>

<div className="notice">
  🌱 Help maintain a green campus by avoiding damage to plants and college property.
</div>

<div className="notice">
  🤝 Treat faculty, staff, and fellow students with respect and professionalism.
</div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;