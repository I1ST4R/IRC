import { useChangeCheckCartItemMutation } from "@/modules/CartBody/store/cartApiSlice";
import { CartItemAndUserIdProps } from "./CartItemInfo/CartItemInfo";
import { Checkbox } from "@/shared/ui/kit/checkbox";


export const CartItemCheckbox = ({cartItem, userId}: CartItemAndUserIdProps) => {
  const [changeCheckCartItem] = useChangeCheckCartItemMutation();
  const handleChangeCheckCart = () => {
    changeCheckCartItem({ userId: userId, productId: cartItem.product.id });
  };
  return (
    <div className="mr-4 z-1">
      <Checkbox checked={cartItem.isChecked} onClick={handleChangeCheckCart}  />
    </div>
  );
};
