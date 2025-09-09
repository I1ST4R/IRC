import { useClearCartMutation, useGetCartQuery } from "@/modules/CartList/store/cart/cartApiSlice";
import { useGetLikedQuery } from "@/shared/store/liked/likedApiSlice";
import { useGetUserQuery } from "@/shared/store/user/userApiSlice";
import cartGarbageIcon from "./cartGarbageIcon.svg";

export const CartList = () => {
  const {data: user} = useGetUserQuery();
  const {data: likedItems = []} = useGetLikedQuery(user?.id ?? '', { skip: !user?.id });
  const { data: itemsCount = 0 } = useGetCartTotalsQuery(user?.id ?? '', { skip: !user?.id });
  const { data: cartItems = [], isLoading: isCartLoading, error: cartError } = useGetCartQuery(user?.id ?? '', { skip: !user?.id });
  const [clearCart] = useClearCartMutation();

  return (
    <div>
      <div className="cart__info">
        <span className="cart__items-count">
          В корзине <span>{itemsCount}</span>
        </span>
      </div>
      <div className="cart__body">
        {cartItems.length > 0 && (
          <button
            onClick={() => clearCart({ userId: user.id ?? '' })}
            title="Очистить корзину"
            className="cart__clear"
          >
            <img src={cartGarbageIcon} alt="cart-garbage-icon" />
            Очистить корзину
          </button>
        )} 
        <div className="cart__list">
          {cartItems.map((item) => {
            const isItemLiked = likedItems.some(
              (likedItem) => likedItem.id === item.product.id
            );
            return (
              <CartItem
                key={item.product.id}
                cartItem={item}
                userId={user.id ?? ''}
                isLiked={isItemLiked}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

