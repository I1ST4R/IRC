import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../api';
import { Product } from "./types"

interface ProductsState {
  items: Product[];
  currentProduct: Product | null;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    hasMore: boolean;
  };
}

const initialState: ProductsState = {
  items: [],
  currentProduct: null,
  loading: 'idle',
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    hasMore: true,
  },
};

// Асинхронные действия
export const fetchProducts = createAsyncThunk(
  'products/fetchAll',
  async (params: { page?: number; limit?: number }, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/products?_page=${params.page || 1}&_limit=${params.limit || 10}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch products');
    }
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.get<Product>(`/products/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch product');
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearProductsError: (state) => {
      state.error = null;
    },
    resetCurrentProduct: (state) => {
      state.currentProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Получение списка продуктов
      .addCase(fetchProducts.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.items = action.payload;
        // Since we're using json-server, we can't get pagination info directly
        // We'll assume there are more items if we got a full page
        state.pagination = {
          page: action.meta.arg.page || 1,
          limit: action.meta.arg.limit || 10,
          hasMore: action.payload.length === (action.meta.arg.limit || 10),
        };
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload as string;
      })

      // Получение одного продукта
      .addCase(fetchProductById.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload as string;
      })
  },
});

export const { clearProductsError, resetCurrentProduct } = productsSlice.actions;
export default productsSlice.reducer;