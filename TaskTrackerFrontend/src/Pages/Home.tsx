// src/Pages/Home.tsx
import React, { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@reduxjs/toolkit/query';
import NavBar from '../Components/NavBar';
import Footer from '../Components/Footer';
import { format } from 'date-fns';
import { Box, Grid2, Typography } from '@mui/material';

const Home: React.FC = () => {
  const role = useSelector((state: RootState) => state.auth.role);
  console.log("Redux Role:", role);
  console.log("Session Storage Role:", localStorage.getItem('role'));

  // Redirect if role isn't defined (i.e., user is not authenticated)
  if (window.location.pathname === "/home") {
    if (role === "Admin") {
      return <Navigate to="/home/admin" />;
    } else {
      return <Navigate to="/home/user" />;
    }
  }

  // Optionally, add a default redirect based on role:
  // if (window.location.pathname === '/home') {
  //   return role === 'admin' ? <Navigate to="/home/admin" /> : <Navigate to="/home/user" />;
  // }

  const [currentTime, setCurrentTime] = useState<string>(() => {
    return format(new Date(), "hh:mm a");
  });

  useEffect(() => {
    // Update time every minute (60,000 ms)
    const timer = setInterval(() => {
      setCurrentTime(format(new Date(), "hh:mm a"));
    }, 60_000);

    // Cleanup interval on unmount
    return () => clearInterval(timer);
  }, []);

  
  return (
    <>
      <NavBar darkMode={true} />
      <Box sx={{ pt: '90px', width: '100%'  , boxSizing: 'border-box' }}>
        <Grid2
          width="100%"
          height="100%"
          border="2px #888 solid"
          borderRadius={5}
          display="flex"
          justifyContent="center"
        >
          <Grid2  height="100%" width="100%" p={2}>
            {/* Example content */}
            <Box display="flex" justifyContent="space-between">
              <Typography fontWeight={500} fontSize={70}>
                Welcome Home,
                <br />
                <span style={{ color: 'red' }}>{role}</span>
              </Typography>
              <Typography fontWeight={500} fontSize={70}>
                <span style={{ color: 'red' }}> {currentTime} </span>
              </Typography>
            </Box>
          </Grid2>
        </Grid2>
      </Box>

      {/* Outlet renders nested routes */}
      <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
        <Outlet />
      </Box>
      <Footer />
    </>
  );
};

export default Home;
