export interface PromoState {
  code: string | null;
  discount: number | null;
  loading: boolean;
  error: string | null;
}