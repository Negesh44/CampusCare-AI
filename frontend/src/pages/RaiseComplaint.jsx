import { useState } from "react";

import {
  Box,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";

import API from "../services/api";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function RaiseComplaint() {
  const [complaint, setComplaint] = useState({
    title: "",
    category: "",
    blockName: "",
    floor: "",
    roomNumber: "",
    priority: "",
    description: "",
  });

  const categories = [
    "Electrical",
    "Water Leakage",
    "Furniture",
    "Internet / WiFi",
    "Projector / Smart Board",
    "Classroom Infrastructure",
  ];

  const submitComplaint = async () => {
    try {
      const payload = {
        ...complaint,
        status: "OPEN",
        studentId: 1,
      };

      await API.post(
        "/api/complaints",
        payload
      );

      alert(
        "Complaint submitted successfully!"
      );

      setComplaint({
        title: "",
        category: "",
        blockName: "",
        floor: "",
        roomNumber: "",
        priority: "",
        description: "",
      });

    } catch (error) {
      console.error(error);

      alert(
        "Failed to submit complaint"
      );
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="main-content">
        <Topbar />

        <div className="page-content">

          <Typography
            variant="h4"
            fontWeight="bold"
            mb={1}
          >
            Submit Service Request
          </Typography>

          <Typography
            color="text.secondary"
            mb={3}
          >
            Submit maintenance and
            infrastructure related
            requests for review and
            resolution.
          </Typography>

          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              height: "calc(100vh - 220px)",
            }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns:
                  "1fr 1fr",
                gap: 2,
              }}
            >

              <TextField
                label="Request Title"
                fullWidth
                value={complaint.title}
                onChange={(e) =>
                  setComplaint({
                    ...complaint,
                    title:
                      e.target.value,
                  })
                }
              />

              <TextField
                select
                label="Category"
                fullWidth
                value={complaint.category}
                onChange={(e) =>
                  setComplaint({
                    ...complaint,
                    category:
                      e.target.value,
                  })
                }
              >
                {categories.map(
                  (item) => (
                    <MenuItem
                      key={item}
                      value={item}
                    >
                      {item}
                    </MenuItem>
                  )
                )}
              </TextField>

              <TextField
                label="Block"
                fullWidth
                value={
                  complaint.blockName
                }
                onChange={(e) =>
                  setComplaint({
                    ...complaint,
                    blockName:
                      e.target.value,
                  })
                }
              />

              <TextField
                label="Floor"
                fullWidth
                value={complaint.floor}
                onChange={(e) =>
                  setComplaint({
                    ...complaint,
                    floor:
                      e.target.value,
                  })
                }
              />

              <TextField
                label="Room Number"
                fullWidth
                value={
                  complaint.roomNumber
                }
                onChange={(e) =>
                  setComplaint({
                    ...complaint,
                    roomNumber:
                      e.target.value,
                  })
                }
              />

              <TextField
                select
                label="Priority"
                fullWidth
                value={
                  complaint.priority
                }
                onChange={(e) =>
                  setComplaint({
                    ...complaint,
                    priority:
                      e.target.value,
                  })
                }
              >
                <MenuItem value="LOW">
                  Low
                </MenuItem>

                <MenuItem value="MEDIUM">
                  Medium
                </MenuItem>

                <MenuItem value="HIGH">
                  High
                </MenuItem>
              </TextField>

            </Box>

            <TextField
              label="Description"
              multiline
              rows={4}
              fullWidth
              sx={{ mt: 3 }}
              value={
                complaint.description
              }
              onChange={(e) =>
                setComplaint({
                  ...complaint,
                  description:
                    e.target.value,
                })
              }
            />

            <Button
              variant="contained"
              size="large"
              sx={{
                mt: 3,
                borderRadius: 3,
              }}
              onClick={
                submitComplaint
              }
            >
              Submit Request
            </Button>

          </Paper>

        </div>
      </div>
    </div>
  );
}

export default RaiseComplaint;