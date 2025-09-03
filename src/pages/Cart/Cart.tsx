import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import cartImg from "./cart.svg";
import cartGarbageIcon from "./cartGarbageIcon.svg";
import PersonalAccount from "../../_old-version/main/components/PersonalAccount/PersonalAccount";
import OrderMenu from "../../_old-version/main/components/OrderMenu/OrderMenu";
import { CartItem } from "@/main/components/CartItem/CartItem";
import BreadCrumb from "@/main/components/BreadCrumb/BreadCrumb";
import { openAccount } from "@/entity/account/slice";
import {
  useGetCartQuery,
  useClearCartMutation,
  useGetCartTotalsQuery
} from '@/entity/cart/api';
import { useGetLikedQuery } from "@/entity/liked/api";
import { useGetUserQuery } from "@/entity/users/api";
import { RootState } from '@/main/store';

export const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const {data: user} = useGetUserQuery();
  const {data: likedItems = []} = useGetLikedQuery(user?.id ?? '', { skip: !user?.id });
  const {isAccountOpen} = useSelector((state: RootState) => state.account);

  // RTK Query хуки
  const { data: cartItems = [], isLoading: isCartLoading, error: cartError } = useGetCartQuery(user?.id ?? '', { skip: !user?.id });
  const { data: itemsCount = 0 } = useGetCartTotalsQuery(user?.id ?? '', { skip: !user?.id });
  const [clearCart] = useClearCartMutation();

  if (!user?.id) {
    return (
      <div className="cart container">
        <BreadCrumb
          pageLinks={[
            { name: "Главная", link: "/" },
            { name: "Корзина", link: "/" },
          ]}
        />
        <h2 className="cart__title">Корзина</h2>
        <div className="cart__empty">
          <p className="cart__empty-message">
            <button
              className="cart__login-btn"
              onClick={() => dispatch(openAccount())}
            >
              ВОЙДИТЕ
            </button>
            , ЧТОБЫ ДОБАВЛЯТЬ ТОВАРЫ в корзину
          </p>
        </div>
        {isAccountOpen && (
          <PersonalAccount/>
        )}
      </div>
    );
  }

  if (isCartLoading) {
    return <div className="cart__empty">Загрузка корзины...</div>;
  }

  if (cartError) {
    return <div className="cart__empty">Ошибка загрузки корзины</div>;
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="cart__empty">
        <BreadCrumb
          pageLinks={[
            { name: "Главная", link: "/" },
            { name: "Корзина", link: "/" },
          ]}
        />
        <h2 className="cart__title">Корзина</h2>
        <img src={cartImg} alt="cart" />
        <div className="cart__empty-text">
          <p className="cart__empty-message">Ваша корзина пуста</p>
          <p className="cart__empty-link">
            <Link to="/catalog">Нажмите здесь,</Link>
            чтобы перейти в каталог
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart container">
      <div className="cart__header">
        <BreadCrumb
          pageLinks={[
            { name: "Главная", link: "/" },
            { name: "Корзина", link: "/" },
          ]}
        />
        <h2 className="cart__title">Корзина</h2>
        <div className="cart__info">
          <span className="cart__items-count">
            В корзине <span>{itemsCount}</span>
          </span>
        </div>
      </div>
      <div className="cart__body">
        {cartItems.length > 0 && (
          <button
            onClick={() => clearCart({ userId: user.id ?? '' })}
            title="Очистить корзину"
            className="cart__clear"
          >
            <img src={cartGarbageIcon} alt="cart-garbage-icon" />
            Очистить корзину
          </button>
        )} 
        <div className="cart__list">
          {cartItems.map((item) => {
            const isItemLiked = likedItems.some(
              (likedItem) => likedItem.id === item.product.id
            );
            return (
              <CartItem
                key={item.product.id}
                cartItem={item}
                userId={user.id ?? ''}
                isLiked={isItemLiked}
              />
            );
          })}
        </div>
        <OrderMenu />
      </div>
    </div>
  );
};

export default Cart;
