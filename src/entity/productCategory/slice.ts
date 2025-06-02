import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CategoriesState, Category } from "./types"

const initialState: CategoriesState = {
  categories: [],
  isLoading: false,
  error: null
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  }
});

export const {
  setCategories,
  setLoading,
  setError
} = categoriesSlice.actions;

export default categoriesSlice.reducer; 