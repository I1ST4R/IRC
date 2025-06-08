import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getTagsById } from '../../services/api';
import { Tag, TagState } from './types';

const initialState: TagState = {
  tags: [],
  loading: false,
  error: null
};

export const fetchTagsById = createAsyncThunk(
  'tags/fetchByIds',
  async (tagsId: string[]) => {
    try {
      const tags = await getTagsById(tagsId);
      return tags;
    } catch (error) {
      console.error('Error fetching tags:', error);
      throw error;
    }
  }
);

const tagSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTagsById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTagsById.fulfilled, (state, action) => {
        state.tags = action.payload;
        state.loading = false;
      })
      .addCase(fetchTagsById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch tags';
      });
  }
});

export default tagSlice.reducer; 