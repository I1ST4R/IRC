import { Product, ProductT } from "@/modules/ProductList";

export const LikedList = ({ likedItems }: { likedItems: ProductT[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
      {likedItems.map((product) => (
        <Product key={`product-${product.id}`} product={product} />
      ))}
    </div>
  );
};