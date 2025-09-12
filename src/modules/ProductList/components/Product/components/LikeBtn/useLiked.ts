import { openAccount } from "@/_old-version/entity/account/slice";
import { useAppDispatch } from "@/_old-version/services/store";
import { 
  useAddToLikedMutation, 
  useGetLikedQuery, 
  useRemoveFromLikedMutation 
} from "@/shared/store/liked/likedApiSlice";
import { UserIdProductIdType } from "../CartBtn/CartBtn";

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