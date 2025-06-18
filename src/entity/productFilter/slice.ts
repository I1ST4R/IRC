import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterState } from './types';

const initialState: FilterState = {
  filterParams: {
    priceRange: {
      min: 500,
      max: 10000
    },
    tagsId: [],
  },
  loading: 'idle',
  error: null
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setPriceRange: (state, action: PayloadAction<{ min: number; max: number }>) => {
      state.filterParams.priceRange = action.payload;
    },
    toggleTag: (state, action) => {
      const index = state.filterParams.tagsId.indexOf(action.payload);
      if (index === -1) {
        state.filterParams.tagsId.push(action.payload);
      } else {
        state.filterParams.tagsId.splice(index, 1);
      }
    },
    resetFilters: (state) => {
      state.filterParams.priceRange = initialState.filterParams.priceRange;
      state.filterParams.tagsId = initialState.filterParams.tagsId;
    }
  }
});

export const { setPriceRange, toggleTag, resetFilters } = filterSlice.actions;
export default filterSlice.reducer; 