import { useCart } from "./useCart"

export type UserIdProductIdType = {
  userId: string,
  productId: string
}

export const CartBtn = (props : UserIdProductIdType) => {
  const {isInCart, cartClick} = useCart(props)

  return (
    <button
      className={`product__btn ${isInCart() ? "product__btn--in-cart" : ""}`}
      onClick={cartClick}
    >
      {isInCart() ? "В корзине" : "Добавить в корзину"}
    </button>
  );
};
