import { useAddToCartMutation } from "@/modules/CartBody";
import { useNavigate } from "react-router-dom";
import { openAccount } from "@/modules/AuthForm";
import { useAppDispatch } from "@/App/store";
import { CartBtnProps } from "./CartBtn";

export const useCart = ({userId, productId, isInCart} : CartBtnProps) => {
  const [addToCart] = useAddToCartMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch()

  return () => {
    if (!userId) {
      dispatch(openAccount())
      return;
    }
    if (isInCart) navigate("/cart") 
    else addToCart({ userId: userId, productId: productId })
  }
}