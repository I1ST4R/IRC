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
      asChild
      title="Удалить из корзины"
    >
      <img src="./cartItemRemoveSvg" alt="Удалить из корзины" />
    </Button>
  );
};
