import { useCart } from "@/modules/ProductList";

export type BtnProps = {
  userId: string,
  productId: string
}

export const ProductCartBtn = ({userId, productId} : BtnProps) => {
  const {isInCart, cartClick} = useCart({userId, productId})

  return (
    <button
      className={`px-6 py-3 border border-black bg-white text-black text-sm font-semibold uppercase tracking-wider transition-colors hover:bg-black hover:text-white md:w-auto w-full ${
        isInCart() ? "bg-black text-white" : ""
      }`}
      onClick={cartClick}
    >
      {isInCart() ? "В корзине" : "Добавить в корзину"}
    </button>
  );
};