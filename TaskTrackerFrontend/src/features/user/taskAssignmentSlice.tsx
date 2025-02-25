import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { createTask } from '../../features/task/taskSlice';

interface TaskAssignmentFormProps {
  open: boolean;
  handleClose: () => void;
  projectId: number;
  users: { id: number; name: string }[];
}

const TaskAssignmentForm: React.FC<TaskAssignmentFormProps> = ({
  open,
  handleClose,
  projectId,
  users,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [assignedTo, setAssignedTo] = useState<number | ''>('');
  const [status, setStatus] = useState(0); // 0: Pending, 1: In Progress, 2: Completed

  const handleSubmit = () => {
    if (!taskName || !description || !dueDate || assignedTo === '') {
      alert('Please fill in all fields');
      return;
    }
    dispatch(
      createTask({
        name: taskName,
        description,
        dueDate,
        status,
        projectId,
        assignedToUserId: assignedTo as number,
      })
    )
      .unwrap()
      .then(() => {
        alert('Task created successfully');
        handleClose();
      })
      .catch((err) => {
        alert(`Error: ${err}`);
      });
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create New Task</DialogTitle>
      <DialogContent>
        <TextField
          label="Task Name"
          fullWidth
          margin="normal"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <TextField
          label="Description"
          fullWidth
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          label="Due Date"
          type="datetime-local"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Assign To</InputLabel>
          <Select
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value as number)}
          >
            {users.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                {user.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Status</InputLabel>
          <Select
            value={status}
            onChange={(e) => setStatus(Number(e.target.value))}
          >
            <MenuItem value={0}>Pending</MenuItem>
            <MenuItem value={1}>In Progress</MenuItem>
            <MenuItem value={2}>Completed</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Create Task
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskAssignmentForm;
