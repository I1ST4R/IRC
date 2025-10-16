import { Unauthorized } from "@/shared/ui/components/Unauthorized";
import { Loader } from "@/shared/ui/components/Loader";
import { EmptyList } from "@/shared/ui/components/EmptyList";
import { useGetUserQuery } from "@/shared/store/user/userApiSlice";
import { useGetLikedQuery } from "./store/likedApiSlice";
import { LikedList } from "./LikedList";
import { openAccount } from "../AuthForm";
import { useAppDispatch } from "@/App/store";
import { useMemo } from "react";
import { initialCart, useGetCartQuery } from "../CartBody";

export const LikedBody = () => {
  const { data: user } = useGetUserQuery();
  const { data: likedItems = {}, isLoading, error } = useGetLikedQuery(user?.id ?? "", { skip: !user?.id });
  const { data: cart = initialCart } = useGetCartQuery(user?.id ?? "", { skip: !user?.id })
  const dispatch = useAppDispatch()

  const likedItemsArray = useMemo(() => {
    return Object.values(likedItems)
  }, [likedItems])

  if (!user?.id) 
    return(
      <Unauthorized 
        text="чтобы доабвлять товары в избранное" 
        handleClick={() => dispatch(openAccount())}
      />
    ) 
  if (isLoading) 
    return <Loader title="Избранное" />;
  if (error) 
    return <div className="text-red-500 text-center py-8">Ошибка при загрузке избранного</div>;
  if (likedItemsArray.length === 0) 
    return <EmptyList title="Избранное" message="Ваш список избранного пуст"/>;

  return (
    <div className=" px-5 pb-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Избранное</h2>
        <span className="text-gray-600">
          В избранном <span className="font-semibold">{likedItemsArray.length}</span>
        </span>
      </div>
      <LikedList 
        likedItemsRecord={likedItems} 
        likedItems={likedItemsArray} 
        cartItems={cart.items}
        userId={user.id}
      />
    </div>
  );
};