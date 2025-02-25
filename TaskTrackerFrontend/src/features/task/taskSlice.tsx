import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../app/store';

export interface Task {
  id: number;
  name: string;
  description: string;
  dueDate: string;
  status: number;
  projectId: number;
  assignedToUserId: number;
}

interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
};

export const createTask = createAsyncThunk<
  Task,
  {
    name: string;
    description: string;
    dueDate: string;
    status: number;
    projectId: number;
    assignedToUserId: number;
  },
  { state: RootState; rejectValue: string }
>(
  'tasks/createTask',
  async (taskData, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.post<Task>('http://localhost:5148/api/tasks', taskData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: unknown) {
      let errMsg = 'Failed to create task';
      if (axios.isAxiosError(error) && error.response) {
        // Check if error.response.data is a string or object
        if (typeof error.response.data === 'string') {
          errMsg = error.response.data;
        } else if (typeof error.response.data === 'object') {
          // Try extracting a specific error property if available
          errMsg = (error.response.data.message as string) || JSON.stringify(error.response.data);
        }
      }
      return rejectWithValue(errMsg);
    }
  }
);


export const updateTask = createAsyncThunk<
  void,
  { id: number; updatedTask: Partial<Task> },
  { state: RootState; rejectValue: string }
>(
  'tasks/updateTask',
  async ({ id, updatedTask }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      await axios.put(`http://localhost:5148/api/tasks/${id}`, updatedTask, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error: any) {
      let errMsg = 'Failed to update task';
      if (axios.isAxiosError(error) && error.response) {
        errMsg = error.response.data || errMsg;
      }
      return rejectWithValue(errMsg);
    }
  }
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error creating task';
      })
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error updating task';
      });
  },
});

export default tasksSlice.reducer;
