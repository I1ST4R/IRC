export interface Promo {
  valid: boolean;
  code: string | null;
  discount: number | null;
}

export interface PromoState {
  promo: Promo
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}