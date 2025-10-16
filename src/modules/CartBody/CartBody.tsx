import { useGetCartQuery } from "@/modules/CartBody/store/cartApiSlice";
import { useGetLikedQuery } from "@/modules/LikedBody";
import { useGetUserQuery } from "@/shared/store/user/userApiSlice";
import { initialCart } from "./store/cartApi";
import { CartList } from "./components/CartList/CartList";
import { CartBodyError } from "./components/CartBodyError";
import { Unauthorized } from "@/shared/ui/components/Unauthorized";
import { Loader } from "@/shared/ui/components/Loader";
import { EmptyList } from "@/shared/ui/components/EmptyList";
import { openAccount } from "../AuthForm";
import { useAppDispatch } from "@/App/store";
import { useMemo } from "react";

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
  const dispatch = useAppDispatch()

  const cartItemsArray = useMemo(()=>{
    return Object.values(cart.items)
  },[cart.items])

  const likedItemsArray = useMemo(() => {
    return Object.values(likedItems)
  },[likedItems])
 
  if (!user?.id) return <Unauthorized text="чтобы добавлять товары в корзину" handleClick={() => dispatch(openAccount())}/>
  if (isCartLoading) return <Loader title="Корзина" />;
  if (cartError) return <CartBodyError />;
  if (cart.itemsCount === 0)
    return <EmptyList title="Корзина" message="Ваша корзина пуста" />;
  return (
    <div>
      <div className="flex justify-between items-center font-extrabold text-xs mx-0 mb-5 ml-10 tracking-wide uppercase ">
        <span className="text-[var(--coral)]">
          В корзине <span>{cart.itemsCount}</span>
        </span>
      </div>

      <div className="grid grid-cols-[auto_300px] gap-[50px]">
        <CartList
          cartAndLiked={{
            cartItems: cartItemsArray,
            likedItems: likedItemsArray,
          }}
          user={user}
        />
      </div>
    </div>
  );
};
