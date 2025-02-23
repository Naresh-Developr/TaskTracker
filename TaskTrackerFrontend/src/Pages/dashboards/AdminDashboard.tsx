import React, { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Typography } from '@mui/material';
import ProjectCard from '../../Components/ProjectCard';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';

import CreateProjectForm from '../../Forms/CreateProjectForm';
import { useDispatch } from 'react-redux';
import { createProject } from '../../features/project/createProjectSlice';


const AdminDashboard: React.FC = () => {

  const dispatch = useDispatch();

  console.log("hello from Admin Dashboard");
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: null,
    endDate: null,
    status: 0,
  });

  const handleClose = () => {
    setOpen(false); // Close the modal
  };

  // Sample projects data (replace with your API data)
  const projects = [
    { id: 1, title: "Project #1", description: "Description of project #1..." },
    { id: 2, title: "Project #2", description: "Description of project #2..." },
    { id: 3, title: "Project #3", description: "Description of project #3..." },
    { id: 4, title: "Project #4", description: "Description of project #4..." },
    { id: 5, title: "Project #5", description: "Description of project #5..." },
    { id: 6, title: "Project #6", description: "Description of project #6..." },
  ];

  // Example list for sidebar items
  const sidebarItems = [
    "+ Create Users",
    "project",
    "Another Sidebar Item",
    "One More Item",
    "Scrolling Item 5",
    "Scrolling Item 6",
    "Scrolling Item 7",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (name: string, date: Date | null) => {
    setFormData({ ...formData, [name]: date });
  };

  const handleItemClick = (item: string) => {
    if (item === "project") {
      setOpen(true); // Open the modal when "Create Project" is clicked
    } else {
      alert(`Clicked on: ${item}`);
    }
  };

  const handleSubmit = () => {
    dispatch(createProject(formData))
    console.log("Form Data:", formData); // Log the form data
    setOpen(false); // Close the modal after submission
    // You can add API calls here to save the project
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
    <Box 
      sx={{
        display: "grid",
        gridTemplateColumns: "250px 1fr", // Sidebar and main content
        width: "100%",
        height: "100%", 
        overflow: "hidden", // Prevent page-level scrolling
        marginTop:5
      }}
    >
      {/* Sidebar Container */}
      <Box
        sx={{
          backgroundColor: "#111",
          boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto", // Make the sidebar content scrollable
          height: "70vh", // Full viewport height
          p: 2,
        }}
      >
        {sidebarItems.map((item, idx) => (
          <Paper
            key={idx}
            elevation={2}
            onClick={() => handleItemClick(item)}
            sx={{
              p: 3,
              mb: 2,
              borderRadius: 2,
              backgroundColor: "#e0e0e0",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "#d5d5d5",
              },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: 80,
            }}
          >
            <Typography variant="h6" fontWeight="bold" textAlign="center">
              {item}
            </Typography>
          </Paper>
        ))}
      </Box>

      {/* Main Content Container */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          overflowY: "auto", // Make the main content scrollable
          height: "70vh", // Full viewport height
          p: 3,
          marginLeft:5,
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Available Projects
        </Typography>

        {/* Project Cards Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: 3,
          }}
        >
          {projects.map((proj) => (
            <ProjectCard
              key={proj.id}
              title={proj.title}
              description={proj.description}
            />
          ))}
        </Box>

        {/* Extra Content to Force Scrolling */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Long Content Below</Typography>
          {[...Array(20)].map((_, i) => (
            <Typography key={i} variant="body1">
              This is line {i + 1} of extra content...
            </Typography>
          ))}
        </Box>
      </Box>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
          <Paper
            sx={{
              backgroundColor: "#1E1E1E",
              color: "#fff",
              borderRadius: 3,
            }}
          >
            <DialogTitle sx={{ color: "#FF3B5C", textAlign: "center", fontWeight: "bold" }}>
              Create New Project
            </DialogTitle>
            <DialogContent>
              <CreateProjectForm
                formData={formData}
                handleChange={handleChange}
                handleDateChange={handleDateChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} sx={{ color: "#FF3B5C" }}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} variant="contained" sx={{ backgroundColor: "#FF3B5C", "&:hover": { backgroundColor: "#ff1f47" } }}>
                Submit
              </Button>
            </DialogActions>
          </Paper>
        </Dialog>
    </Box>
    </LocalizationProvider>
  );
};

export default AdminDashboard;