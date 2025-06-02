import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addToLiked, getLiked, removeFromLiked } from '@/services/api';
import { LikedState } from './types'

export const fetchLiked = createAsyncThunk(
  'liked/fetchLiked',
  async (userId: string) => {
    try {
      const liked = await getLiked(userId);
      return liked;
    } catch (error) {
      console.error('Error fetching liked:', error);
      throw error;
    }
  }
);

export const addItemToLiked = createAsyncThunk(
  'liked/addItem',
  async ({ userId, productId }: { userId: string; productId: string }) => {
    try {
      const liked = await addToLiked(userId, productId);
      return liked;
    } catch (error) {
      console.error('Error adding item to liked:', error);
      throw error;
    }
  }
);

export const removeItemFromLiked = createAsyncThunk(
  'liked/removeItem',
  async ({ userId, productId }: { userId: string; productId: string }) => {
    try {
      const liked = await removeFromLiked(userId, productId);
      return liked;
    } catch (error) {
      console.error('Error removing item from liked:', error);
      throw error;
    }
  }
);

const likedSlice = createSlice({
  name: 'liked',
  initialState: {
    items: [],
    loading: false,
    error: null
  } as LikedState,
  reducers: {
    clearLikedOnLogout: (state) => {
      console.log('[likedSlice] Before clearLikedOnLogout:', JSON.parse(JSON.stringify(state.items)));
      state.items = [];
      state.loading = false;
      state.error = null;
      console.log('[likedSlice] After clearLikedOnLogout:', JSON.parse(JSON.stringify(state.items)));
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLiked.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLiked.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        console.log('[likedSlice] fetchLiked.fulfilled payload:', JSON.parse(JSON.stringify(action.payload)));
      })
      .addCase(fetchLiked.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch liked';
      })
      .addCase(addItemToLiked.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(removeItemFromLiked.fulfilled, (state, action) => {
        state.items = action.payload;
      })
  }
});

export const { clearLikedOnLogout } = likedSlice.actions;
export default likedSlice.reducer; 