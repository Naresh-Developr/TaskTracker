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
  roleId: number; // 1 for User, 2 for Admin
}

interface CreateUserFormProps {
  formData: UserFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => void;
}

const CreateUserForm: React.FC<CreateUserFormProps> = ({ formData, handleChange }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
      {/* Name */}
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
          style: { color: "#fff" },
        }}
        sx={{
          "& .MuiInputLabel-root": { color: "gray" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "#444" },
            "&:hover fieldset": { borderColor: "#FF3B5C" },
          },
        }}
      />

      {/* Email */}
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
          style: { color: "#fff" },
        }}
        sx={{
          "& .MuiInputLabel-root": { color: "gray" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "#444" },
            "&:hover fieldset": { borderColor: "#FF3B5C" },
          },
        }}
      />

      {/* Password */}
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
          style: { color: "#fff" },
        }}
        sx={{
          "& .MuiInputLabel-root": { color: "gray" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "#444" },
            "&:hover fieldset": { borderColor: "#FF3B5C" },
          },
        }}
      />

      {/* Role */}
      <FormControl fullWidth>
        <InputLabel sx={{ color: "gray" }}>Role</InputLabel>
        <Select
          name="roleId"
          value={formData.roleId}
          onChange={handleChange}
          label="Role"
          sx={{
            color: "#fff",
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
