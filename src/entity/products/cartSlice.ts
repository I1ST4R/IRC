import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCart, addToCart, removeFromCart, updateCartItemQuantity } from '../../services/api';

interface CartItem {
  productId: string;
  quantity: number;
  // другие поля товара...
}

interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
}

export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (userId: string) => {
    try {
      const cart = await getCart(userId);
      return cart;
    } catch (error) {
      console.error('Error fetching cart:', error);
      throw error;
    }
  }
);

export const addItemToCart = createAsyncThunk(
  'cart/addItem',
  async ({ userId, productId }: { userId: string; productId: string }) => {
    try {
      const cart = await addToCart(userId, productId);
      return cart;
    } catch (error) {
      console.error('Error adding item to cart:', error);
      throw error;
    }
  }
);

export const removeItemFromCart = createAsyncThunk(
  'cart/removeItem',
  async ({ userId, productId }: { userId: string; productId: string }) => {
    try {
      const cart = await removeFromCart(userId, productId);
      return cart;
    } catch (error) {
      console.error('Error removing item from cart:', error);
      throw error;
    }
  }
);

export const updateItemQuantity = createAsyncThunk(
  'cart/updateQuantity',
  async ({ userId, productId, quantity }: { userId: string; productId: string; quantity: number }) => {
    try {
      const cart = await updateCartItemQuantity(userId, productId, quantity);
      return cart;
    } catch (error) {
      console.error('Error updating item quantity:', error);
      throw error;
    }
  }
);

export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async (userId: string) => {
    try {
      // Получаем все товары в корзине
      const cart = await getCart(userId);
      
      // Удаляем каждый товар по отдельности
      for (const item of cart) {
        await removeFromCart(userId, item.productId);
      }
      
      return userId;
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    loading: false,
    error: null
  } as CartState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch cart';
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(updateItemQuantity.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(clearCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.loading = false;
        state.items = [];
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to clear cart';
      });
  }
});

export default cartSlice.reducer; 