import { ProductT } from "@/modules/ProductList";
import { CartItem } from "../../store/cart/cartTypes";


export type CartItemWithLikedParam = {
  cartItem: CartItem
  isLiked: boolean
}

export type CartItemsAndLikedItems = {
  cartItems: CartItem[];
  likedItems: ProductT[];
}

export const getCartItemsWithLikedParam = (params: CartItemsAndLikedItems) => {
  return params.cartItems.map((el) => {
    const isLiked = params.likedItems.some(
      (likedItem) => likedItem.id === el.product.id
    )

    return {
      cartItem: el,
      isLiked: isLiked
    } as CartItemWithLikedParam
  })
}