import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterState } from './types';

const initialState: FilterState = {
  priceRange: {
    min: 500,
    max: 10000
  },
  selectedTags: [],
  loading: 'idle',
  error: null
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setPriceRange: (state, action: PayloadAction<{ min: number; max: number }>) => {
      state.priceRange = action.payload;
    },
    toggleTag: (state, action: PayloadAction<string>) => {
      const index = state.selectedTags.indexOf(action.payload);
      if (index === -1) {
        state.selectedTags.push(action.payload);
      } else {
        state.selectedTags.splice(index, 1);
      }
    },
    resetFilters: (state) => {
      state.priceRange = initialState.priceRange;
      state.selectedTags = [];
    }
  }
});

export const { setPriceRange, toggleTag, resetFilters } = filterSlice.actions;
export default filterSlice.reducer; 