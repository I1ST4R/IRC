import { useGetCartQuery } from "@/modules/CartBody/store/cart/cartApiSlice";
import { useGetLikedQuery } from "@/shared/store/liked/likedApiSlice";
import { useGetUserQuery } from "@/shared/store/user/userApiSlice";
import { initialCart } from "./store/cart/cartApi";
import { CartList } from "./components/CartList/CartList";
import { CartBodyAnauthorized } from "./components/CartBodyAnauthorized/CartBodyAnauthorized";
import { CartBodyLoading } from "./components/CartBodyLoading/CartBodyLoading";
import { CartBodyError } from "./components/CartBodyError/CartBodyError";

export const CartBody = () => {
  const { data: user } = useGetUserQuery();
  const { data: likedItems = [] } = useGetLikedQuery(user?.id ?? "", {
    skip: !user?.id,
  });
  const {
    data: cart = initialCart,
    isLoading: isCartLoading,
    error: cartError,
  } = useGetCartQuery(user?.id ?? "", { skip: !user?.id });

  if (!user?.id) return <CartBodyAnauthorized />;
  if (isCartLoading) return <CartBodyLoading />;
  if (cartError) return <CartBodyError />;

  return (
    <div>

      <div className="cart__info">
        <span className="cart__items-count">
          В корзине <span>{cart.itemsCount}</span>
        </span>
      </div>

      <div className="cart__body">
        <CartList
          cartAndLiked={{
            cartItems: cart.items,
            likedItems: likedItems,
          }}
          user={user}
        />
      </div>
      
    </div>
  );
};
