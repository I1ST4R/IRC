import { Button } from "@/shared/ui/kit/button";
import { useClearCartMutation } from "../../store/cartApiSlice";
import { CartItem } from "./CartItem/CartItem";
import {
  CartItemsAndLikedItems,
  getCartItemsWithLikedParam,
} from "./getCartItemsWithLikedParam";
import { User } from "@/shared/store/user/userTypes";

export type CartListProps = {
  cartAndLiked: CartItemsAndLikedItems;
  user: User;
};

export const CartList = ({ cartAndLiked, user }: CartListProps) => {
  const cartItemsWithLikedParam = getCartItemsWithLikedParam(cartAndLiked);
  const [clearCart] = useClearCartMutation();

  return (
    <div>
      {cartAndLiked.cartItems.length > 0 && (
        <Button
          asChild
          onClick={() => clearCart({ userId: user?.id ?? "" })}
          variant="squareRemove"
        >
          <img src="./img/cartGarbageIcon.png" alt="cart-garbage-icon" />
        </Button>
      )}

      <div className="flex flex-col gap-[30px]">
        {cartItemsWithLikedParam.map((el) => {
          return (
            <CartItem
              key={el.cartItem.product.id}
              cartItem={el.cartItem}
              userId={user.id ?? ""}
              isLiked={el.isLiked}
            />
          );
        })}
      </div>
    </div>
  );
};
