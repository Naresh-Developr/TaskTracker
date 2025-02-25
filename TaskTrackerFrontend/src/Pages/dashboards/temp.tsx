import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  CardActions,
  Paper,
  Button,
  Divider,
  Chip,
  IconButton,
  Collapse,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import { format } from 'date-fns';
import axios from 'axios';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export interface Task {
  id: number;
  name: string;
  description: string;
  dueDate: string;
  status: number; // 0: Pending, 1: In Progress, 2: Completed
  assignedToUserId: number;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: number;
  userProjects: any;
  tasks: Task[];
}

const ProjectsWithTasks: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedProjectIds, setExpandedProjectIds] = useState<number[]>([]);
  const token = localStorage.getItem('token');
  const location = useLocation<{ projectId?: number }>();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get<Project[]>('http://localhost:5148/api/projects', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        setProjects(response.data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || 'Error fetching projects');
        setLoading(false);
      }
    };
    fetchProjects();
  }, [token]);

  const formatDate = (dateString: string) => {
    try {
      const dateObj = new Date(dateString);
      return format(dateObj, 'yyyy-MM-dd');
    } catch {
      return dateString;
    }
  };

  const getStatusLabel = (status: number) => {
    switch (status) {
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

  const getStatusColor = (status: number) => {
    switch (status) {
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

  const toggleExpand = (projectId: number) => {
    setExpandedProjectIds((prev) =>
      prev.includes(projectId) ? prev.filter((id) => id !== projectId) : [...prev, projectId]
    );
  };

  // Dummy handlers for the three actions on each task row
  const handleAssignTo = (taskId: number) => {
    alert(`Assign user to task ID: ${taskId}`);
  };

  const handleUpdateTask = (taskId: number) => {
    alert(`Update task ID: ${taskId}`);
  };

  const handleDeleteTask = (taskId: number) => {
    alert(`Delete task ID: ${taskId}`);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" textAlign="center" mt={4}>
        {error}
      </Typography>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, color: '#fff', maxWidth: '1200px', margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom>
        Projects and Tasks
      </Typography>

      {projects.length === 0 ? (
        <Typography>No projects found.</Typography>
      ) : (
        projects.map((project) => {
          const isExpanded = expandedProjectIds.includes(project.id);

        const selectedProjectId = location.state?.projectId;
        const displayedProjects = selectedProjectId
          ? projects.filter((proj) => proj.id === selectedProjectId)
          : projects;
          return (
            <Card
              key={project.id}
              sx={{
                backgroundColor: '#1E1E1E',
                color: '#fff',
                borderRadius: 2,
                boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
                mb: 3,
              }}
            >
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                  <Box>
                    <Typography variant="h5" fontWeight="bold">
                      {project.name}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8, mt: 1 }}>
                      {project.description}
                    </Typography>
                  </Box>
                  <Chip
                    label={getStatusLabel(project.status)}
                    color={getStatusColor(project.status)}
                    sx={{ fontWeight: 'bold', ml: 2, mt: 1 }}
                  />
                </Box>

                <Paper
                  sx={{
                    mt: 2,
                    p: 1,
                    backgroundColor: '#333',
                    color: '#fff',
                    borderRadius: 1,
                    display: 'inline-block',
                  }}
                >
                  <Typography variant="caption" display="block">
                    Start: {formatDate(project.startDate)}
                  </Typography>
                  <Typography variant="caption" display="block">
                    End: {formatDate(project.endDate)}
                  </Typography>
                </Paper>

                <Box mt={2} display="flex" alignItems="center" justifyContent="space-between">
                  <Typography variant="subtitle1" fontWeight="bold">
                    Tasks ({project.tasks.length})
                  </Typography>
                  <IconButton
                    sx={{ color: '#fff' }}
                    onClick={() => toggleExpand(project.id)}
                    size="small"
                  >
                    {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                </Box>

                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                  <Divider sx={{ borderColor: '#444', my: 1 }} />
                  {project.tasks && project.tasks.length > 0 ? (
                    <List disablePadding>
                      {project.tasks.map((task) => (
                        <React.Fragment key={task.id}>
                          <ListItem sx={{ py: 1, pr: 1 }}>
                            <ListItemText
                              primary={
                                <Typography
                                  variant="subtitle1"
                                  sx={{ fontWeight: 'bold', color: '#fff' }}
                                >
                                  {task.name}
                                </Typography>
                              }
                              secondary={
                                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                  Due: {formatDate(task.dueDate)} | Status: {getStatusLabel(task.status)}
                                </Typography>
                              }
                            />
                            {/* Three action buttons for each task */}
                            <ListItemSecondaryAction>
                              <IconButton
                                sx={{ color: '#fff', mr: 1 }}
                                onClick={() => handleAssignTo(task.id)}
                              >
                                <PersonAddIcon />
                              </IconButton>
                              <IconButton
                                sx={{ color: '#fff', mr: 1 }}
                                onClick={() => handleUpdateTask(task.id)}
                              >
                                <EditIcon />
                              </IconButton>
                              <IconButton
                                sx={{ color: '#fff' }}
                                onClick={() => handleDeleteTask(task.id)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </ListItemSecondaryAction>
                          </ListItem>
                          <Divider sx={{ borderColor: '#444' }} />
                        </React.Fragment>
                      ))}
                    </List>
                  ) : (
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      No tasks for this project.
                    </Typography>
                  )}
                </Collapse>
              </CardContent>
              <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    backgroundColor: '#FF3B5C',
                    '&:hover': { backgroundColor: '#ff1f47' },
                  }}
                >
                  Assign Task
                </Button>
              </CardActions>
            </Card>
          );
        })
      )}
    </Box>
  );
};

export default ProjectsWithTasks;
