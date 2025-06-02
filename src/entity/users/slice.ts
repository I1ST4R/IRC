// features/user/userSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login as apiLogin, register as apiRegister, checkAuth as apiCheckAuth, getCart, addToCart, removeFromCart, updateCartItemQuantity, getLiked, addToLiked, removeFromLiked } from '@/services/api';
import { LoginData, RegisterData, UserState } from './types';

const initialState: UserState = {
  user:{
    id: null,
    login: null,
    email: null,
    password: null,
    type: null,
    cart: null,
    liked: null,
  },
  loading: 'idle',
  error: null
};

export const login = createAsyncThunk(
  'user/login',
  async (data: LoginData, { dispatch, rejectWithValue }) => {
    try {
      const user = await apiLogin(data);
      if (user && user.id) {
        localStorage.setItem('userId', String(user.id));
        // Загружаем корзину и избранное после успешного входа
        await dispatch(fetchCart(String(user.id)));
        await dispatch(fetchLiked(String(user.id)));
      }
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

// Cart actions
export const fetchCart = createAsyncThunk(
  'users/fetchCart',
  async (userId: string, { rejectWithValue }) => {
    try {
      const cart = await getCart(userId);
      return cart;
    } catch (error: any) {
      console.error('Error fetching cart:', error);
      return rejectWithValue(error.message || 'Ошибка при загрузке корзины');
    }
  }
);

export const addItemToCart = createAsyncThunk(
  'users/addToCart',
  async ({ userId, productId }: { userId: string; productId: string }, { rejectWithValue }) => {
    try {
      const cart = await addToCart(userId, productId);
      return cart;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка при добавлении в корзину');
    }
  }
);

export const removeItemFromCart = createAsyncThunk(
  'users/removeFromCart',
  async ({ userId, productId }: { userId: string; productId: string }, { rejectWithValue }) => {
    try {
      const cart = await removeFromCart(userId, productId);
      return cart;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка при удалении из корзины');
    }
  }
);

export const updateCartQuantity = createAsyncThunk(
  'users/updateCartQuantity',
  async ({ userId, productId, quantity }: { userId: string; productId: string; quantity: number }, { rejectWithValue }) => {
    try {
      const cart = await updateCartItemQuantity(userId, productId, quantity);
      return cart;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка при обновлении количества');
    }
  }
);

// Liked actions
export const fetchLiked = createAsyncThunk(
  'users/fetchLiked',
  async (userId: string, { rejectWithValue }) => {
    try {
      const liked = await getLiked(userId);
      return liked;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка при загрузке избранного');
    }
  }
);

export const addItemToLiked = createAsyncThunk(
  'users/addToLiked',
  async ({ userId, productId }: { userId: string; productId: string }, { rejectWithValue }) => {
    try {
      const liked = await addToLiked(userId, productId);
      return liked;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка при добавлении в избранное');
    }
  }
);

export const removeItemFromLiked = createAsyncThunk(
  'users/removeFromLiked',
  async ({ userId, productId }: { userId: string; productId: string }, { rejectWithValue }) => {
    try {
      const liked = await removeFromLiked(userId, productId);
      return liked;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка при удалении из избранного');
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logout: (state) => {
      state.user.id = null;
      state.user.login = null;
      state.user.email = null;
      state.user.type = null;
      state.user.cart = null;
      state.user.liked = null;
      localStorage.removeItem('userId');
    },
    clearError: (state) => {
      state.error = null;
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
        state.loading = 'succeeded';
        state.user.id = String(action.payload.id);
        state.user.login = action.payload.login;
        state.user.password = action.payload.password;
        state.user.type = action.payload.type;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload as string;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        if (action.payload) {
          state.user.id = String(action.payload.id);
          state.user.login = action.payload.login;
          state.user.email = action.payload.email;
          state.user.type = action.payload.type;
        }
      })
      // Register
      .addCase(register.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.user.id = String(action.payload.id);
        state.user.login = action.payload.login;
        state.user.email = action.payload.email;
        state.user.type = action.payload.type;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload as string;
      })
  }
});

export const { logout, clearError } = usersSlice.actions;
export default usersSlice.reducer;