import { CartItemQuantityChangerProps } from "./CartItemQuantityChanger";
import { useUpdateCartItemQuantityMutation } from "@/modules/CartBody/store/cart/cartApiSlice";

export const useQuantityChange = (params: CartItemQuantityChangerProps) => {

  const quantityChange = (type: "increase" | "decrease") => {
    const [updateCartItemQuantity] = useUpdateCartItemQuantityMutation();
    const productId = params.cartItem.product.id;

    if (type === "decrease" && params.cartItem.quantity === 1) return;
    const changes = type === "increase" ? 1 : -1;
    updateCartItemQuantity({
      userId: params.userId,
      productId: productId,
      quantity: params.cartItem.quantity + changes,
    });
  };

  const quantityDecrease = () => {
    quantityChange("decrease");
  };

  const quantityIncrease = () => {
    quantityChange("increase");
  };

  return [quantityDecrease, quantityIncrease]
}