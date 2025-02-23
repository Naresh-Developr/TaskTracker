// src/Pages/dashboards/UserDashboard.tsx
import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { format } from 'date-fns';

const UserDashboard: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(format(new Date(), "hh:mm:ss a"));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Box
      sx={{
        p: 3,
        m: 2,
        border: '2px solid #888',
        borderRadius: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <Typography variant="h2" fontWeight={500}>
        Welcome Home, <span style={{ color: "red" }}>User</span>
      </Typography>
      <Typography variant="h2" fontWeight={500} sx={{ color: "red" }}>
        {currentTime}
      </Typography>
      {/* Additional user-specific content goes here */}
    </Box>
  );
};

export default UserDashboard;
