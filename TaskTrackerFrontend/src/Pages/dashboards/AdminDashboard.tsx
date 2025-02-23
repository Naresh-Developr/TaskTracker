import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import ProjectCard from '../../Components/ProjectCard';


const AdminDashboard: React.FC = () => {
  console.log("hello from Admin Dashboard");

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
    "+ Create Project",
    "Another Sidebar Item",
    "One More Item",
    "Scrolling Item 5",
    "Scrolling Item 6",
    "Scrolling Item 7",
  ];

  const handleItemClick = (item: string) => {
    // Example click handler
    alert(`Clicked on: ${item}`);
  };

  return (
  
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
    </Box>

  );
};

export default AdminDashboard;