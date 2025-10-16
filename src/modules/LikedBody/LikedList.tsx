import { Product, ProductT } from "@/modules/ProductList";
import { Liked } from "./store/likedTypes";
import { CartItems } from "../CartBody/store/cartTypes";

type LikedListProps = {
  likedItems: ProductT[]
  likedItemsRecord: Liked
  cartItems: CartItems
  userId: string
}

export const LikedList = ({ 
  likedItems, 
  likedItemsRecord, 
  cartItems,
  userId
}: LikedListProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
      {likedItems.map((product) => (
        <Product 
          key={`product-${product.id}`} 
          product={product} 
          likedItems={likedItemsRecord}
          userId={userId}
          cartItems={cartItems}
        />
      ))}
    </div>
  );
};