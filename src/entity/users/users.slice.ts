// features/user/userSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login as apiLogin, register as apiRegister, checkAuth as apiCheckAuth, getCart, addToCart, removeFromCart, updateCartItemQuantity, getLiked, addToLiked, removeFromLiked } from '@/services/api';
import { CartItem, LikedItem } from '@/services/types';
import { LoginData, RegisterData } from './types';

interface UserState {
  id: string | null;
  login: string | null;
  email: string | null;
  type: string | null;
  cart: CartItem[];
  liked: LikedItem[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  id: null,
  login: null,
  email: null,
  type: null,
  cart: [],
  liked: [],
  loading: false,
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
    }
  },
  extraReducers: (builder) => {
    builder
      // Auth reducers
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.id = String(action.payload.id);
        state.login = action.payload.login;
        state.email = action.payload.email;
        state.type = action.payload.type;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.id = String(action.payload.id);
        state.login = action.payload.login;
        state.email = action.payload.email;
        state.type = action.payload.type;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
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
      // Cart reducers
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.cart = [];
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      // Liked reducers
      .addCase(fetchLiked.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLiked.fulfilled, (state, action) => {
        state.loading = false;
        state.liked = action.payload;
      })
      .addCase(fetchLiked.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch liked items';
      })
      .addCase(addItemToLiked.fulfilled, (state, action) => {
        state.liked = action.payload;
      })
      .addCase(removeItemFromLiked.fulfilled, (state, action) => {
        state.liked = action.payload;
      });
  }
});

export const { logout, clearError } = usersSlice.actions;
export default usersSlice.reducer;