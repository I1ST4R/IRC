import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PriceRange {
  min: number;
  max: number;
}

interface SelectedTag {
  categoryId: string;
  tagId: string;
}

export interface FilterState {
  priceRange: PriceRange;
  selectedTags: SelectedTag[];
  isLoading: boolean;
  error: string | null;
}

const initialState: FilterState = {
  priceRange: {
    min: 500,
    max: 10000
  },
  selectedTags: [],
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
    toggleTag: (state, action: PayloadAction<SelectedTag>) => {
      const index = state.selectedTags.findIndex(
        tag => tag.categoryId === action.payload.categoryId && tag.tagId === action.payload.tagId
      );
      
      if (index === -1) state.selectedTags.push(action.payload);
      else state.selectedTags.splice(index, 1);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    resetFilters: (state) => {
      state.priceRange = initialState.priceRange;
      state.selectedTags = [];
      state.error = null;
    }
  }
});

export const {
  setPriceRange,
  toggleTag,
  setLoading,
  setError,
  resetFilters
} = filterSlice.actions;

export default filterSlice.reducer; 