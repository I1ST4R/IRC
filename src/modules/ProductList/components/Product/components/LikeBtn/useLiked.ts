import { 
  useAddToLikedMutation, 
  useGetLikedQuery, 
  useRemoveFromLikedMutation 
} from "@/modules/LikedBody";
import { UserIdProductIdType } from "../CartBtn/CartBtn";
import { openAccount} from "@/modules/AuthForm";
import { useAppDispatch } from "@/App/store";

export const useLiked = ({userId, productId} : UserIdProductIdType) => {
  const {
    data: likedItems = [], 
    isLoading: isLikedLoading
  } = useGetLikedQuery(userId, { skip: !userId });
  const [removeFromLiked] = useRemoveFromLikedMutation();
  const [addToLiked] = useAddToLikedMutation();
  const dispatch = useAppDispatch()

  const isLiked = () => {
    if (isLikedLoading) return false
    return likedItems.some((item) => item.id === productId)
  };

  const likeClick = async () => {
    if (!userId) {
      dispatch(openAccount())
      return 
    }

    if(isLiked()) removeFromLiked({ userId: userId, productId: productId })
    else addToLiked({ userId: userId, productId: productId })
  };

  return {isLiked, likeClick}
}