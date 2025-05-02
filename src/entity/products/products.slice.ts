import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../services/api';

interface Product {
  id: string;
  name: string;
  releaseDate: string;
  price: number;
  prevPrice?: number;
  technology: string;
  img: string;
  tags: {
    categoryId: string;
    tagId: string;
  }[];
}

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
  async (params: { 
    page?: number; 
    limit?: number;
    price_gte?: number;
    price_lte?: number;
    line?: string;
    category?: string;
  }, { rejectWithValue }) => {
    try {
      console.log('Fetching products with params:', params);
      const queryParams = new URLSearchParams();
      
      if (params.page) queryParams.append('_page', params.page.toString());
      if (params.limit) queryParams.append('_limit', params.limit.toString());
      if (params.price_gte) queryParams.append('price_gte', params.price_gte.toString());
      if (params.price_lte) queryParams.append('price_lte', params.price_lte.toString());
      if (params.line) queryParams.append('line', params.line);
      if (params.category) queryParams.append('category', params.category);

      const response = await api.get<Product[]>(`/products?${queryParams.toString()}`);
      console.log('API response:', response);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching products:', error);
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
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
      state.loading = 'succeeded';
    },
    setLoading: (state, action: PayloadAction<'idle' | 'pending' | 'succeeded' | 'failed'>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = 'failed';
    }
  },
  extraReducers: (builder) => {
    builder
      // Получение списка продуктов
      .addCase(fetchProducts.pending, (state) => {
        console.log('Fetch products pending');
        state.loading = 'pending';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        console.log('Fetch products fulfilled:', action.payload);
        state.loading = 'succeeded';
        if (Array.isArray(action.payload)) {
          state.items = action.payload;
          const limit = action.meta.arg.limit || 10;
          state.pagination = {
            page: action.meta.arg.page || 1,
            limit,
            hasMore: action.payload.length === limit,
          };
        } else {
          state.items = [];
          state.pagination.hasMore = false;
        }
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        console.log('Fetch products rejected:', action.payload);
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

export const {
  clearProductsError,
  resetCurrentProduct,
  setProducts,
  setLoading,
  setError
} = productsSlice.actions;

export default productsSlice.reducer;