import { CartItem } from "@/modules/CartBody/store/cart/cartTypes";
import { CartItemQuantityChanger } from "./CartItemQuantityChanger";

export type CartItemAndUserIdProps = {
  cartItem: CartItem,
  userId: string
}

export const CartItemInfo = ({cartItem, userId}: CartItemAndUserIdProps) => {
  return (
    <div className="cart__item-text">
      <div className="cart__item-name-block">
        <p className="cart__item-name">{cartItem.product.name}</p>
        <p className="cart__item-technology">{cartItem.product.technology}</p>
      </div>

      <CartItemQuantityChanger userId={userId} cartItem={cartItem} />

      <div className="cart__item-price-block">
        <p className="cart__item-price cart__item-price--new">
          {cartItem.product.price * cartItem.quantity} ₽
        </p>
        <p className="cart__item-price cart__item-price--old">
          {cartItem.product.prevPrice * cartItem.quantity} ₽
        </p>
      </div>
    </div>
  );
};
