import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterState } from './types';

const initialState: FilterState = {
  priceRange: {
    min: 500,
    max: 10000
  },
  selectedLines: [],
  selectedCategories: []
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setPriceRange: (state, action: PayloadAction<{ min: number; max: number }>) => {
      state.priceRange = action.payload;
    },
    toggleLine: (state, action: PayloadAction<string>) => {
      const index = state.selectedLines.indexOf(action.payload);
      if (index === -1) {
        state.selectedLines.push(action.payload);
      } else {
        state.selectedLines.splice(index, 1);
      }
    },
    toggleCategory: (state, action: PayloadAction<string>) => {
      const index = state.selectedCategories.indexOf(action.payload);
      if (index === -1) {
        state.selectedCategories.push(action.payload);
      } else {
        state.selectedCategories.splice(index, 1);
      }
    }
  }
});

export const { setPriceRange, toggleLine, toggleCategory } = filterSlice.actions;
export default filterSlice.reducer; 