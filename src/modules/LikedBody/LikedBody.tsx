import { Unauthorized } from "@/shared/ui/components/Unauthorized";
import { Loader } from "@/shared/ui/components/Loader";
import { EmptyList } from "@/shared/ui/components/EmptyList";
import { useGetUserQuery } from "@/shared/store/user/userApiSlice";
import { useGetLikedQuery } from "./store/liked/likedApiSlice";
import { LikedList } from "./components/LikedList";
import { openAccount, useAppDispatch } from "../AuthForm";

export const LikedBody = () => {
  const { data: user } = useGetUserQuery();
  const { data: likedItems = [], isLoading, error } = useGetLikedQuery(user?.id ?? "", { skip: !user?.id });
  const dispatch = useAppDispatch()

  if (!user?.id) 
    return <Unauthorized text="чтобы доабвлять товары в избранное" handleClick={() => dispatch(openAccount())}/>;
  if (isLoading) 
    return <Loader title="Избранное" />;
  if (error) 
    return <div className="text-red-500 text-center py-8">Ошибка при загрузке избранного</div>;
  if (likedItems.length === 0) 
    return <EmptyList title="Избранное" message="Ваш список избранного пуст"/>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Избранное</h2>
        <span className="text-gray-600">
          В избранном <span className="font-semibold">{likedItems.length}</span>
        </span>
      </div>
      <LikedList likedItems={likedItems} />
    </div>
  );
};