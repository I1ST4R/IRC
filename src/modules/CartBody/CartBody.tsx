import { useGetCartQuery } from "@/modules/CartBody/store/cart/cartApiSlice";
import { useGetLikedQuery } from "@/modules/LikedBody/store/liked/likedApiSlice";
import { useGetUserQuery } from "@/shared/store/user/userApiSlice";
import { initialCart } from "./store/cart/cartApi";
import { CartList } from "./components/CartList/CartList";
import { CartBodyError } from "./components/CartBodyError/CartBodyError";
import { Unauthorized } from "@/shared/ui/components/Unauthorized";
import { Loader } from "@/shared/ui/components/Loader";

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

  if (!user?.id) return <Unauthorized />;
  if (isCartLoading) return <Loader title="Корзина"/>;
  if (cartError) return <CartBodyError />;

  return (
    <div>
      <div className="flex justify-between items-center font-extrabold text-xs mx-0 mb-5 ml-10 tracking-wide uppercase">
        <span className="text-[var(--coral)]">
          В корзине <span>{cart.itemsCount}</span>
        </span>
      </div>

      <div className="grid grid-cols-[auto_300px] gap-[50px]">
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
