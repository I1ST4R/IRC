import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TagState, Tag } from './types';

const initialState: TagState = {
  tags: [],
  loading: false,
  error: null
};

const tagSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {

    fetchTagsRequest: (state, action: PayloadAction<string[]>) => {
      state.loading = true;
      state.error = null;
    },
    
    fetchTagsSuccess: (state, action: PayloadAction<Tag[]>) => {
      state.tags = action.payload;
      state.loading = false;
    },
    
    fetchTagsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    clearTags: (state) => {
      state.tags = [];
      state.error = null;
    },
    
    setTags: (state, action: PayloadAction<Tag[]>) => {
      state.tags = action.payload;
    }
  }
});

export const { 
  fetchTagsRequest, 
  fetchTagsSuccess, 
  fetchTagsFailure,
  clearTags,
  setTags
} = tagSlice.actions;

export default tagSlice.reducer;