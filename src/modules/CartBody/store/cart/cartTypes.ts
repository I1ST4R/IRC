import { Product } from "@/modules/ProductList/store/product/productTypes";

type CartItemBase<T> = {
  isChecked: boolean;
  quantity: number;
} & T;

export type CartItemDb = CartItemBase<{ productId: string }>;
export type CartItem = CartItemBase<{ product: Product }>;

export type Cart = {
  items:CartItem[]
  itemsCount: number
}