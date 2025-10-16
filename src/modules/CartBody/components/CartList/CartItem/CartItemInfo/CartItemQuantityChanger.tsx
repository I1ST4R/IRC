import { CartItem } from "@/modules/CartBody/store/cartTypes";
import { Button } from "@/shared/ui/kit/button";
import { UseQuantityChange } from "./useQuantityChange";


export type CartItemQuantityChangerProps = {
  userId: string;
  cartItem: CartItem;
};

export const CartItemQuantityChanger = (
  props: CartItemQuantityChangerProps
) => {
  const [quantityDecrease, quantityIncrease] = UseQuantityChange(props)
  
  return (
    <div className="flex gap-5 px-2 py-0.5 font-normal text-xl h-full items-center">
      <Button variant="circle" onClick={quantityDecrease} className="h-[50px] bg-[#f2f2f2] hover:bg-[var(--coral)]">-</Button>
      {props.cartItem.quantity}
      <Button variant="circle" onClick={quantityIncrease} className="h-[50px] bg-[#f2f2f2] hover:bg-[var(--coral)]">+</Button>
    </div>
  );
};
