import {
  useClearCartMutation,
  useGetCartQuery,
} from "@/modules/CartBody/store/cart/cartApiSlice";
import { useGetLikedQuery } from "@/shared/store/liked/likedApiSlice";
import { useGetUserQuery } from "@/shared/store/user/userApiSlice";
import { initialCart } from "./store/cart/cartApi";
import { useAppDispatch } from "@/shared/store/sharedStore";
import { openAccount } from "@/_old-version/entity/account/slice";
import { CartList } from "./components/CartList";

export const CartBody = () => {
  const { data: user } = useGetUserQuery();
  const dispatch = useAppDispatch()
  const { data: likedItems = [] } = useGetLikedQuery(user?.id ?? "", {
    skip: !user?.id,
  });
  const {
    data: cart = initialCart,
    isLoading: isCartLoading,
    error: cartError,
  } = useGetCartQuery(user?.id ?? "", { skip: !user?.id });
  const [clearCart] = useClearCartMutation();

  if (!user?.id)
    return (
      <div className="cart__empty">
        <p className="cart__empty-message">
          <button
            className="cart__login-btn"
            onClick={() => dispatch(openAccount())}
          >
            ВОЙДИТЕ
          </button>
          , ЧТОБЫ ДОБАВЛЯТЬ ТОВАРЫ в корзину
        </p>
      </div>
    );

  if(isCartLoading) return (
    <div>
      Cart Loading...
    </div>
  )

  if(cartError) return (
    <div>
      При загрузке корзины произошла ошибка
    </div>
  )

  return (
    <div>
      <div className="cart__info">
        <span className="cart__items-count">
          В корзине <span>{cart.itemsCount}</span>
        </span>
      </div>
      <div className="cart__body">
        {cart.items.length > 0 && (
          <button
            onClick={() => clearCart({ userId: user?.id ?? "" })}
            title="Очистить корзину"
            className="cart__clear"
          >
            <img src="./img/cartGarbageIcon.png" alt="cart-garbage-icon" />
            Очистить корзину
          </button>
        )}
        <CartList 
        cartAndLiked={{
          cartItems: cart.items, 
          likedItems: likedItems
        }}
        user={user}
        />
      </div>
    </div>
  );
};
