import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
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
  "Cleanliness",
  "Electricity",
  "Furniture",
  "Internet / WiFi",
  "Projector / Smart Board",
  "Fan Issue",
  "Drinking Water",
  "Plumbing"
];

  const blockFloors = {
  "Main Block": [0,1,2,3,4,5],

  "Civil Block": [1,2,3,4,5,6,7],

  "Academic Block": [4,5,6],

  "Block III": [1,2,5,6],

  "Mechanical Block": [0,1,2,3,4,5,6],

  "Electronics Block": [3,4,5,6,7],

  "TRP Auditorium / Hi-Tech Hall I & II": [0],
};

const blocks = Object.keys(blockFloors);
const availableFloors =
  blockFloors[complaint.blockName] || [];

  const submitComplaint = async () => {
    try {
      const user = JSON.parse(
  localStorage.getItem("user")
);

const payload = {
  ...complaint,
  status: "OPEN",
  studentId: user.id,
};

      await API.post(
        "/api/complaints",
        payload
      );

      alert("Complaint submitted successfully!");

navigate("/my-complaints");

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
    blockName: e.target.value,
    floor: 0,
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
               {availableFloors.map((floor) => (
  <MenuItem
    key={floor}
    value={floor}
  >
    {floor === 0
      ? "Ground Floor"
      : `${floor} Floor`}
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
  value={complaint.roomNumber}
  onChange={(e) =>
    setComplaint({
      ...complaint,
      roomNumber: e.target.value,
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