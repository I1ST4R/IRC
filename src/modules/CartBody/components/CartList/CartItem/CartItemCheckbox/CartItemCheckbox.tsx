import { Checkbox } from "@radix-ui/react-checkbox";
import { useChangeCheckCartItemMutation } from "@/modules/CartBody/store/cart/cartApiSlice";
import { CartItemAndUserIdProps } from "../CartItemInfo/CartItemInfo";

export const CartItemCheckbox = ({cartItem, userId}: CartItemAndUserIdProps) => {
  const [changeCheckCartItem] = useChangeCheckCartItemMutation();
  const handleChangeCheckCart = () => {
    changeCheckCartItem({ userId: userId, productId: cartItem.product.id });
  };
  
  return (
    <div className="mr-4 z-1">
      <Checkbox onChange={handleChangeCheckCart} checked={cartItem.isChecked} />
    </div>
  );
};
