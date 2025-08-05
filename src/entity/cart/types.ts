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