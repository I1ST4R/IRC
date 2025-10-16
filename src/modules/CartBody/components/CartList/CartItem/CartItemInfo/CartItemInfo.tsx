import { CartItem } from "@/modules/CartBody/store/cartTypes";
import { CartItemQuantityChanger } from "./CartItemQuantityChanger";

export type CartItemAndUserIdProps = {
  cartItem: CartItem,
  userId: string
}

export const CartItemInfo = ({cartItem, userId}: CartItemAndUserIdProps) => {
  return (
    <div className="grid grid-cols-3">
      <div>
        <p className=" text-[10px] tracking-[0.15em] uppercase">{cartItem.product.name}</p>
        <p className="font-europeext text-xl tracking-wide uppercase">{cartItem.product.technology}</p>
      </div>

      <CartItemQuantityChanger userId={userId} cartItem={cartItem} />

      <div className="flex gap-2.5 px-2.5 items-center ml-4">
        <p className="font-manrope whitespace-nowrap font-semibold text-xl">
          {cartItem.product.price * cartItem.quantity} ₽
        </p>
        <p className="font-manrope whitespace-nowrap line-through text-gray-400 font-normal text-lg">
          {cartItem.product.prevPrice * cartItem.quantity} ₽
        </p>
      </div>
    </div>
  );
};
