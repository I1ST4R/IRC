import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { getCart, addToCart as addToCartApi, updateCartItemQuantity, removeFromCart as removeFromCartApi, calculateCartTotals, calculateOrderTotals } from '../../services/api';
import { CartTotals, CartState } from './types';

const initialState: CartState = {
  items: [],
  loading: 'idle',
  error: null,
  totals: {
    total: 0,
    totalWithoutDiscount: 0,
    totalDiscount: 0,
    itemsCount: 0,
    promoDiscount: 0,
    certificateDiscount: 0,
    finalTotal: 0
  },
};

export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (userId: string) => {
    try {
      const response = await getCart(userId);
      return response;
    } catch (error) {
      console.error('Error fetching cart:', error);
      throw error;
    }
  }
);

export const fetchCartTotals = createAsyncThunk(
  'cart/fetchCartTotals',
  async (userId: string) => {
    try {
      const totals = await calculateCartTotals(userId);
      return totals;
    } catch (error) {
      console.error('Error fetching cart totals:', error);
      throw error;
    }
  }
);

export const fetchOrderTotals = createAsyncThunk(
  'cart/fetchOrderTotals',
  async ({ userId, promoCode, certificateCode }: { userId: string; promoCode?: string; certificateCode?: string }) => {
    try {
      console.log('Fetching order totals with params:', { userId, promoCode, certificateCode });
      const totals = await calculateOrderTotals(userId, promoCode, certificateCode);
      console.log('Received totals:', totals);
      return totals;
    } catch (error) {
      console.error('Error fetching order totals:', error);
      throw error;
    }
  }
);

export const addToCart = createAsyncThunk(
  'cart/addItem',
  async ({ userId, productId }: { userId: string; productId: string }) => {
    try {
      const response = await addToCartApi(userId, productId);
      return response;
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  }
);

export const updateCartItem = createAsyncThunk(
  'cart/updateItem',
  async ({ userId, productId, quantity }: { userId: string; productId: string; quantity: number }) => {
    try {
      const response = await updateCartItemQuantity(userId, productId, quantity);
      return response;
    } catch (error) {
      console.error('Error updating cart item:', error);
      throw error;
    }
  }
);

export const removeFromCart = createAsyncThunk(
  'cart/removeItem',
  async ({ userId, productId }: { userId: string; productId: string }) => {
    try {
      await removeFromCartApi(userId, productId);
      return productId;
    } catch (error) {
      console.error('Error removing from cart:', error);
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
      state.totals = {
        total: 0,
        totalWithoutDiscount: 0,
        totalDiscount: 0,
        itemsCount: 0,
        promoDiscount: 0,
        certificateDiscount: 0,
        finalTotal: 0
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Failed to fetch cart';
      })
      // Fetch cart totals
      .addCase(fetchCartTotals.fulfilled, (state, action) => {
        if (!action.payload) {
          state.totals = initialState.totals;
          return;
        }
        state.totals = {
          ...action.payload,
          promoDiscount: 0,
          certificateDiscount: 0,
          finalTotal: action.payload.total
        } as CartTotals;
      })
      // Fetch order totals
      .addCase(fetchOrderTotals.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(fetchOrderTotals.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        if (!action.payload) {
          state.totals = initialState.totals;
          return;
        }
        state.totals = {
          total: action.payload.total,
          totalWithoutDiscount: action.payload.totalWithoutDiscount,
          totalDiscount: action.payload.totalDiscount,
          itemsCount: action.payload.itemsCount,
          promoDiscount: action.payload.promoDiscount || 0,
          certificateDiscount: action.payload.certificateDiscount || 0,
          finalTotal: action.payload.finalTotal || action.payload.total
        };
      })
      .addCase(fetchOrderTotals.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Failed to fetch order totals';
        state.totals = initialState.totals;
      })
      // Add to cart
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      // Update cart item
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      // Remove from cart
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.product.id !== action.payload);
      })
  }
});

export const { clearCart} = cartSlice.actions;
export default cartSlice.reducer; 