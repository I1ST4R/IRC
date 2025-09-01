import { createSlice } from '@reduxjs/toolkit';
import { FilterParams } from '../productFilter/types';
import { ProductsState } from './types'

const initialState: ProductsState = {
  items: [],
  currentProduct: null,
  loading: 'idle',
  error: null,
  hasMore: true,
  currentPage: 1,
  filters: {
    priceRange: {
      min: 0,
      max: 10000
    },
    tagsId: []  
  }
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
      state.currentPage = 1;
      state.items = [];
    },
    resetProducts: (state) => {
      state.items = [];
      state.currentPage = 1;
      state.hasMore = true;
    }
  },
});

export const { setFilters, resetProducts } = productsSlice.actions;
export default productsSlice.reducer;