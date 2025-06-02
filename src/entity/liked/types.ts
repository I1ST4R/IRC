interface LikedItem {
  productId: string;
}

export interface LikedState {
  items: LikedItem[];
  loading: boolean;
  error: string | null;
}