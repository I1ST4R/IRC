import { Unauthorized } from "@/shared/ui/components/Unauthorized";
import { Product } from "../ProductList";
import { Loader } from "@/shared/ui/components/Loader";
import { EmptyList } from "@/shared/ui/components/EmptyList";
import { useGetUserQuery } from "@/shared/store/user/userApiSlice";
import { useGetLikedQuery } from "./store/liked/likedApiSlice";

export const LikedBody = () => {
  const { data: user } = useGetUserQuery();
  const { data: likedItems = [], isLoading, error } = useGetLikedQuery(user?.id ?? "",{skip: !user?.id});

  if (!user?.id) return <Unauthorized />;
  if (isLoading) return <Loader title = "Избранное"/>
  if (error) return <div className="cart__error">Ошибка при загрузке избранного</div>
  if (likedItems.length === 0) 
    return <EmptyList title = "Избранное" message = "Ваш список избранного пуст"/>

  return (
    <div className="cart container liked-page">
      <div className="cart__header">
        <h2 className="cart__title liked-page__title">Избранное</h2>
        <span className="cart__items-count">
            В избранном <span>{likedItems.length}</span>
        </span>
      </div>
      <div className="product-list__container liked-page__container">
        {likedItems.map((product) => (
          <Product
            key={`product-${product.id}`}
            product={product}
            onRemoveFromLiked={() => removeFromLiked({ userId: user.id, product.id })}
          />
        ))}
      </div>
    </div>
  );
};

