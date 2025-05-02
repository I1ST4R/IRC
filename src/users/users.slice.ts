// features/user/userSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../services/api';
import { User, LoginData, RegisterData } from './types';

interface UserState {
  user: User | null;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: 'idle',
  error: null
};

export const login = createAsyncThunk(
  'user/login',
  async (data: LoginData, { rejectWithValue }) => {
    try {
      const response = await api.post<User>('/auth/login', data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to login');
    }
  }
);

export const register = createAsyncThunk(
  'user/register',
  async (data: RegisterData, { rejectWithValue }) => {
    try {
      const response = await api.post<User>('/auth/register', data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to register');
    }
  }
);

export const checkAuth = createAsyncThunk(
  'user/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<User>('/auth/me');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to check auth');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.loading = 'idle';
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload as string;
      })
      .addCase(register.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload as string;
      })
      .addCase(checkAuth.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.user = action.payload;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload as string;
      });
  }
});

export const { logout, clearError } = userSlice.actions;
export default userSlice.reducer;