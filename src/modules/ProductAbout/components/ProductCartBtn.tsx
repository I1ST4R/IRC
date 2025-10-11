import { useCart } from "@/modules/ProductList";

export type BtnProps = {
  userId: string,
  productId: string
}

export const ProductCartBtn = ({userId, productId} : BtnProps) => {
  const {isInCart, cartClick} = useCart({userId, productId})

  return (
    <button
      className={`product__btn product-about__btn ${
        isInCart() ? "product__btn--in-cart" : ""
      }`}
      onClick={cartClick}
    >
      {isInCart() ? "В корзине" : "Добавить в корзину"}
    </button>
  );
};
