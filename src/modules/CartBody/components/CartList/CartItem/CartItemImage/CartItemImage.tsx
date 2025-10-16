import { CartItemProps } from "@/modules/CartBody/components/CartList/CartItem/CartItem";
import { LikeBtn } from "@/modules/ProductList";

export const CartItemImage = ({ cartItem, userId, isLiked }: CartItemProps) => {
  return (
    <div className="w-[125px] h-[125px] relative ">
      <img
        src={cartItem.product.img}
        alt={cartItem.product.name}
        className="w-full h-full object-contain bg-[#f2f2f2] border border-[#ececec]"
      />
        <LikeBtn 
          userId = {userId} 
          productId = {cartItem.product.id} 
          isLiked={isLiked}
          styles="top-1 left-1"
          />
    </div>
  );
};
