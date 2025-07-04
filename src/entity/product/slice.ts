import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProducts, getProductById } from '@/services/api';
import { FilterParams } from '../productFilter/types';
import { Product } from './types';
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

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ page, filter }: { page: number; filter?: FilterParams }) => {
    const response = await getProducts(page, filter);
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
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = 'pending';
        state.currentProduct = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.currentProduct = action.payload;
        const existingProductIndex = state.items.findIndex(item => item.id === action.payload.id);
        if (existingProductIndex === -1) {
          state.items.push(action.payload);
        } else {
          state.items[existingProductIndex] = action.payload;
        }
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Failed to fetch product';
        state.currentProduct = null;
      });
  },
});

export const { setFilters, resetProducts } = productsSlice.actions;
export default productsSlice.reducer;