import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link} from "react-router-dom";
import { AppDispatch, RootState } from "../../main/store";
import cartImg from "./cart.svg";
import cartGarbageIcon from "./cartGarbageIcon.svg";
import PersonalAccount from "../../main/App/PersonalAccount/PersonalAccount";
import OrderMenu from "../../main/components/OrderMenu/OrderMenu";
import { fetchCart, fetchCartTotals } from "@/entity/cart/slice";
import { CartItem } from "@/main/components/CartItem/CartItem";

export const Cart: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);
  const cart = useSelector((state: RootState) => state.cart);
  const [isPersonalAccountOpen, setIsPersonalAccountOpen] = useState(false);

  useEffect(() => {
    if (user.id) {
      const userId = user.id
      dispatch(fetchCart(userId)).then(() => {
        dispatch(fetchCartTotals(userId));
      });
    }
  }, [dispatch, user.id]);

  if (!user.id) {
    return (
      <div className="cart container">
        <h2 className="cart__title">Корзина</h2>
        <div className="cart__empty">
          <p className="cart__empty-message">
            <button
              className="cart__login-btn"
              onClick={() => setIsPersonalAccountOpen(true)}
            >
              ВОЙДИТЕ
            </button>
            , ЧТОБЫ ДОБАВЛЯТЬ ТОВАРЫ в корзину
          </p>
        </div>
        {isPersonalAccountOpen && (
          <PersonalAccount onClose={() => setIsPersonalAccountOpen(false)} />
        )}
      </div>
    );
  }

  if (cart.items.length === 0) {
    return (
      <div className="cart__empty">
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
        <h2 className="cart__title">Корзина</h2>
        <div className="cart__info">
          <span className="cart__items-count">
            В корзине <span>{cart.itemsCount}</span>
          </span>
        </div>
      </div>
      <div className="cart__body">
        {cart.items.length > 0 && (
          <button
            onClick={() => {}}
            title="Очистить корзину"
            className="cart__clear"
          >
            <img src={cartGarbageIcon} alt="cart-garbage-icon" />
            Очистить корзину
          </button>
        )}
        <div className="cart__list">
          {cart.items.map((item) => {
            const isItemLiked = user.liked.some(likedItem => likedItem.productId === item.product.id);
            return (
              <CartItem
                key={item.product.id}
                cartItem = {item}
                userId = {user.id}
                isLiked = {isItemLiked}
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
