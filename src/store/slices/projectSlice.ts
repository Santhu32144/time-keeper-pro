import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export interface Project {
  id: string;
  name: string;
  code: string;
  startDate: string;
  createdAt: string;
  createdBy: string;
  status: 'active' | 'completed' | 'on-hold';
}

interface ProjectState {
  projects: Project[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ProjectState = {
  projects: [],
  isLoading: false,
  error: null,
};

export const createProjectAsync = createAsyncThunk(
  'projects/create',
  async (
    project: Omit<Project, 'id' | 'createdAt' | 'status'>,
    { rejectWithValue }
  ) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    const newProject: Project = {
      ...project,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      status: 'active',
    };
    
    return newProject;
  }
);

export const updateProjectAsync = createAsyncThunk(
  'projects/update',
  async (project: Project, { rejectWithValue }) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return project;
  }
);

export const deleteProjectAsync = createAsyncThunk(
  'projects/delete',
  async (projectId: string, { rejectWithValue }) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return projectId;
  }
);

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    clearProjectError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProjectAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createProjectAsync.fulfilled, (state, action: PayloadAction<Project>) => {
        state.isLoading = false;
        state.projects.push(action.payload);
      })
      .addCase(createProjectAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateProjectAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProjectAsync.fulfilled, (state, action: PayloadAction<Project>) => {
        state.isLoading = false;
        const index = state.projects.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.projects[index] = action.payload;
        }
      })
      .addCase(deleteProjectAsync.fulfilled, (state, action: PayloadAction<string>) => {
        state.projects = state.projects.filter((p) => p.id !== action.payload);
      });
  },
});

export const { clearProjectError } = projectSlice.actions;
export default projectSlice.reducer;
