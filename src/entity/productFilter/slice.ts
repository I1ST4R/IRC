import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterState } from './types';
import { Tag } from '../productCategory/types';

const initialState: FilterState = {
  filterParams: {
    priceRange: {
      min: 500,
      max: 10000
    },
    tags: [],
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
    toggleTag: (state, action: PayloadAction<Tag>) => {
      const index = state.filterParams.tags.indexOf(action.payload);
      if (index === -1) {
        state.filterParams.tags.push(action.payload);
      } else {
        state.filterParams.tags.splice(index, 1);
      }
    },
    resetFilters: (state) => {
      state.filterParams.priceRange = initialState.filterParams.priceRange;
      state.filterParams.tags = initialState.filterParams.tags;
    }
  }
});

export const { setPriceRange, toggleTag, resetFilters } = filterSlice.actions;
export default filterSlice.reducer; 