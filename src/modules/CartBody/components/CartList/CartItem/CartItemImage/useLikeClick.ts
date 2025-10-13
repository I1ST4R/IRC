import { 
  useAddToLikedMutation, 
  useRemoveFromLikedMutation 
} from "@/modules/LikedBody";
import { CartItemProps } from "../CartItem";

export const UselikeClick = (props: CartItemProps) => {
  const [addToLiked] = useAddToLikedMutation();
  const [removeFromLiked] = useRemoveFromLikedMutation();

  const likeClick = () => {
    const item = {
      userId: props.userId!,
      productId: props.cartItem.product.id,
    };

    if (props.isLiked) removeFromLiked(item);
    else addToLiked(item);
  };

  return [likeClick] 
};