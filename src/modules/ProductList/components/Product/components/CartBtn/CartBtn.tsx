import { Button } from "@/shared/ui/kit/button";
import { useCart } from "./useCart";
import { cn } from "@/shared/lib/css";

export type CartBtnProps = {
  userId: string,
  productId: string,
  isInCart: boolean
}

export const CartBtn = ({ userId, productId, isInCart}: CartBtnProps) => {
  const cartClick = useCart({userId, productId, isInCart})

  return (
    <Button
      variant="destructive"
      className={cn(
        "px-2.5 py-[10px] h-9 text-xs font-bold uppercase transition-all duration-200 font-manrope absolute bottom-0 w-full",
        isInCart
          ? "bg-[var(--coral)] text-white hover:bg-coralDark"
          : "bg-gray-300 text-black hover:bg-coral hover:text-white"
      )}
      onClick={cartClick}
    >
      {isInCart ? "В корзине" : "Добавить в корзину"}
    </Button>
  );
};
