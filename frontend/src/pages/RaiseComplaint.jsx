import { useState } from "react";

import {
  Box,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Button,
  Divider,
} from "@mui/material";

import API from "../services/api";

import Sidebar from "../components/Sidebar";


function RaiseComplaint() {
  const [complaint, setComplaint] = useState({
    title: "",
    category: "",
    blockName: "",
    floor: 0,
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
    "Air Conditioner",
    "Fan Issue",
    "Lighting",
    "Plumbing",
  ];

  const blocks = [
    "Main Block",
    "A Block",
    "B Block",
    "C Block",
    "D Block",
    "Library",
    "Lab Complex",
  ];

  const floors = [
  { label: "Ground Floor", value: 0 },
  { label: "1st Floor", value: 1 },
  { label: "2nd Floor", value: 2 },
  { label: "3rd Floor", value: 3 },
  { label: "4th Floor", value: 4 },
  { label: "5th Floor", value: 5 },
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
        floor: 0,
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

       

        <div className="page-content">

          <Typography
  sx={{
    fontSize: "42px",
    fontWeight: 700,
    color: "#0f172a",
    mb: 1,
  }}
>
  Raise Complaint
</Typography>

<Typography
  sx={{
    fontSize: "18px",
    color: "#64748b",
    mb: 4,
  }}
>
  Report maintenance and infrastructure issues for quick resolution.
</Typography>

          <Paper
  elevation={0}
  sx={{
    p: 5,
    borderRadius: "24px",
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    boxShadow:
      "0 12px 40px rgba(15,23,42,0.08)",
  }}
>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns:
                  {
                    xs: "1fr",
                    md: "1fr 1fr",
                  },
                gap: 3,
              }}
            >

              <TextField
                label="Request Title"
                fullWidth
                sx={{
  "& .MuiOutlinedInput-root": {
    borderRadius: "14px",
    background: "#f8fafc",
  },
}}
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
                sx={{
  "& .MuiOutlinedInput-root": {
    borderRadius: "14px",
    background: "#f8fafc",
  },
}}
                value={
                  complaint.category
                }
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
                select
                label="Block"
                fullWidth
                sx={{
  "& .MuiOutlinedInput-root": {
    borderRadius: "14px",
    background: "#f8fafc",
  },
}}
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
              >
                {blocks.map(
                  (block) => (
                    <MenuItem
                      key={block}
                      value={block}
                    >
                      {block}
                    </MenuItem>
                  )
                )}
              </TextField>

              <TextField
                select
                label="Floor"
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "14px",
                    background: "#f8fafc",
                  },
                }}
                value={complaint.floor}
                onChange={(e) =>
                  setComplaint({
                    ...complaint,
                    floor: Number(e.target.value),
                  })
                }
              >
                {floors.map((floor) => (
                  <MenuItem
                    key={floor.value}
                    value={floor.value}
                  >
                    {floor.label}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                label="Room Number"
                fullWidth
                sx={{
  "& .MuiOutlinedInput-root": {
    borderRadius: "14px",
    background: "#f8fafc",
  },
}}
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
                sx={{
  "& .MuiOutlinedInput-root": {
    borderRadius: "14px",
    background: "#f8fafc",
  },
}}
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
                  🟢 Low
                </MenuItem>

                <MenuItem value="MEDIUM">
                  🟡 Medium
                </MenuItem>

                <MenuItem value="HIGH">
                  🔴 High
                </MenuItem>
              </TextField>

            </Box>

            <TextField
  label="Describe the Issue"
  multiline
  rows={6}
  fullWidth
  sx={{
    mt: 4,
    "& .MuiOutlinedInput-root": {
      borderRadius: "14px",
      background: "#f8fafc",
    },
  }}
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
              fullWidth
              sx={{
                mt: 3,
                py: 1.5,
                borderRadius: 3,
                fontSize: "16px",
                fontWeight: 600,
              }}
              onClick={
                submitComplaint
              }
            >
              Submit Complaint
            </Button>

          </Paper>

        </div>

      </div>

    </div>
  );
}

export default RaiseComplaint;