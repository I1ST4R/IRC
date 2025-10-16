import { Button } from "@/shared/ui/kit/button";
import { CartItemAndUserIdProps } from "../CartItemInfo/CartItemInfo";
import { useRemoveFromCartMutation } from "@/modules/CartBody/store/cartApiSlice";


export const CartItemRemoveButton = ({cartItem, userId}: CartItemAndUserIdProps) => {
  const [removeFromCart] = useRemoveFromCartMutation();
  const handleRemoveItem = (productId: string) => {
    removeFromCart({ userId: userId, productId: productId });
  };

  return (
    <Button
  variant="squareRemove"
  onClick={() => handleRemoveItem(cartItem.product.id)}
  title="Удалить из корзины"
  className="h-full p-0 w-9 flex items-center justify-center cursor-pointer 
             hover:bg-[var(--coral)] transition-all duration-300 group"
>
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5 transition-all duration-300 
               group-hover:filter group-hover:brightness-0 group-hover:invert"
  >
    <path
      d="M15 5L5 15"
      stroke="#333"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5 5L15 15"
      stroke="#333"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
    </Button>
  );
};
