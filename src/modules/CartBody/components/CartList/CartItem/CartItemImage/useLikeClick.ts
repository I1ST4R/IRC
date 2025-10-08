import { 
  useAddToLikedMutation, 
  useRemoveFromLikedMutation 
} from "@/modules/LikedBody/store/liked/likedApiSlice";
import { CartItemProps } from "@/modules/CartBody/components/CartList/CartItem/CartItem";

export const uselikeClick = (props: CartItemProps) => {
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