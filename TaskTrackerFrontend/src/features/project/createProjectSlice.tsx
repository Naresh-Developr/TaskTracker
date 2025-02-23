import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface Project {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: number;
}

interface ProjectState {
  project?: Project;
  loading: boolean;
  error?: string;
}

const initialState: ProjectState = {
  loading: false,
};

export const createProject = createAsyncThunk(
  'project/createProject',
  async (projectData: Project, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      console.log(token);
      const response = await fetch('http://localhost:5148/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProject.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(createProject.fulfilled, (state, action: PayloadAction<Project>) => {
        state.loading = false;
        state.project = action.payload;
      })
      .addCase(createProject.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default projectSlice.reducer;
