// features/user/userSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User, LoginData, RegisterData } from './types';
import { api } from '../api';

interface UserState {
  currentUser: User | null;
  isAuthenticated: boolean;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UserState = {
  currentUser: null,
  isAuthenticated: false,
  loading: 'idle',
  error: null,
};

// Асинхронные действия для работы с json-server
export const loginUser = createAsyncThunk(
  'user/login',
  async (credentials: { login: string; password: string }, { rejectWithValue }) => {
    try {
      // Ищем пользователя по логину и паролю
      const response = await api.get(
        `/users?login=${credentials.login}&password=${credentials.password}`
      );
      
      if (response.data.length === 0) {
        return rejectWithValue('Неверный логин или пароль');
      }
      
      return response.data[0]; // Возвращаем первого найденного пользователя
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка входа');
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  'user/fetchCurrent',
  async (userId: number, { rejectWithValue }) => {
    try {
      const response = await api.get(`/users/${userId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch user');
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (userData: RegisterData, { rejectWithValue }) => {
    try {
      // Проверяем, нет ли уже такого пользователя
      const existingUsers = await api.get<User[]>(`/users?login=${userData.login}`);
      
      if (existingUsers.data.length) {
        return rejectWithValue('Пользователь с таким логином уже существует');
      }
      
      // Создаем нового пользователя
      const newUser = {
        ...userData,
        id: Math.random().toString(36).substring(2, 9),
        type: 'user' as const,
      };
      
      const response = await api.post<User>('/users', newUser);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка регистрации');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      // Просто очищаем данные, так как json-server не поддерживает logout
      return null;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка выхода');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.currentUser) {
        state.currentUser = { ...state.currentUser, ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.currentUser = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload as string;
      })
      
      .addCase(registerUser.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.currentUser = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload as string;
      })
      
      .addCase(logoutUser.fulfilled, (state) => {
        state.currentUser = null;
        state.isAuthenticated = false;
        state.loading = 'idle';
      })
      
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.currentUser = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.loading = 'failed';
        state.currentUser = null;
        state.isAuthenticated = false;
      });
  },
});

export const { clearError, updateUser } = userSlice.actions;
export default userSlice.reducer;