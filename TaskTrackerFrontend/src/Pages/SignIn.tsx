import React, { useState, FormEvent } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Link,
  Button
} from "@mui/material";
import { Email, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import { signIn } from "../features/user/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";




interface SignInData {
  email: string;
  passwordHash: string;
}

const SignIn: React.FC = () => {
    const [formData, setFormData] = useState<SignInData>({
      email: "",
      passwordHash: "",
    });
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch();

    const handleTogglePassword = () => {
      setShowPassword(!showPassword);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(signIn(formData));
      console.log("Sign In form submitted", formData);
      // Redirect to the protected home container. The default nested route redirect will handle routing based on role.
      navigate("/home");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#121212", // Dark background
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          maxWidth: 400,
          width: "100%",
          borderRadius: 3,
          backgroundColor: "#1E1E1E", // Card background
          color: "#fff",
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          align="center"
          sx={{ color: "#FF3B5C", mb: 2 }}
        >
          Sign In : )
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          {/* Email Field */}
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
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#444" },
                "&:hover fieldset": { borderColor: "#FF3B5C" },
              },
            }}
          />

          {/* Password Field */}
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
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#444" },
                "&:hover fieldset": { borderColor: "#FF3B5C" },
              },
            }}
          />

          {/* Links: Forgot Password & Sign Up */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt={1}
          >
            <Link href="#" sx={{ color: "#FF3B5C", fontSize: "0.9rem" }}>
              Forgot Password?
            </Link>
            <Link href="/signup" sx={{ color: "#FF3B5C", fontSize: "0.9rem" }}>
              Sign Up
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
            Sign In
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default SignIn;
