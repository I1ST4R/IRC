import { CartItem } from "./cartTypes";

export const getItemsCount = (cartItems: CartItem[]) => {
  return cartItems.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
}