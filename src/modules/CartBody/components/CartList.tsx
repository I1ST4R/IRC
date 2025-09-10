import { CartItem } from "./CartItem";
import { CartItemsAndLikedItems, getCartItemsWithLikedParam } from "./getCartItemsWithLikedParam";
import { User } from "@/shared/store/user/userTypes";

export type CartListProps = {
  cartAndLiked: CartItemsAndLikedItems,
  user: User
}

export const CartList = (props: CartListProps) => {
  const cartItemsWithLikedParam = getCartItemsWithLikedParam(props.cartAndLiked);

  return (
    <div className="cart__list">
      {cartItemsWithLikedParam.map((el) => {
        return (
          <CartItem
            key={el.cartItem.product.id}
            cartItem={el.cartItem}
            userId={props.user.id ?? ""}
            isLiked={el.isLiked}
          />
        );
      })}
    </div>
  );
};
