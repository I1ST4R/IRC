import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../_old-version/services/store";
import PersonalAccount from "../../_old-version/main/components/PersonalAccount/PersonalAccount";
import { useGetLikedQuery, useRemoveFromLikedMutation } from "@/entity/liked/api";
import { useGetUserQuery } from "@/entity/users/api";
import { Unauthorized } from "@/shared/ui/components/Unauthorized";
import { Product } from "../ProductList";

export const LikedBody = () => {
  const { data: user } = useGetUserQuery();
  const { data: likedItems = [], isLoading, error } = useGetLikedQuery(user?.id ?? "",{skip: !user?.id});

  if (!user?.id) return <Unauthorized />;

  if (isLoading) {
    return (
      <div className="cart">
        <h2 className="cart__title">Избранное</h2>
        <div className="cart__loading">Загрузка...</div>
      </div>
    );
  }

  if (error) {
    return <div className="cart__error">Ошибка при загрузке избранного</div>;
  }

  if (likedItems.length === 0) {
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

