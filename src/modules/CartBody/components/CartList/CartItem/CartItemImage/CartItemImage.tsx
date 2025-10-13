import { Button } from "@/shared/ui/kit/button";
import { CartItemProps } from "@/modules/CartBody/components/CartList/CartItem/CartItem";
import { UselikeClick } from "./UseLikeClick";

export const CartItemImage = ({ cartItem, userId, isLiked }: CartItemProps) => {
  const [likeClick] = UselikeClick({ cartItem, userId, isLiked });
  return (
    <div>
      <img
        src={cartItem.product.img}
        alt={cartItem.product.name}
        className="w-[125px] h-[125px] object-contain bg-[#f2f2f2] border border-[#ececec]"
      />
      <Button
        variant="liked"
        onClick={likeClick}
        title={isLiked ? "Убрать из избранного" : "В избранное"}
      />
    </div>
  );
};
