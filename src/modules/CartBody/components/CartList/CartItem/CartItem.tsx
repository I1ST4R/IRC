import { CartItem as CartItemT } from "@/modules/CartBody/store/cartTypes";
import { CartItemInfo } from "./CartItemInfo/CartItemInfo";
import { CartItemImage } from "./CartItemImage/CartItemImage";
import { CartItemCheckbox } from "./CartItemCheckbox";
import { CartItemRemoveButton } from "./CartItemRemoveButton/CartItemRemoveButton";

export type CartItemProps = {
  cartItem: CartItemT;
  userId: string;
  isLiked: boolean;
};

export const CartItem = ({ cartItem, userId, isLiked }: CartItemProps) => {
  return (
    <div
      key={cartItem.product.id}
      className="w-full h-31 border-[#ececec] gap-4 
             grid grid-cols-[40px_125px_auto_40px] 
             items-center pl-5"
    >
      <CartItemCheckbox cartItem={cartItem} userId={userId} />
      <CartItemImage cartItem={cartItem} userId={userId} isLiked={isLiked} />
      <CartItemInfo cartItem={cartItem} userId={userId} />
      <CartItemRemoveButton cartItem={cartItem} userId={userId} />
    </div>
  );
};
