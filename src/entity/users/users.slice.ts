// features/user/userSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import { User, LoginData, RegisterData, UserState } from './types';
import { fetchCart } from '../../products/cartSlice';

const initialState: UserState = {
  user: null,
  loading: 'idle',
  error: null,
  likedIds: [],
};

export const login = createAsyncThunk(
  'user/login',
  async (data: LoginData, { rejectWithValue }) => {
    try {
      const response = await api.get<User[]>(`/users?login=${data.login}`);
      if (response.data.length === 0) {
        return rejectWithValue('User not found');
      }
      const user = response.data[0];
      if (user.password !== data.password) {
        return rejectWithValue('Invalid password');
      }
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword as User;
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else if (error.message) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to login');
    }
  }
);

export const register = createAsyncThunk(
  'user/register',
  async (data: RegisterData, { rejectWithValue }) => {
    try {
      const existingByLogin = await api.get<User[]>(`/users?login=${data.login}`);
      if (existingByLogin.data.length > 0) {
        return rejectWithValue('Login already exists');
      }
      const existingByEmail = await api.get<User[]>(`/users?email=${data.email}`);
      if (existingByEmail.data.length > 0) {
        return rejectWithValue('Email already exists');
      }

      const response = await api.post<User>('/users', data);
      const { password, ...userWithoutPassword } = response.data;
      return userWithoutPassword as User;
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else if (error.message) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to register');
    }
  }
);

export const checkAuth = createAsyncThunk(
  'user/checkAuth',
  async (_, { rejectWithValue, fulfillWithValue }) => {
    console.log('[userSlice] checkAuth started');
    try {
      const userId = localStorage.getItem('userId');
      console.log('[userSlice] checkAuth: userId from localStorage:', userId);
      if (!userId) {
        console.log('[userSlice] checkAuth: No userId in localStorage, rejecting...');
        return rejectWithValue('No user ID found in storage');
      }
      console.log(`[userSlice] checkAuth: Found userId ${userId}, attempting to fetch user...`);
      const response = await api.get<User[]>(`/users?id=${userId}`);
      console.log('[userSlice] checkAuth: API response received for /users?id=', response.data);
      if (response.data.length === 0) {
        console.log('[userSlice] checkAuth: User not found by ID, rejecting...');
        return rejectWithValue('User not found by stored ID');
      }
      const user = response.data[0];
      const { password, ...userWithoutPassword } = user;
      console.log('[userSlice] checkAuth: User found, fulfilling with:', userWithoutPassword);
      return fulfillWithValue(userWithoutPassword as User);
    } catch (error: any) {
      console.error('[userSlice] checkAuth: CATCH block error:', error);
      if (error.response && error.response.data && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else if (error.message) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to check auth due to an unexpected error');
    }
  }
);

export const fetchUserLikes = createAsyncThunk(
  'user/fetchLikes',
  async (userId: string) => {
    const { data } = await api.get(`/users?id=${userId}`);
    return data[0]?.liked?.map((item: { productId: string }) => item.productId) || [];
  }
);

export const toggleLike = createAsyncThunk(
  'user/toggleLike',
  async ({ userId, productId, likedIds }: { userId: string, productId: string, likedIds: string[] }) => {
    let newLiked;
    if (likedIds.includes(productId)) {
      newLiked = likedIds.filter(id => id !== productId);
    } else {
      newLiked = [...likedIds, productId];
    }
    await api.patch(`/users/${userId}`, {
      liked: newLiked.map(id => ({ productId: id }))
    });
    const { data } = await api.get(`/users?id=${userId}`);
    return data[0]?.liked?.map((item: { productId: string }) => item.productId) || [];
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
      localStorage.removeItem('userId');
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
        console.log('[userSlice] login.fulfilled, new user state:', JSON.parse(JSON.stringify(action.payload)));
        if (action.payload && action.payload.id) {
          localStorage.setItem('userId', action.payload.id.toString());
        }
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
        console.log('[userSlice] checkAuth.pending');
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        console.log('[userSlice] checkAuth.fulfilled, payload:', action.payload);
        state.loading = 'succeeded';
        state.user = action.payload;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        console.log('[userSlice] checkAuth.rejected, payload (error message):', action.payload);
        state.loading = 'failed';
        state.error = action.payload as string;
        state.user = null;
        localStorage.removeItem('userId');
        console.log('[userSlice] checkAuth.rejected, user set to null, userId removed from localStorage');
      })
      .addCase(fetchUserLikes.fulfilled, (state, action) => {
        state.likedIds = action.payload;
      })
      .addCase(toggleLike.fulfilled, (state, action) => {
        state.likedIds = action.payload;
      });
  }
});

export const { logout, clearError } = userSlice.actions;
export default userSlice.reducer;