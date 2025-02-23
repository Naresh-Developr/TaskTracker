// src/Components/ProjectCard.tsx
import React from 'react';
import { Paper, Typography } from '@mui/material';

interface ProjectCardProps {
  title: string;
  description: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        borderRadius: 2,
        backgroundColor: "#fff",
        minHeight: 120,
      }}
    >
      <Typography variant="subtitle1" fontWeight="bold">
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </Paper>
  );
};

export default ProjectCard;
