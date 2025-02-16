import React, { useState, FormEvent } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
  Link,
} from "@mui/material";
import { Email, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { signUp } from "../features/user/userSlice";

interface FormData {
  name: string;
  email: string;
  passwordHash: string;
}

const SignUpForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    passwordHash: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch()
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(signUp(formData));
    console.log("Form submitted", formData);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#121212", // Dark theme
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          maxWidth: 400,
          width: "100%",
          borderRadius: 3,
          backgroundColor: "#1E1E1E", // Dark Card
          color: "#fff", // Light text
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          align="center"
          sx={{ color: "#FF3B5C", mb: 2 }}
        >
          Sign Up :)
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          {/* Name Input */}
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            InputProps={{
              style: { color: "#fff", borderColor: "#444" },
            }}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            sx={{
              "& .MuiInputLabel-root": {
                color: "gray",
              },
              "& .MuiOutlinedInput-input::placeholder": {
              color: "#3F51B5", // A nice blue shade
              textShadow: "0 0 6px #3F51B5", // Glowing effect
              opacity: 1
            },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#444" },
                // "&:hover fieldset": { borderColor: "#FF3B5C" },
              },
            }}
          />

          {/* Email Input */}
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            InputProps={{
              style: { color: "#fff", borderColor: "#444" },
              startAdornment: (
                <InputAdornment position="start">
                  <Email sx={{ color: "#888" }} />
                </InputAdornment>
              ),
            }}
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            sx={{
              "& .MuiInputLabel-root": {
                color: "gray",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#444" },
                // "&:hover fieldset": { borderColor: "#FF3B5C" },
              },
            }}
          />

          {/* Password Input */}
          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
            margin="normal"
            InputProps={{
              style: { color: "#fff", borderColor: "#444" },
              startAdornment: (
                <InputAdornment position="start">
                  <Lock sx={{ color: "#888" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePassword} edge="end">
                    {showPassword ? (
                      <Visibility sx={{ color: "#888" }} />
                    ) : (
                      <VisibilityOff sx={{ color: "#888" }} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            value={formData.passwordHash}
            onChange={(e) =>
              setFormData({ ...formData, passwordHash: e.target.value })
            }
            sx={{
              "& .MuiInputLabel-root": {
                color: "gray",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#444" },
                
              },
            }}
          />

          {/* Forgot Password & Sign Up Links */}
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            mt={1}
          >
           
            <Link href="#" sx={{ color: "#FF3B5C", fontSize: "0.9rem" }}>
              Sign In
            </Link>
          </Box>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              backgroundColor: "#FF3B5C",
              color: "#fff",
              borderRadius: 2,
              "&:hover": { backgroundColor: "#ff1f47" },
            }}
          >
            Sign Up
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default SignUpForm;
