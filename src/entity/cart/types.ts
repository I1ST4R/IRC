export interface CartItem {
  productId: string;
  quantity: number;
}

export interface CartTotals {
  total: number;
  totalWithoutDiscount: number;
  totalDiscount: number;
  itemsCount: number;
  promoDiscount: number;
  certificateDiscount: number;
  finalTotal: number;
}

export interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
  totals: CartTotals | null;
} 