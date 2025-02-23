import React from 'react';
import { Paper, Typography, Box, Chip } from '@mui/material';
import { format } from 'date-fns';

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
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { name, description, startDate, endDate, status } = project;

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
    <Paper
      elevation={6}
      sx={{
        // Larger card dimensions
        width: 350,             // adjust as needed
        minHeight: 200,         // bigger vertical space
        p: 3,                   // more padding
        borderRadius: 3,
        // Dark blue gradient background
        background: "linear-gradient(135deg, #1c2b5b 0%, #3c4b8a 100%)",
        // Make text more readable on a dark background
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
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

      {/* Bottom Section: Dates & Status */}
      <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
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
            // Slight transparency to blend with gradient
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(4px)",
            color: "#fff",
            "& .MuiChip-label": {
              fontWeight: 600,
            },
          }}
        />
      </Box>
    </Paper>
  );
};

export default ProjectCard;
