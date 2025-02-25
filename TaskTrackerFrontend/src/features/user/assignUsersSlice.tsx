import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../app/store';

// Define your models
export interface Project {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: number;
  // You may add userProjects and tasks if needed
}

export interface User {
  id: number;
  name: string;
  email: string;
  // other properties if needed
}

export interface AssignUsersState {
  projects: Project[];
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: AssignUsersState = {
  projects: [],
  users: [],
  loading: false,
  error: null,
};

// Fetch Projects thunk
export const fetchProjects = createAsyncThunk<
  Project[],
  void,
  { state: RootState; rejectValue: string }
>(
  'assignUsers/fetchProjects',
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token; // Adjust if your token is stored differently
      const response = await axios.get<Project[]>('http://localhost:5148/api/projects', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      let errMsg = 'Failed to fetch projects';
      if (axios.isAxiosError(error) && error.response) {
        errMsg = (error.response.data as string) || errMsg;
      }
      return rejectWithValue(errMsg);
    }
  }
);

// Fetch Users thunk  
// NOTE: You need to add a GET endpoint for users in your API (e.g., UsersController)
export const fetchUsers = createAsyncThunk<
  User[],
  void,
  { state: RootState; rejectValue: string }
>(
  'assignUsers/fetchUsers',
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.get<User[]>('http://localhost:5148/api/users', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      let errMsg = 'Failed to fetch users';
      if (axios.isAxiosError(error) && error.response) {
        errMsg = (error.response.data as string) || errMsg;
      }
      return rejectWithValue(errMsg);
    }
  }
);

// Assign Users To Project thunk
export const assignUsersToProject = createAsyncThunk<
  { projectId: number; userIds: number[] },
  { projectId: number; userIds: number[] },
  { state: RootState; rejectValue: string }
>(
  'assignUsers/assignUsersToProject',
  async ({ projectId, userIds }, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      await axios.post(
        'http://localhost:5148/api/projects/assign',
        { projectId, userIds },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return { projectId, userIds };
    } catch (error) {
      let errMsg = 'Failed to assign users';
      if (axios.isAxiosError(error) && error.response) {
        errMsg = (error.response.data as string) || errMsg;
      }
      return rejectWithValue(errMsg);
    }
  }
);

const assignUsersSlice = createSlice({
  name: 'assignUsers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Projects
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch projects';
      })
      // Fetch Users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch users';
      })
      // Assign Users to Project
      .addCase(assignUsersToProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(assignUsersToProject.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(assignUsersToProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to assign users';
      });
  },
});

export default assignUsersSlice.reducer;
