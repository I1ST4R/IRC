import { openAccount } from "@/_old-version/entity/account/slice";
import { useAppDispatch } from "@/shared/store/sharedStore";

export const CartBodyAnauthorized = () => {
  const dispatch = useAppDispatch();

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
};
