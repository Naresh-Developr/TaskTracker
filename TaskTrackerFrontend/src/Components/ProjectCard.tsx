import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Box,
  Chip,
  Button,
  List,
  ListItem,
  ListItemText,
  useTheme,
  styled,
} from '@mui/material';
import { format } from 'date-fns';
import TaskAssignmentForm from '../Forms/TaskAssignmentForm';
import { useNavigate } from 'react-router-dom';

export interface Task {
  id: number;
  name: string;
  status: number; // 0: Pending, 1: In Progress, 2: Completed
  // Add additional properties as needed
}

export interface Project {
  id: number;
  name: string;
  description: string;
  startDate: string;  // e.g., "0004-04-03T18:06:32"
  endDate: string;    // e.g., "0004-04-03T18:06:32"
  status: number;
  userProjects: any; 
  tasks: Task[]; 
}

interface ProjectCardProps {
  project: Project;
  users?: { id: number; name: string }[];
}

// A custom chip style to make them pop
const StyledChip = styled(Chip)(({ theme }) => ({
  fontWeight: 'bold',
  color: '#fff',
  // Vibrant background colors for each status color
  '&.MuiChip-colorSuccess': {
    backgroundColor: '#4caf50', // bright green
  },
  '&.MuiChip-colorInfo': {
    backgroundColor: '#2196f3', // bright blue
  },
  '&.MuiChip-colorWarning': {
    backgroundColor: '#ff9800', // bright orange
  },
  '&.MuiChip-colorDefault': {
    backgroundColor: '#9e9e9e', // gray
  },
}));

const ProjectCard: React.FC<ProjectCardProps> = ({ project, users }) => {
  const { id, name, description, startDate, endDate, status, tasks } = project;

  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [showTasks, setShowTasks] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();

  const handleOpenTaskDialog = () => {
    setTaskDialogOpen(true);
  };

  const handleCloseTaskDialog = () => {
    setTaskDialogOpen(false);
  };

  // Navigate to a dedicated page for tasks (if desired)
  const handleShowTasksPage = () => {
    navigate('/home/admin/projects', { state: { projectId: id } });
  };

  // Toggle inline tasks display
  const toggleShowTasks = () => {
    setShowTasks((prev) => !prev);
  };

  // Map numeric statuses to labels
  const getStatusLabel = (statusValue: number) => {
    switch (statusValue) {
      case 0:
        return 'Pending';
      case 1:
        return 'In Progress';
      case 2:
        return 'Completed';
      default:
        return 'Unknown';
    }
  };

  // Map numeric statuses to MUI Chip colors
  // We'll pick from: "warning", "info", "success", "default"
  const getStatusColor = (statusValue: number) => {
    switch (statusValue) {
      case 0:
        return 'warning';
      case 1:
        return 'info';
      case 2:
        return 'success';
      default:
        return 'default';
    }
  };

  // Format date strings from the backend
  const formatDate = (dateString: string) => {
    try {
      const dateObj = new Date(dateString);
      return format(dateObj, 'yyyy-MM-dd');
    } catch (err) {
      return dateString;
    }
  };

  return (
    <>
      <Paper
        elevation={8}
        sx={{
          width: 350,
          minHeight: 220,
          p: 3,
          borderRadius: 3,
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          // We'll use a bright gradient and an overlay
          background: 'linear-gradient(135deg, #3f51b5 0%, #2196f3 100%)',
          overflow: 'hidden',
          // Subtle box shadow & hover effect
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 6px 16px rgba(0,0,0,0.4)',
          },
          // Add a decorative overlay
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '-20%',
            right: '-20%',
            width: '200px',
            height: '200px',
            background:
              'radial-gradient(circle at center, rgba(255,255,255,0.4) 0%, transparent 70%)',
            transform: 'rotate(45deg)',
            opacity: 0.2,
          },
        }}
      >
        {/* Top Section: Name & Description */}
        <Box>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            {name}
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9 }}>
            {description}
          </Typography>
        </Box>

        {/* Bottom Section: Dates, Status & Buttons */}
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
            <StyledChip
              label={getStatusLabel(status)}
              color={getStatusColor(status)}
              variant="filled"
              sx={{
                backdropFilter: 'blur(4px)',
              }}
            />
          </Box>

          <Box display="flex" justifyContent="space-between" mt={1}>
            {/* Add Task button (only if users are provided) */}
            {users && (
              <Button
                variant="contained"
                size="small"
                onClick={handleOpenTaskDialog}
                sx={{
                  backgroundColor: '#FF3B5C',
                  fontWeight: 'bold',
                  '&:hover': { backgroundColor: '#ff1f47' },
                }}
              >
                Add Task
              </Button>
            )}
            <Box display="flex" gap={1}>
              {/* <Button
                variant="outlined"
                size="small"
                onClick={toggleShowTasks}
                sx={{
                  color: '#fff',
                  borderColor: '#fff',
                  fontWeight: 'bold',
                  '&:hover': {
                    borderColor: '#eee',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  },
                }}
              >
                {showTasks ? 'Hide Tasks' : 'Show Tasks'}
              </Button> */}
              <Button
                variant="outlined"
                size="small"
                onClick={handleShowTasksPage}
                sx={{
                  color: '#fff',
                  borderColor: '#fff',
                  fontWeight: 'bold',
                  '&:hover': {
                    borderColor: '#eee',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  },
                }}
              >
                Task List
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>

     

     
    </>
  );
};

export default ProjectCard;
