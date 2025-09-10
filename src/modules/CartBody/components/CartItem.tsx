import { CartItem as ICartItem } from "@/modules/CartBody/store/cart/cartTypes";
import {
  useUpdateCartItemQuantityMutation,
  useRemoveFromCartMutation,
  useChangeCheckCartItemMutation,
} from "@/modules/CartBody/store/cart/cartApiSlice";
import {
  useAddToLikedMutation,
  useRemoveFromLikedMutation,
} from "@/shared/store/liked/likedApiSlice";
import { Checkbox } from "@radix-ui/react-checkbox";
import { Button } from "@/shared/ui/kit/button";
import { cn } from "@/shared/lib/css";

interface CartItemProps {
  cartItem: ICartItem;
  userId: string | null;
  isLiked: boolean;
}

export const CartItem = ({ cartItem, userId, isLiked }: CartItemProps) => {
  const [updateCartItemQuantity] = useUpdateCartItemQuantityMutation();
  const [removeFromCart] = useRemoveFromCartMutation();
  const [changeCheckCartItem] = useChangeCheckCartItemMutation();
  const [addToLiked] = useAddToLikedMutation();
  const [removeFromLiked] = useRemoveFromLikedMutation();

  const handleQuantityChange = (
    productId: string,
    type: "increase" | "decrease"
  ) => {
    if (userId) {
      if (type === "decrease" && cartItem.quantity === 1) return;
      const changes = type === "increase" ? 1 : -1;
      updateCartItemQuantity({
        userId: userId,
        productId: productId,
        quantity: cartItem.quantity + changes,
      });
    }
  };

  const handleRemoveItem = (productId: string) => {
    if (userId) {
      removeFromCart({ userId: userId, productId: productId });
    }
  };

  const handleChangeCheckCart = () => {
    if (userId) {
      changeCheckCartItem({ userId: userId, productId: cartItem.product.id });
    }
  };

  const handleLike = () => {
    if (userId) {
              if (isLiked) {
                removeFromLiked({
                  userId: userId,
                  productId: cartItem.product.id,
                });
              } else {
                addToLiked({
                  userId: userId,
                  productId: cartItem.product.id,
                });
              }
            }
  }

  return (
    <div key={cartItem.product.id} className="w-31 h-31 object-contain bg-[#f2f2f2] border border-[#ececec]">
      <div className="mr-4 z-1">
        <Checkbox onChange={handleChangeCheckCart} checked={cartItem.isChecked}/>
      </div>

      <div>
        <img
          src={cartItem.product.img}
          alt={cartItem.product.name}
          className="cart__item-image"
        />
        <Button 
          variant = "liked"
          onClick={handleLike}
          title={isLiked ? "Убрать из избранного" : "В избранное"}
        >
        </Button>
      </div>

      <div className="cart__item-text">
        <div className="cart__item-name-block">
          <p className="cart__item-name">{cartItem.product.name}</p>
          <p className="cart__item-technology">{cartItem.product.technology}</p>
        </div>

        <div className="cart__item-quantity">
          <button
            className="cart__item-quantity-btn"
            onClick={() => {
              console.log(11);
              handleQuantityChange(cartItem.product.id, "decrease");
            }}
          >
            -
          </button>
          <span className="cart__item-quantity-value">{cartItem.quantity}</span>
          <button
            className="cart__item-quantity-btn"
            onClick={() =>
              handleQuantityChange(cartItem.product.id, "increase")
            }
          >
            +
          </button>
        </div>

        <div className="cart__item-price-block">
          <p className="cart__item-price cart__item-price--new">
            {cartItem.product.price * cartItem.quantity} ₽
          </p>
          <p className="cart__item-price cart__item-price--old">
            {cartItem.product.prevPrice * cartItem.quantity} ₽
          </p>
        </div>
      </div>

      <button
        className="cart__item-remove"
        onClick={() => handleRemoveItem(cartItem.product.id)}
        title="Удалить из корзины"
      >
        <img src="./cartItemRemoveSvg" alt="Удалить из корзины" />
      </button>
    </div>
  );
};
