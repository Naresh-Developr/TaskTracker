import React from 'react';
import { Box, TextField, InputAdornment, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { CalendarToday, Description, Title } from '@mui/icons-material';

interface FormData {
  name: string;
  description: string;
  startDate: Date | null;
  endDate: Date | null;
  status: number;
}

interface CreateProjectFormProps {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDateChange: (name: string, date: Date | null) => void;
}

const CreateProjectForm: React.FC<CreateProjectFormProps> = ({
  formData,
  handleChange,
  handleDateChange,
}) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
      {/* Project Name */}
      <TextField
        label="Project Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Title sx={{ color: "#888" }} />
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

      {/* Description */}
      <TextField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        fullWidth
        multiline
        rows={4}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Description sx={{ color: "#888" }} />
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

      {/* Start Date */}
      <DatePicker
        label="Start Date"
        value={formData.startDate}
        onChange={(date) => handleDateChange("startDate", date)}
        slots={{
          textField: (params) => (
            <TextField
              {...params}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarToday sx={{ color: "#888" }} />
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
          ),
        }}
      />

      {/* End Date */}
      <DatePicker
        label="End Date"
        value={formData.endDate}
        onChange={(date) => handleDateChange("endDate", date)}
        slots={{
          textField: (params) => (
            <TextField
              {...params}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarToday sx={{ color: "#888" }} />
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
          ),
        }}
      />

      {/* Status */}
      <FormControl fullWidth>
        <InputLabel sx={{ color: "gray" }}>Status</InputLabel>
        <Select
          name="status"
          value={formData.status}
          onChange={handleChange}
          label="Status"
          sx={{
            color: "#fff",
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#444" },
              "&:hover fieldset": { borderColor: "#FF3B5C" },
            },
          }}
        >
          <MenuItem value={0}>Not Started</MenuItem>
          <MenuItem value={1}>In Progress</MenuItem>
          <MenuItem value={2}>Completed</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default CreateProjectForm;
