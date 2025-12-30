import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProjectState, Project } from '../types';
import { createProjectAsync, updateProjectAsync, deleteProjectAsync } from '../actions/projectActions';

const initialState: ProjectState = {
  projects: [],
  isLoading: false,
  error: null,
};

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
