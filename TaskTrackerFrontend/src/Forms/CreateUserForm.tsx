import React from "react";
import {
  Box,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { AccountCircle, Email, Lock } from "@mui/icons-material";

interface UserFormData {
  name: string;
  email: string;
  passwordHash: string;
  roleId: number;
}

interface CreateUserFormProps {
  formData: UserFormData;
  // Handler for TextField changes
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // Handler for Select changes
  handleSelectChange: (e: React.ChangeEvent<{ name?: string; value: unknown }>) => void;
}

const CreateUserForm: React.FC<CreateUserFormProps> = ({ formData, handleChange, handleSelectChange }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
      {/* Name Field */}
      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle sx={{ color: "#888" }} />
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiInputLabel-root": { color: "gray" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "#444" },
            "&:hover fieldset": { borderColor: "#FF3B5C" },
          },
        }}
      />

      {/* Email Field */}
      <TextField
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        type="email"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Email sx={{ color: "#888" }} />
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiInputLabel-root": { color: "gray" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "#444" },
            "&:hover fieldset": { borderColor: "#FF3B5C" },
          },
        }}
      />

      {/* Password Field */}
      <TextField
        label="Password"
        name="passwordHash"
        value={formData.passwordHash}
        onChange={handleChange}
        fullWidth
        type="password"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Lock sx={{ color: "#888" }} />
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiInputLabel-root": { color: "gray" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "#444" },
            "&:hover fieldset": { borderColor: "#FF3B5C" },
          },
        }}
      />

      {/* Role Selection */}
      <FormControl fullWidth>
        <InputLabel sx={{ color: "gray" }}>Role</InputLabel>
        <Select
          name="roleId"
          value={formData.roleId}
          onChange={handleSelectChange}
          label="Role"
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#444" },
              "&:hover fieldset": { borderColor: "#FF3B5C" },
            },
          }}
        >
          <MenuItem value={1}>User</MenuItem>
          <MenuItem value={2}>Admin</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default CreateUserForm;
