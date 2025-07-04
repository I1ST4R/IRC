// features/user/userSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login as apiLogin, register as apiRegister, checkAuth as apiCheckAuth} from '@/services/api';
import { LoginData, RegisterData, UserState } from './types';

const initialState: UserState = {
  id: null,
  login: null,
  email: null,
  password: null,
  type: null,
  cart: [],
  liked: [],
  isAccountOpen: false,
  loading: 'idle',
  error: null
};

export const login = createAsyncThunk(
  'user/login',
  async (data: LoginData, { dispatch, rejectWithValue }) => {
    try {
      const user = await apiLogin(data);
      if (user && user.id) localStorage.setItem('userId', String(user.id));
      return user;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка при входе');
    }
  }
);

export const register = createAsyncThunk(
  'user/register',
  async (data: RegisterData, { rejectWithValue }) => {
    try {
      const user = await apiRegister(data);
      if (user && user.id) {
        localStorage.setItem('userId', String(user.id));
      }
      return user;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка при регистрации');
    }
  }
);

export const checkAuth = createAsyncThunk(
  'user/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        return null;
      }
      const user = await apiCheckAuth(userId);
      return user;
    } catch (error: any) {
      localStorage.removeItem('userId');
      return rejectWithValue(error.message || 'Ошибка при проверке авторизации');
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logout: (state) => {
      state.id = null;
      state.login = null;
      state.email = null;
      state.type = null;
      state.cart = [];
      state.liked = [];
      localStorage.removeItem('userId');
    },
    clearError: (state) => {
      state.error = null;
    },
    openAccount: (state) => {
      state.isAccountOpen = true
    },
    closeAccount: (state) => {
      state.isAccountOpen = false
    }
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload) {  
          state.loading = 'succeeded';
          state.id = String(action.payload.id);
          state.login = action.payload.login;
          state.password = action.payload.password;
          state.type = action.payload.type;
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload as string;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        if (action.payload) {
          state.id = String(action.payload.id);
          state.login = action.payload.login;
          state.email = action.payload.email;
          state.type = action.payload.type;
        }
      })
      // Register
      .addCase(register.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        if (action.payload) {  
          state.loading = 'succeeded';
          state.id = String(action.payload.id);
          state.login = action.payload.login;
          state.password = action.payload.password;
          state.type = action.payload.type;
        }
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload as string;
      })
  }
});

export const { logout, clearError, openAccount, closeAccount } = usersSlice.actions;
export default usersSlice.reducer;