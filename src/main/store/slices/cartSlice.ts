import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCart, addToCart, removeFromCart, updateCartItemQuantity } from '../../../services/api';

interface CartState {
  items: Array<{
    productId: string;
    quantity: number;
  }>;
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: [],
  loading: false,
  error: null
};

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

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.items = [];
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch cart
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
      // Add item
      .addCase(addItemToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add item to cart';
      })
      // Remove item
      .addCase(removeItemFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(removeItemFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to remove item from cart';
      })
      // Update quantity
      .addCase(updateItemQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateItemQuantity.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(updateItemQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update item quantity';
      });
  }
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer; 