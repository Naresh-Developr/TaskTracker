import React from "react";
import { AppBar, Toolbar, IconButton, Avatar, Box } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

interface NavbarProps {
  darkMode: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ darkMode }) => {
  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        backgroundColor: "black", 
        height: "80px",
        borderRadius: 0, // Usually for a fixed bar, you don't want rounding
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center", ml: 15 }}>
          <Avatar src="/logo.png" alt="Logo" sx={{ width: 50, height: 50 }} />
        </Box>

        {/* Right Section */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
          <IconButton color="inherit">
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <Avatar
            src="/user-icon.png"
            alt="User"
            sx={{ width: 50, height: 50, bgcolor: "white" }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
