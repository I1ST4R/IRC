
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
  

  return (
    <div>
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
