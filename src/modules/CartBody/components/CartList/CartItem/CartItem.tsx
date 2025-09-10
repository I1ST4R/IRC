import { CartItem as ICartItem } from "@/modules/CartBody/store/cart/cartTypes";
import { CartItemInfo } from "./CartItemInfo/CartItemInfo";
import { CartItemImage } from "./CartItemImage/CartItemImage";
import { CartItemCheckbox } from "./CartItemCheckbox/CartItemCheckbox";
import { CartItemRemoveButton } from "./CartItemRemoveButton/CartItemRemoveButton";

export type CartItemProps = {
  cartItem: ICartItem;
  userId: string;
  isLiked: boolean;
};

export const CartItem = ({ cartItem, userId, isLiked }: CartItemProps) => {
  return (
    <div
      key={cartItem.product.id}
      className="w-31 h-31 object-contain bg-[#f2f2f2] border border-[#ececec]"
    >
      <CartItemCheckbox cartItem = {cartItem} userId={userId}/>
      <CartItemImage cartItem = {cartItem} userId={userId} isLiked = {isLiked}/>
      <CartItemInfo cartItem = {cartItem} userId={userId}/>
      <CartItemRemoveButton cartItem = {cartItem} userId={userId}/>
    </div>
  );
};
