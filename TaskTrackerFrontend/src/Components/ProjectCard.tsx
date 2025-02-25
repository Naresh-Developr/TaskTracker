import React, { useState } from 'react';
import { Paper, Typography, Box, Chip, Button } from '@mui/material';
import { format } from 'date-fns';
import TaskAssignmentForm from '../Forms/TaskAssignmentForm'; // Import the task assignment form

// Define the interface matching your backend response
export interface Project {
  id: number;
  name: string;
  description: string;
  startDate: string;  // e.g., "0004-04-03T18:06:32"
  endDate: string;    // e.g., "0004-04-03T18:06:32"
  status: number;
  userProjects: object; // We'll ignore these fields
  tasks: object;        // We'll ignore these fields
}

interface ProjectCardProps {
  project: Project;
  // Assuming you pass in the list of users available for assignment
  users?: { id: number; name: string }[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, users }) => {
  const { id, name, description, startDate, endDate, status } = project;

  // State for controlling the "Add Task" dialog
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);

  const handleOpenTaskDialog = () => {
    setTaskDialogOpen(true);
  };

  const handleCloseTaskDialog = () => {
    setTaskDialogOpen(false);
  };

  // Map numeric statuses to labels
  const getStatusLabel = (statusValue: number) => {
    switch (statusValue) {
      case 0:
        return "Pending";
      case 1:
        return "In Progress";
      case 2:
        return "Completed";
      default:
        return "Unknown";
    }
  };

  // Map numeric statuses to MUI Chip colors
  const getStatusColor = (statusValue: number) => {
    switch (statusValue) {
      case 0:
        return "warning";
      case 1:
        return "info";
      case 2:
        return "success";
      default:
        return "default";
    }
  };

  // Format date strings from the backend (e.g., "0004-04-03T18:06:32")
  const formatDate = (dateString: string) => {
    try {
      const dateObj = new Date(dateString);
      return format(dateObj, "yyyy-MM-dd");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      return dateString; // fallback if parsing fails
    }
  };

  return (
    <>
      <Paper
        elevation={6}
        sx={{
          width: 350,
          minHeight: 200,
          p: 3,
          borderRadius: 3,
          background: "linear-gradient(135deg, #1c2b5b 0%, #3c4b8a 100%)",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        {/* Top Section: Name & Description */}
        <Box>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            {name}
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9 }} gutterBottom>
            {description}
          </Typography>
        </Box>

        {/* Bottom Section: Dates, Status & "Add Task" Button */}
        <Box mt={2} display="flex" flexDirection="column" gap={1}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="caption" display="block" sx={{ opacity: 0.9 }}>
                Start: {formatDate(startDate)}
              </Typography>
              <Typography variant="caption" display="block" sx={{ opacity: 0.9 }}>
                End: {formatDate(endDate)}
              </Typography>
            </Box>
            <Chip
              label={getStatusLabel(status)}
              color={getStatusColor(status)}
              variant="filled"
              sx={{
                fontWeight: "bold",
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(4px)",
                color: "#fff",
                "& .MuiChip-label": {
                  fontWeight: 600,
                },
              }}
            />
          </Box>
          {users && (
          <Button
            variant="contained"
            size="small"
            onClick={handleOpenTaskDialog}
            sx={{ mt: 1, alignSelf: "flex-end", backgroundColor: "#FF3B5C", "&:hover": { backgroundColor: "#ff1f47" } }}
          >
            Add Task
          </Button>
          )}
        </Box>
      </Paper>

      {/* Task Assignment Dialog for this project */}
      {users && (
      <TaskAssignmentForm
        open={taskDialogOpen}
        handleClose={handleCloseTaskDialog}
        projectId={id}
        users={users}
      />
    )}
    </>
  );
};

export default ProjectCard;
