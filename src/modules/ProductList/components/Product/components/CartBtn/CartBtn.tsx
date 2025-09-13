import { useCart } from "./useCart";
import { cn } from "@/shared/lib/css";

export type UserIdProductIdType = {
  userId: string;
  productId: string;
};

export const CartBtn = (props: UserIdProductIdType) => {
  const { isInCart, cartClick } = useCart(props);

  return (
    <button
      className={cn(
        "px-2.5 py-[10px] text-xs font-semibold uppercase tracking-wide transition-all duration-200 font-manrope",
        isInCart()
          ? "bg-coral text-white hover:bg-coralDark"
          : "bg-gray-500 text-black hover:bg-coral hover:text-white"
      )}
      onClick={cartClick}
    >
      {isInCart() ? "В корзине" : "Добавить в корзину"}
    </button>
  );
};
