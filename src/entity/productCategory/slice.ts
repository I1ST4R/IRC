import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { getCategories } from '../../services/api';
import { CategoriesState, Category } from "./types"

const initialState: CategoriesState = {
  categories: [],
  loading: "idle",
  error: null
};

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    try {
      const categories = await getCategories();
      return categories;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Failed to fetch categories';
      });
  }
});

export default categoriesSlice.reducer; 