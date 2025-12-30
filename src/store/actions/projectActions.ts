import { createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { Project } from '../types';

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
