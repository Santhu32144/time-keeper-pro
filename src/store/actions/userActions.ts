import { createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { AppUser, UserState } from '../types';

export const createUserAsync = createAsyncThunk(
  'users/create',
  async (
    user: { username: string; email: string; password: string; role: AppUser['role']; managerId?: string },
    { getState, rejectWithValue }
  ) => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const state = getState() as { users: UserState };
    const existingUser = state.users.users.find(
      (u) => u.email === user.email || u.username === user.username
    );

    if (existingUser) {
      return rejectWithValue('User with this email or username already exists.');
    }

    const newUser: AppUser = {
      id: uuidv4(),
      username: user.username,
      email: user.email,
      role: user.role,
      managerId: user.managerId,
      createdAt: new Date().toISOString(),
    };

    return newUser;
  }
);

export const updateUserAsync = createAsyncThunk(
  'users/update',
  async (user: AppUser, { rejectWithValue }) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return user;
  }
);

export const deleteUserAsync = createAsyncThunk(
  'users/delete',
  async (userId: string, { rejectWithValue }) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return userId;
  }
);

export const assignManagerAsync = createAsyncThunk(
  'users/assignManager',
  async ({ userId, managerId }: { userId: string; managerId: string }, { rejectWithValue }) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return { userId, managerId };
  }
);
