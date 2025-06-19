import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "../../main/store";
import { fetchLiked, removeItemFromLiked } from "@/entity/liked/slice";
import { fetchProducts } from "@/entity/product/slice";
import { Product } from "../Catalog/Product/Product";
import PersonalAccount from "../../main/App/PersonalAccount/PersonalAccount";

export const Liked = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);
  const { items, loading: likedLoading, error: likedError } = useSelector((state: RootState) => state.liked);
  const { items: products, loading: productsLoading, error: productsError,} = useSelector((state: RootState) => state.products);
  const likedItems = useSelector((state: RootState) => state.liked.items);
  const likedProductIds = likedItems.map(item => item.productId);
  const likedProducts = products.filter((product) => likedProductIds.includes(product.id));
  const [isPersonalAccountOpen, setIsPersonalAccountOpen] = useState(false);

  useEffect(() => {
    if (user.id) {
      dispatch(fetchLiked(user.id));
      dispatch(fetchProducts({ page: 1 }));
    }
  }, [dispatch, user.id]);

  const handleRemoveItem = (productId: string) => {
    if (user.id) {
      dispatch(removeItemFromLiked({ userId: user.id, productId }));
    }
  };

  const getTotalItems = () => {
    return items.length;
  };

  const loading = likedLoading || productsLoading === "pending";
  const error = likedError || productsError;

  if (!user.id) {
    return (
      <div className="cart container">
        <h2 className="cart__title">Избранное</h2>
        <div className="cart__empty">
          <p className="cart__empty-message">
            <button 
              className="cart__login-btn"
              onClick={() => setIsPersonalAccountOpen(true)}
            >
              ВОЙДИТЕ
            </button>
            , ЧТОБЫ ДОБАВЛЯТЬ ТОВАРЫ В ИЗБРАННОЕ
          </p>
        </div>
        {isPersonalAccountOpen && (
          <PersonalAccount onClose={() => setIsPersonalAccountOpen(false)} />
        )}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="cart">
        <h2 className="cart__title">Избранное</h2>
        <div className="cart__loading">Загрузка...</div>
      </div>
    );
  }

  if (error) {
    return <div className="cart__error">{error}</div>;
  }

  if (items.length === 0) {
    return (
      <div className="cart__empty">
        <h2 className="cart__title">Избранное</h2>
        <div className="cart__empty-text">
          <p className="cart__empty-message">Ваша список избранного пуст</p>
          <p className="cart__empty-link">
            <Link to="/catalog">Нажмите здесь,</Link>
            чтобы перейти в каталог
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart container liked-page">
      <div className="cart__header">
        <h2 className="cart__title liked-page__title">Избранное</h2>
        <span className="cart__items-count">
            В избранном <span>{likedProducts.length}</span>
        </span>
      </div>
      <div className="product-list__container liked-page__container">
        {likedProducts.map((product) => (
          <Product
            key={`product-${product.id}`}
            product={product}
            onRemoveFromLiked={() => handleRemoveItem(product.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Liked;
