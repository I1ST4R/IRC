import { Product as ProductT } from "../../store/product/productTypes";
import { CartBtn } from "./components/CartBtn/CartBtn";
import { LikeBtn } from "./components/LikeBtn/LikeBtn";
import { ProductCard } from "./components/ProductCard/ProductCard";
import { Liked} from "@/modules/LikedBody";

type ProductProps = {
  product: ProductT
  likedItems: Liked
  userId: string
}

export const Product = ({ product, likedItems, userId }: ProductProps) => {
  const isLiked = likedItems[product.id]?.id === product.id
  return (
    <div className="pb-5 relative w-[312px] bg-[#F2F2F2] overflow-hidden transition-transform duration-200 hover:-translate-y-[5px]">
      <ProductCard product = {product}/>
      {/* <CartBtn userId = {userId} productId = {product.id}/> */}
      <LikeBtn userId = {userId} productId = {product.id} isLiked={isLiked}/>
    </div>
  );
};

