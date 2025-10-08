import { Product } from '../productTypes';

export interface LikedItemDb {
  productId: string;
}

export interface LikedState {
  items: Product[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}