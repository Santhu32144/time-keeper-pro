import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'manager' | 'employee';
  managerId?: string;
  createdAt: string;
}

interface AuthState {
  currentUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  registeredUsers: User[];
}

const initialState: AuthState = {
  currentUser: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  registeredUsers: [],
};

export const loginAsync = createAsyncThunk(
  'auth/login',
  async ({ emailOrUsername, password }: { emailOrUsername: string; password: string }, { getState, rejectWithValue }) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    const state = getState() as { auth: AuthState };
    const user = state.auth.registeredUsers.find(
      (u) => u.email === emailOrUsername || u.username === emailOrUsername
    );
    
    if (!user) {
      return rejectWithValue('User not found. Please register first.');
    }
    
    // In a real app, you'd verify the password here
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

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.currentUser = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(registerAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerAsync.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.registeredUsers.push(action.payload);
        state.currentUser = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
