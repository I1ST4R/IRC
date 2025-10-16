
import { Liked} from "@/modules/LikedBody";
import { ProductCard } from "./Product/components/ProductCard/ProductCard";
import { CartBtn } from "./Product/components/CartBtn/CartBtn";
import { LikeBtn } from "./Product/components/LikeBtn/LikeBtn";
import { ProductT } from "..";
import { CartItems } from "@/modules/CartBody/store/cartTypes";

type ProductProps = {
  product: ProductT
  likedItems: Liked
  cartItems: CartItems
  userId: string
}

export const Product = ({ product, likedItems, cartItems, userId }: ProductProps) => {
  const isLiked = likedItems[product.id]?.id === product.id
  const isInCart = cartItems[product.id]?.product.id === product.id
  return (
    <div className="pb-5 relative w-[312px] bg-[#F2F2F2] overflow-hidden transition-transform duration-200 hover:-translate-y-[5px]">
      <ProductCard product = {product}/>
      <CartBtn userId = {userId} productId = {product.id} isInCart={isInCart}/>
      <LikeBtn userId = {userId} productId = {product.id} isLiked={isLiked}/>
    </div>
  );
};