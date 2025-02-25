import React, { useEffect, useState } from 'react';
import { 
  Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, 
  FormControl, InputLabel, Select, MenuItem, OutlinedInput, Checkbox, ListItemText 
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../app/store'; // Adjust path as needed
import { fetchProjects, fetchUsers, assignUsersToProject } from '../features/user/assignUsersSlice';

interface AssignUsersFormProps {
  open: boolean;
  handleClose: () => void;
}

const AssignUsersForm: React.FC<AssignUsersFormProps> = ({ open, handleClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { projects, users, loading, error } = useSelector((state: RootState) => state.assignUser);

  const [selectedProject, setSelectedProject] = useState<number | ''>('');
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

  useEffect(() => {
    if (open) {
      dispatch(fetchProjects());
      dispatch(fetchUsers());
    }
  }, [open, dispatch]);

  const handleSubmit = () => {
    if (selectedProject === '' || selectedUsers.length === 0) {
      alert('Please select a project and at least one user.');
      return;
    }
    dispatch(assignUsersToProject({ projectId: selectedProject as number, userIds: selectedUsers }))
      .unwrap()
      .then(() => {
        alert('Users assigned successfully!');
        handleClose();
      })
      .catch((err) => {
        alert(`Error: ${err}`);
      });
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <Box sx={{ backgroundColor: '#1E1E1E', color: '#fff', borderRadius: 3, p: 2 }}>
        <DialogTitle sx={{ color: '#FF3B5C', textAlign: 'center', fontWeight: 'bold' }}>
          Assign Users to Project
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <>
              <FormControl fullWidth margin="normal">
                <InputLabel sx={{ color: 'gray' }}>Select Project</InputLabel>
                <Select
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value as number)}
                  sx={{ color: '#fff', '& .MuiOutlinedInput-notchedOutline': { borderColor: '#444' } }}
                >
                  {projects.map((project) => (
                    <MenuItem key={project.id} value={project.id}>
                      {project.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel sx={{ color: 'gray' }}>Select Users</InputLabel>
                <Select
                  multiple
                  value={selectedUsers}
                  onChange={(e) => setSelectedUsers(e.target.value as number[])}
                  input={<OutlinedInput />}
                  renderValue={(selected) =>
                    users
                      .filter((user) => (selected as number[]).includes(user.id))
                      .map((user) => user.name)
                      .join(', ')
                  }
                  sx={{ color: '#fff', '& .MuiOutlinedInput-notchedOutline': { borderColor: '#444' } }}
                >
                  {users.map((user) => (
                    <MenuItem key={user.id} value={user.id}>
                      <Checkbox checked={selectedUsers.indexOf(user.id) > -1} />
                      <ListItemText primary={user.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button onClick={handleClose} sx={{ color: '#FF3B5C' }}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{ backgroundColor: '#FF3B5C', '&:hover': { backgroundColor: '#ff1f47' } }}
          >
            Assign
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default AssignUsersForm;