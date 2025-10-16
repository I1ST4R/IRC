import { ProductT } from "@/modules/ProductList";

export interface LikedItemDb {
  productId: string;
}

export type Liked = Record<string, ProductT>