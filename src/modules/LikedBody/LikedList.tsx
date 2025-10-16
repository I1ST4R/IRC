import { Product, ProductT } from "@/modules/ProductList";
import { Liked } from "./store/likedTypes";

type LikedListProps = {
  likedItems: ProductT[]
  likedItemsRecord: Liked
}

export const LikedList = ({ likedItems, likedItemsRecord}: LikedListProps) => {
  console.log(likedItems)
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
      {likedItems.map((product) => (
        <Product 
          key={`product-${product.id}`} 
          product={product} 
          likedItems={likedItemsRecord}
          userId={"anpri65"}
          cartItems={{}}
        />
      ))}
    </div>
  );
};