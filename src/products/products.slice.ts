import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../services/api';
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
  items: [
    {
      id: "1",
      name: "Гель для умывания Basic",
      releaseDate: "2024-01-01",
      price: 1200,
      prevPrice: 1500,
      technology: "Basic",
      img: "product2.png",
      tags: ["Basic", "Гель для умывания"]
    },
    {
      id: "2",
      name: "Крем Moist + Tonus",
      releaseDate: "2024-01-02",
      price: 1800,
      prevPrice: 2000,
      technology: "Moist + Tonus",
      img: "product2.png",
      tags: ["Moist + Tonus", "Крем"]
    },
    {
      id: "3",
      name: "Концентрат Sebo+",
      releaseDate: "2024-01-03",
      price: 3500,
      prevPrice: 4000,
      technology: "Sebo+",
      img: "product2.png",
      tags: ["Sebo+", "Активные концентраты"]
    },
    {
      id: "4",
      name: "Крем Anti-age",
      releaseDate: "2024-01-04",
      price: 4500,
      prevPrice: 5000,
      technology: "Anti-age",
      img: "product2.png",
      tags: ["Anti-age", "Крем"]
    },
    {
      id: "5",
      name: "Маска Moist + Tonus",
      releaseDate: "2024-01-05",
      price: 1800,
      prevPrice: 2000,
      technology: "Moist + Tonus",
      img: "product2.png",
      tags: ["Moist + Tonus", "Маска"]
    },
    {
      id: "6",
      name: "Гель для умывания Sebo+",
      releaseDate: "2024-01-06",
      price: 1500,
      prevPrice: 1800,
      technology: "Sebo+",
      img: "product2.png",
      tags: ["Sebo+", "Гель для умывания"]
    },
    {
      id: "7",
      name: "Пиллинг Anti-age",
      releaseDate: "2024-01-07",
      price: 2800,
      prevPrice: 3000,
      technology: "Anti-age",
      img: "product2.png",
      tags: ["Anti-age", "Пиллинг"]
    },
    {
      id: "8",
      name: "Концентрат Basic",
      releaseDate: "2024-01-08",
      price: 2200,
      prevPrice: 2500,
      technology: "Basic",
      img: "product2.png",
      tags: ["Basic", "Активные концентраты"]
    }
  ],
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

export const { clearProductsError, resetCurrentProduct } = productsSlice.actions;
export default productsSlice.reducer;