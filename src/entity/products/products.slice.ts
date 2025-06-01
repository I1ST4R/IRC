import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProducts, getProductById } from '@/services/api';
import { FilterParams } from '@/services/types';
import { Product } from './types';

interface ProductsState {
  items: Product[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
  hasMore: boolean;
  currentPage: number;
  filters: FilterParams;
}

const initialState: ProductsState = {
  items: [],
  loading: 'idle',
  error: null,
  hasMore: true,
  currentPage: 1,
  filters: {
    minPrice: 0,
    maxPrice: 10000,
    tags: []  
  }
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ page, filters }: { page: number; filters?: FilterParams }) => {
    const response = await getProducts(page, filters);
    return response;
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchById',
  async (id: string) => {
    try {
      const response = await getProductById(id);
      return response;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  }
);

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
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        if (action.meta.arg.page === 1) {
          state.items = action.payload.products;
        } else {
          const existingIds = new Set(state.items.map(item => item.id));
          const newProducts = action.payload.products.filter(
            (product: Product) => !existingIds.has(product.id)
          );
          state.items = [...state.items, ...newProducts];
        }
        state.hasMore = action.payload.hasMore;
        state.currentPage = action.meta.arg.page;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Failed to fetch products';
      });
  },
});

export const { setFilters, resetProducts } = productsSlice.actions;
export default productsSlice.reducer;