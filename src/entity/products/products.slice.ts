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
    tags?: { categoryId: string; tagId: string }[];
  }, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams();
      const page = params.page || 1;
      const limit = params.limit || 10;
      const start = (page - 1) * limit;
      
      queryParams.append('_start', start.toString());
      queryParams.append('_limit', limit.toString());
      
      if (params.price_gte) queryParams.append('price_gte', params.price_gte.toString());
      if (params.price_lte) queryParams.append('price_lte', params.price_lte.toString());
      
      if (params.tags && params.tags.length > 0) {
        params.tags.forEach(tag => {
          queryParams.append('tags', JSON.stringify(tag));
        });
      }
      
      const url = `/products?${queryParams.toString()}`;
      const response = await api.get<Product[]>(url);
      
      return {
        items: response.data,
        hasMore: response.data.length === limit
      };
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
        state.loading = 'pending';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        
        if (action.payload && 'items' in action.payload) {
          const page = action.meta.arg.page || 1;
          const limit = action.meta.arg.limit || 10;
          const { items, hasMore } = action.payload;
          
          // Если это первая страница, заменяем все товары
          if (page === 1) {
            state.items = items;
          } else {
            // Если это последующие страницы, добавляем только новые товары
            const existingIds = new Set(state.items.map(item => item.id));
            const newItems = items.filter(item => !existingIds.has(item.id));
            state.items = [...state.items, ...newItems];
          }
          
          state.pagination = {
            page,
            limit,
            hasMore
          };
        } else {
          state.items = [];
          state.pagination.hasMore = false;
        }
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

export const {
  clearProductsError,
  resetCurrentProduct,
  setProducts,
  setLoading,
  setError
} = productsSlice.actions;

export default productsSlice.reducer;