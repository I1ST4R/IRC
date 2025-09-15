import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterState } from './filterTypes';
import { checkIsInitial } from './checkIsInitial';
import { RootState } from '../menuStore';

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
    setPriceRange: (state, action: PayloadAction<number>) => {
      state.filterParams.priceRange.min = action.payload;
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

export const selectFilter = (state: RootState) => state.filter
export const selectPriceRangeMin = (state: RootState) => state.filter.filterParams.priceRange.min
export const selectPriceRangeMax = (state: RootState) => state.filter.filterParams.priceRange.max
export const selectTagsId = (state: RootState) => state.filter.filterParams.tagsId
export const selectFilterLoading = (state: RootState) => state.filter.loading
export const selectIsInitial = (state: RootState) => state.filter.isInitial
export const selectFilterError = (state: RootState) => state.filter.error

export const { setPriceRange, toggleTag, resetFilters } = filterSlice.actions
export default filterSlice.reducer; 