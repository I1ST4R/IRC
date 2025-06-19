export interface LikedItem {
  productId: string;
}

export interface LikedState {
  items: LikedItem[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}