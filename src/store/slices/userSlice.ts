import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export interface AppUser {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'manager' | 'employee';
  managerId?: string;
  createdAt: string;
}

interface UserState {
  users: AppUser[];
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  isLoading: false,
  error: null,
};

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

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearUserError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createUserAsync.fulfilled, (state, action: PayloadAction<AppUser>) => {
        state.isLoading = false;
        state.users.push(action.payload);
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUserAsync.fulfilled, (state, action: PayloadAction<AppUser>) => {
        const index = state.users.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(deleteUserAsync.fulfilled, (state, action: PayloadAction<string>) => {
        state.users = state.users.filter((u) => u.id !== action.payload);
      })
      .addCase(assignManagerAsync.fulfilled, (state, action) => {
        const { userId, managerId } = action.payload;
        const user = state.users.find((u) => u.id === userId);
        if (user) {
          user.managerId = managerId;
        }
      });
  },
});

export const { clearUserError } = userSlice.actions;
export default userSlice.reducer;
