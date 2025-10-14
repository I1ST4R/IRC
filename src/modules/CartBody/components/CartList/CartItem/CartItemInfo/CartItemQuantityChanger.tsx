import { CartItem } from "@/modules/CartBody/store/cartTypes";
import { Button } from "@/shared/ui/kit/button";
import { UseQuantityChange } from "./UseQuantityChange";

export type CartItemQuantityChangerProps = {
  userId: string;
  cartItem: CartItem;
};

export const CartItemQuantityChanger = (
  props: CartItemQuantityChangerProps
) => {
  const [quantityDecrease, quantityIncrease] = UseQuantityChange(props)
  
  return (
    <div className="flex items-center gap-5 px-2 py-0.5 h-9 font-normal text-xl">
      <Button variant="circle" asChild onClick={quantityDecrease}>-</Button>
      <Button variant="circle" asChild onClick={quantityIncrease}>+</Button>
    </div>
  );
};
