// src/Pages/dashboards/UserProfile.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';

const UserProfile: React.FC = () => {
  return (
    <Box sx={{ p: 3, m: 2, border: '2px dashed #888', borderRadius: 2 }}>
      <Typography variant="h3" fontWeight={500}>
        User Profile
      </Typography>
      {/* Add user profile content here */}
    </Box>
  );
};

export default UserProfile;
