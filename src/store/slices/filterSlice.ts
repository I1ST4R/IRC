import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PriceRange {
  min: number;
  max: number;
}

interface FilterState {
  priceRange: PriceRange;
  selectedLines: string[];
  selectedCategories: string[];
  isLoading: boolean;
  error: string | null;
}

const initialState: FilterState = {
  priceRange: {
    min: 500,
    max: 10000
  },
  selectedLines: [],
  selectedCategories: [],
  isLoading: false,
  error: null
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setPriceRange: (state, action: PayloadAction<PriceRange>) => {
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
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    resetFilters: (state) => {
      state.priceRange = initialState.priceRange;
      state.selectedLines = [];
      state.selectedCategories = [];
      state.error = null;
    }
  }
});

export const {
  setPriceRange,
  toggleLine,
  toggleCategory,
  setLoading,
  setError,
  resetFilters
} = filterSlice.actions;

export default filterSlice.reducer; 