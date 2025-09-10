import { Button } from "@/shared/ui/kit/button";
import { CartItemProps } from "@/modules/CartBody/components/CartList/CartItem/CartItem";
import { uselikeClick } from "./useLikeClick";

export const CartItemImage = ({ cartItem, userId, isLiked }: CartItemProps) => {
  const [likeClick] = uselikeClick({ cartItem, userId, isLiked });
  return (
    <div>
      <img
        src={cartItem.product.img}
        alt={cartItem.product.name}
        className="cart__item-image"
      />
      <Button
        variant="liked"
        onClick={likeClick}
        title={isLiked ? "Убрать из избранного" : "В избранное"}
      />
    </div>
  );
};
