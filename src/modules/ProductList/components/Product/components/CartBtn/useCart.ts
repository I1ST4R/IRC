import { openAccount } from "@/_old-version/entity/account/slice";
import { useAppDispatch } from "@/_old-version/services/store";
import { initialCart, useAddToCartMutation, useGetCartQuery } from "@/modules/CartBody";
import { useNavigate } from "react-router-dom";
import { UserIdProductIdType } from "./CartBtn";


export const useCart = ({userId, productId} : UserIdProductIdType) => {
  const {
    data: cart = initialCart,
    isLoading: isCartLoading,
  } = useGetCartQuery(userId, { skip: !userId });
  const [addToCart] = useAddToCartMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch()

  const cartClick = async () => {
    if (!userId) {
      dispatch(openAccount())
      return;
    }
    if (isInCart()) navigate("/cart") 
    else addToCart({ userId: userId, productId: productId })
  }

  const isInCart = () => {
    if (isCartLoading) return false
    return cart.items.some((item) => item.product.id === productId)
  };
  return {isInCart, cartClick}
}