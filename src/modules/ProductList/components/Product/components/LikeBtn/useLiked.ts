import { 
  useAddToLikedMutation,  
  useRemoveFromLikedMutation 
} from "@/modules/LikedBody";
import { openAccount} from "@/modules/AuthForm";
import { useAppDispatch } from "@/App/store";
import { LikeBtnProps } from "./LikeBtn";

export const useLiked = ({userId, productId, isLiked} : LikeBtnProps) => {
  const [removeFromLiked] = useRemoveFromLikedMutation();
  const [addToLiked] = useAddToLikedMutation();
  const dispatch = useAppDispatch()

  return () => {
    if (!userId) {
      dispatch(openAccount())
      return 
    }

    if(isLiked) removeFromLiked({ userId: userId, productId: productId })
    else addToLiked({ userId: userId, productId: productId })
  };

}