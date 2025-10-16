import { useClearCartMutation, useGetCartQuery } from "@/modules/CartBody/store/cartApiSlice";
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
import { Button } from "@/shared/ui/kit/button";
import garbage from "./cartGarbageIcon.svg"

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
  const [clearCart] = useClearCartMutation();
  const dispatch = useAppDispatch();

  const cartItemsArray = useMemo(() => {
    return Object.values(cart.items);
  }, [cart.items]);

  const likedItemsArray = useMemo(() => {
    return Object.values(likedItems);
  }, [likedItems]);

  if (!user?.id)
    return (
      <Unauthorized
        text="чтобы добавлять товары в корзину"
        handleClick={() => dispatch(openAccount())}
      />
    );
  if (isCartLoading) return <Loader title="Корзина" />;
  if (cartError) return <CartBodyError />;
  if (cart.itemsCount === 0)
    return <EmptyList title="Корзина" message="Ваша корзина пуста" />;
  return (
    <div className="mb-10">
      <div className="flex justify-between mx-0 mb-5 ml-5 ">
        <p className="font-manrope text-[14px]" >
          В корзине <span className="text-[var(--coral)] font-bold">{cart.itemsCount}</span>
        </p>
        {cartItemsArray.length > 0 && (
          <Button
            onClick={() => clearCart({ userId: user?.id ?? "" })}
            className="p-0 bg-transparent cursor-pointer w-5 h-5 mr-1"
            variant="squareRemove"
          >
            <img src={garbage} className="w-5 h-5" alt="cart-garbage-icon" />
          </Button>
        )}
      </div>

      <div>
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
