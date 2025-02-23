import React, { useEffect, useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Typography } from '@mui/material';
import ProjectCard, { Project } from '../../Components/ProjectCard';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import LockIcon from '@mui/icons-material/Lock';
import CreateProjectForm from '../../Forms/CreateProjectForm';
import { useDispatch } from 'react-redux';
import { createProject } from '../../features/project/createProjectSlice';
import axios from 'axios';


const AdminDashboard: React.FC = () => {

  const dispatch = useDispatch();

  console.log("hello from Admin Dashboard");
  const [open, setOpen] = useState(false);
  const [UserDialogopen, setUserDialogOpen] = useState(false);

  const [UserformData, setUserFormData] = useState<UserFormData>({
    name: "",
    email: "",
    passwordHash: "",
    roleId: 1, // default to User
  });

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: null,
    endDate: null,
    status: 0,
  });

  const [projects, setProjects] = useState<Project[]>([]);
  const token = localStorage.getItem('token');

  const handleClose = () => {
    setOpen(false); // Close the modal
  };

  const UserDialoghandleClose = () => {
    setUserDialogOpen(false); // Close the modal
  };

  const handleUserSubmit = () => {
    //--TODO
  }

  useEffect(()=>{
    const fetchProjects = async () => {
      try {
        console.log(token);
        const response = await axios.get("http://localhost:5148/api/projects",{
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, 
          },
        });
        setProjects(response.data); 
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
  
    fetchProjects();
  },[])


  // Example list for sidebar items
  const sidebarItems = [
    { label: "Create User ##", disabled: false },
    { label: "Add project !!", disabled: false },
    { label: "Create Tasks :) ", disabled: true },
    { label: "Assign Users To project :(", disabled: true },
    { label: "Scrolling Item 5", disabled: true },
    { label: "Scrolling Item 6", disabled: true },
    
  ];


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // }; --TODO

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
        height: "90%", 
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
          // Only clickable if not disabled
          onClick={
            !item.disabled ? () => handleItemClick(item.label) : undefined
          }
          sx={{
            p: 3,
            mb: 2,
            borderRadius: 2,
            background: "linear-gradient(135deg, #8B0000 0%, #B22222 100%)",
            transition: "filter 0.3s ease-in-out",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 80,
            cursor: "pointer",
            "&:hover": {
              filter: "brightness(1.2)",
            },

            // If disabled, override styles
            ...(item.disabled && {
              pointerEvents: "none",
              opacity: 0.5,
              cursor: "not-allowed",
              "&:hover": {
                filter: "none", // no hover effect if disabled
              },
            }),
          }}
        >
          {item.disabled ? (
            // If disabled, show the lock icon and label
            <Typography variant="h6" fontWeight="bold" textAlign="center">
              <LockIcon fontSize="small" sx={{ mr: 1 }} />
              {item.label}
            </Typography>
          ) : (
            // Otherwise just the label
            <Typography variant="h6" fontWeight="bold" textAlign="center">
              {item.label}
            </Typography>
          )}
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
          gap: 6,
          gridTemplateColumns: "repeat(auto-fill, minmax(450px, 1fr))",
        }}
      >
        {projects.map((proj) => (
          <ProjectCard key={proj.id} project={proj} />
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

//-----------------------------------------------------------------------------

        <Dialog open={UserDialogopen} onClose={UserDialoghandleClose} maxWidth="sm" fullWidth>
          <Paper
            sx={{
              backgroundColor: "#1E1E1E",
              color: "#fff",
              borderRadius: 3,
            }}
          >
            <DialogTitle sx={{ color: "#FF3B5C", textAlign: "center", fontWeight: "bold" }}>
              Create New User
            </DialogTitle>
            <DialogContent>
              <CreateProjectForm
                formData={UserformData}
                handleChange={()=>{}}
                handleDateChange={()=>{}}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={UserDialoghandleClose} sx={{ color: "#FF3B5C" }}>
                Cancel
              </Button>
              <Button onClick={handleUserSubmit} variant="contained" sx={{ backgroundColor: "#FF3B5C", "&:hover": { backgroundColor: "#ff1f47" } }}>
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