import { Product } from "../product/types";

export interface CartItemDb {
  productId: string;
  quantity: number;
  isChecked: boolean;
}

export interface CartItem {
  product: Product;
  isChecked: boolean;
  quantity: number;
}

// export interface CartTotals {
//   total: number;
//   totalWithoutDiscount: number;
//   totalDiscount: number;
//   itemsCount: number;
//   promoDiscount: number;
//   certificateDiscount: number;
//   finalTotal: number;
// }

export interface CartState {
  items: CartItem[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
  itemsCount: number;
} 