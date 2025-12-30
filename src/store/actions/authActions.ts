import { createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { User, AuthState } from '../types';

export const loginAsync = createAsyncThunk(
  'auth/login',
  async (
    { emailOrUsername, password }: { emailOrUsername: string; password: string },
    { getState, rejectWithValue }
  ) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const state = getState() as { auth: AuthState };
    const user = state.auth.registeredUsers.find(
      (u) => u.email === emailOrUsername || u.username === emailOrUsername
    );

    if (!user) {
      return rejectWithValue('User not found. Please register first.');
    }

    return user;
  }
);

export const registerAsync = createAsyncThunk(
  'auth/register',
  async (
    { username, email, password }: { username: string; email: string; password: string },
    { getState, rejectWithValue }
  ) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const state = getState() as { auth: AuthState };
    const existingUser = state.auth.registeredUsers.find(
      (u) => u.email === email || u.username === username
    );

    if (existingUser) {
      return rejectWithValue('User with this email or username already exists.');
    }

    const newUser: User = {
      id: uuidv4(),
      username,
      email,
      role: 'employee',
      createdAt: new Date().toISOString(),
    };

    return newUser;
  }
);
