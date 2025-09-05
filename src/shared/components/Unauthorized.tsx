import { openAccount } from "@/_old-version/entity/account/slice";
import { useDispatch } from "react-redux";

export const Unauthorized = () => {
  const dispatch = useDispatch();

  return (
    <div>
      Для продолжения
      <button
        className="cart__login-btn"
        onClick={() => dispatch(openAccount())}
      >
        войдите
      </button>
      в систему
    </div>
  );
};
