// src/Pages/dashboards/AdminSettings.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';

const AdminSettings: React.FC = () => {
  console.log("heelo form admin Dashboard");
  return (
    <Box sx={{ p: 3, m: 2, border: '2px dashed #888', borderRadius: 2 }}>
      <Typography variant="h3" fontWeight={500}>
        Admin Settings
      </Typography>
      {/* Add admin settings content here */}
    </Box>
  );
};

export default AdminSettings;
