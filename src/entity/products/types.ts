import { store } from '../../main/store';

export interface Product {
  id: string;
  name: string;
  releaseDate: string;
  price: number;
  prevPrice?: number;
  technology: string;
  img: string;
  tags: string[];
}

export interface ProductsState {
  items: Product[];
  currentProduct: Product | null;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
  pagination: {
    page: number;
    hasMore: boolean;
  };
}

interface PriceRange {
  min: number;
  max: number;
}

export interface FilterState {
  priceRange: PriceRange;
  selectedTags: string[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

export type AppDispatch = typeof store.dispatch;