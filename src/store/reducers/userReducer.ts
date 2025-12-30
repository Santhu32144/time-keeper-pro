import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState, AppUser } from '../types';
import { createUserAsync, updateUserAsync, deleteUserAsync, assignManagerAsync } from '../actions/userActions';

const initialState: UserState = {
  users: [],
  isLoading: false,
  error: null,
};

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
