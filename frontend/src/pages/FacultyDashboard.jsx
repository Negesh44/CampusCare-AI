import { useEffect, useState } from "react";

import API from "../services/api";

import FacultySidebar from "../components/FacultySidebar";

import "../styles/FacultyDashboard.css";

function FacultyDashboard() {

  const [complaints, setComplaints] =
    useState([]);

  useEffect(() => {
    loadComplaints();
  }, []);

  const loadComplaints = async () => {

    try {

      const user =
        JSON.parse(
          localStorage.getItem("user")
        );

      const response =
        await API.get(
          `/api/complaints/faculty?email=${user.email}`
        );

      setComplaints(response.data);

    } catch (error) {
      console.error(error);
    }
  };

  const updateStatus = async (
    id,
    status
  ) => {

    try {

      await API.put(
        `/api/complaints/${id}/status?status=${status}`
      );

      loadComplaints();

    } catch (error) {
      console.error(error);
    }
  };

  const openCount =
    complaints.filter(
      (c) => c.status === "OPEN"
    ).length;

  const progressCount =
    complaints.filter(
      (c) =>
        c.status === "IN_PROGRESS"
    ).length;

  const resolvedCount =
    complaints.filter(
      (c) =>
        c.status === "RESOLVED"
    ).length;

  return (
    <div className="faculty-container">

      <FacultySidebar />

      <div className="faculty-main">

        <div className="faculty-header">

          <h1>
            Faculty Complaint Management
          </h1>

          <p>
            Review, process and resolve
            campus service requests.
          </p>

        </div>

        <div className="faculty-cards">

          <div className="faculty-card start-card">
            <h3>Start Work</h3>
            <h2>{openCount}</h2>
          </div>

          <div className="faculty-card working-card">
            <h3>Working</h3>
            <h2>{progressCount}</h2>
          </div>

          <div className="faculty-card done-card">
            <h3>Done</h3>
            <h2>{resolvedCount}</h2>
          </div>

        </div>

        <div className="faculty-table-card">

          <div className="table-header">

            <h2>
              Complaint Queue
            </h2>

            <span>
              Total Complaints :
              {" "}
              {complaints.length}
            </span>

          </div>

          <div className="table-wrapper">

            <table>

              <thead>

                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Action</th>
                </tr>

              </thead>

              <tbody>

                {complaints.map((c) => (

                  <tr key={c.id}>

                    <td>
                      {c.title}
                    </td>

                    <td>
                      {c.category}
                    </td>

                    <td>

                      <span
                        className={
                          c.status === "OPEN"
                            ? "status-open"
                            : c.status === "IN_PROGRESS"
                            ? "status-working"
                            : "status-done"
                        }
                      >
                        {
                          c.status === "OPEN"
                            ? "START WORK"
                            : c.status === "IN_PROGRESS"
                            ? "WORKING"
                            : "DONE"
                        }
                      </span>

                    </td>

                    <td>
                      {c.priority}
                    </td>

                    <td>

                      {c.status === "OPEN" && (

                        <button
                          className="progress-btn"
                          onClick={() =>
                            updateStatus(
                              c.id,
                              "IN_PROGRESS"
                            )
                          }
                        >
                          Start Work
                        </button>

                      )}

                      {c.status ===
                        "IN_PROGRESS" && (

                        <button
                          className="resolve-btn"
                          onClick={() =>
                            updateStatus(
                              c.id,
                              "RESOLVED"
                            )
                          }
                        >
                          Mark Done
                        </button>

                      )}

                      {c.status ===
                        "RESOLVED" && (

                        <span
                          className="completed-text"
                        >
                          Completed
                        </span>

                      )}

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}

export default FacultyDashboard;