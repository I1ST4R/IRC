import { Product } from "../product/types";

export interface LikedItemDb {
  productId: string;
}

export interface LikedState {
  items: Product[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}