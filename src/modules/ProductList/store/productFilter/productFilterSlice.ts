import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterState } from './productFilterTypes';
import { checkIsInitial } from './checkIsInitial';
import { RootState } from '../productListStore';

export const initialState: FilterState = {
  filterParams: {
    priceRange: {
      min: 500,
      max: 10000
    },
    tagsId: [],
  },
  loading: 'idle',
  isInitial: true,
  error: null
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setPriceRange: (state, action: PayloadAction<{ min: number; max: number }>) => {
      state.filterParams.priceRange = action.payload;
      if(checkIsInitial(state)) state.isInitial = true
    },
    toggleTag: (state, action) => {
      const index = state.filterParams.tagsId.indexOf(action.payload);
      if (index === -1) {
        state.filterParams.tagsId.push(action.payload);
      } else {
        state.filterParams.tagsId.splice(index, 1);
      }
      if(checkIsInitial(state)) state.isInitial = true
    },
    resetFilters: (state) => {
      state.filterParams.priceRange = initialState.filterParams.priceRange;
      state.filterParams.tagsId = initialState.filterParams.tagsId;
      state.isInitial = true
    }
  }
});

export const { setPriceRange, toggleTag, resetFilters } = filterSlice.actions;
export const selectFilter = (state: RootState) => state.filter;
export default filterSlice.reducer; 