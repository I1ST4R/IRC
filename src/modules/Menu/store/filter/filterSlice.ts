import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterState } from './filterTypes';
import { checkIsInitial } from './checkIsInitial';
import { rootReducer } from '@/App/store';

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
  selectors:{
    selectFilter : (state ) => state,
    selectPriceRangeMin : (state) => state.filterParams.priceRange.min,
    selectPriceRangeMax : (state) => state.filterParams.priceRange.max,
    selectTagsId : (state) => state.filterParams.tagsId,
    selectFilterLoading : (state) => state.loading,
    selectIsInitial : (state) => state.isInitial,
    selectFilterError : (state) => state.error
  },
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
}).injectInto(rootReducer)



export const { setPriceRange, toggleTag, resetFilters } = filterSlice.actions
export const { 
  selectFilter, 
  selectPriceRangeMin, 
  selectPriceRangeMax,
  selectTagsId,
  selectFilterLoading,
  selectIsInitial,
  selectFilterError
} = filterSlice.selectors
export default filterSlice.reducer; 