import { CartItem } from "../../cart/cartTypes";

type CartTotals = {
  total: number;
  totalWithDiscount: number;
  discount: number;
  promoDiscount: number;
  certificateDiscount: number;
}

export const calculateCartTotals = (
  cartItems: CartItem[], 
  promocodePercent: number, 
  certificateDiscount: number
) : CartTotals => {

  const cartTotals : CartTotals = {
    total: 0,
    totalWithDiscount: 0,
    discount: 0,
    promoDiscount: 0,
    certificateDiscount: 0,
  }

  cartTotals.total = cartItems.reduce(
    (sum, item) => sum + item.product.prevPrice * item.quantity,
    0
  );
  cartTotals.totalWithDiscount = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  cartTotals.discount = cartTotals.total - cartTotals.totalWithDiscount;

  if (promocodePercent > 0) {
    cartTotals.promoDiscount = cartTotals.totalWithDiscount * promocodePercent
    cartTotals.totalWithDiscount -= cartTotals.promoDiscount;
  }

  if (certificateDiscount > 0) cartTotals.totalWithDiscount -= certificateDiscount;

  return cartTotals;
}