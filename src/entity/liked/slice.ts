import { createSlice } from '@reduxjs/toolkit';
import { LikedState } from './types'

const likedSlice = createSlice({
  name: 'liked',
  initialState: {
    items: [],
    loading: 'idle',
    error: null
  } as LikedState,
  reducers: {
    clearLikedOnLogout: (state) => {
      state.items = [];
      state.loading = 'succeeded';
      state.error = null;
    }
  },
});

export const { clearLikedOnLogout } = likedSlice.actions;
export default likedSlice.reducer; 