import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../main/store";
import { validatePromoCode } from "../../entity/promo/slice";
import { validateCertificateCode } from "../../entity/certificate/slice";
import cartImg from "./cart.svg";
import cartGarbageIcon from "./cartGarbageIcon.svg";
import PersonalAccount from "../../main/App/PersonalAccount/PersonalAccount";
import OrderMenu from "../../main/components/OrderMenu/OrderMenu";
import { fetchCart, fetchCartTotals, removeFromCart, updateCartItem } from "@/entity/cart/slice";
import { addItemToLiked, removeItemFromLiked } from "@/entity/liked/slice";


export const Cart: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);
  
  const { code : promoCode } = useSelector((state: RootState) => state.promo);
  const { code : Sertificate} = useSelector((state: RootState) => state.certificates);
  const cart = useSelector((state: RootState) => state.cart);
  const [promoInput, setPromoInput] = useState("");
  const [certificateInput, setCertificateInput] = useState("");
  const [isPersonalAccountOpen, setIsPersonalAccountOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  useEffect(() => {
    if (user.id) dispatch(fetchCart(user.id));
  }, [dispatch, user.id]);

  useEffect(() => {
    if (user.id) dispatch(fetchCartTotals(user.id));
  }, [dispatch, user.id, cart.items]);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (user.id && newQuantity > 0) {
      dispatch(
        updateCartItem({userId: user.id,productId: productId,quantity: newQuantity})
      );
    }
  };

  const handleRemoveItem = (productId: string) => {
    if (user.id) {
      dispatch(removeFromCart({ userId: user.id, productId: productId }));
      setSelectedItems(prev => prev.filter(id => id !== productId));
    }
  };

  const getItemTotal = (
    product: any,
    quantity: number,
    withDiscount: boolean = true
  ) => {
    const price = withDiscount
      ? product.price
      : product.prevPrice || product.price;
    return price * quantity;
  };

  const handlePromoSubmit = async () => {
    if (!promoInput.trim()) {
      return;
    }
    dispatch(validatePromoCode(promoInput));
  };

  const handleCertificateSubmit = async () => {
    if (!certificateInput.trim()) {
      return;
    }
    dispatch(validateCertificateCode(certificateInput));
  };

  if (!user.id) {
    return (
      <div className="cart container">
        <h2 className="cart__title">Корзина</h2>
        <div className="cart__empty">
          <p className="cart__empty-message">
            Авторизуйтесь, чтобы добавлять товары в корзину
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
            В корзине <span>{cart.totals.itemsCount}</span>
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
          return (
            <div key={item.product.id} className="cart__item">
              <div className="cart__item-checkbox">
                <input
                  type="checkbox"
                />
              </div>

              <div className="cart__item-img-block">
                <img
                  src={item.product.img}
                  alt={item.product.name}
                  className="cart__item-image"
                />
                <button
                  className={`product__like${
                    user.liked.some(item => item.productId === item.product.id)
                      ? " product__like--active"
                      : ""
                  }`}
                  onClick={() => {
                    if (user.id) {
                      const isLiked = user.liked.some(item => item.productId === item.product.id);
                      if (isLiked) {
                        dispatch(removeItemFromLiked({ userId: user.id, productId: item.product.id }));
                      } else {
                        dispatch(addItemToLiked({ userId: user.id, productId: item.product.id }));
                      }
                    }
                  }}
                  title={
                    user.liked.some(item => item.productId === item.product.id)
                      ? "Убрать из избранного"
                      : "В избранное"
                  }
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </button>
              </div>

              <div className="cart__item-text">
                <div className="cart__item-name-block">
                  <p className="cart__item-name">{item.product.name}</p>
                  <p className="cart__item-technology">{item.product.technology}</p>
                </div>

                <div className="cart__item-quantity">
                  <button
                    className="cart__item-quantity-btn"
                    onClick={() =>
                      handleQuantityChange(
                        item.product.id,
                        Math.max(1, item.quantity - 1)
                      )
                    }
                  >
                    -
                  </button>
                  <span className="cart__item-quantity-value">
                    {item.quantity}
                  </span>
                  <button
                    className="cart__item-quantity-btn"
                    onClick={() =>
                      handleQuantityChange(item.product.id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>

                <div className="cart__item-price-block">
                  {item.product.prevPrice ? (
                    <>
                      <p className="cart__item-price cart__item-price--new">
                        {/* {item.product.total} ₽ */} item.product.total
                      </p>
                      <p className="cart__item-price cart__item-price--old">
                        {/* {product.prevPrice * item.quantity} ₽ */} product.prevPrice * item.quantity
                      </p>
                    </>
                  ) : (
                    <div className="cart__item-price">{/* {itemTotal} ₽ */} item.product.total ₽</div>
                  )}
                </div>
              </div>

              <button
                className="cart__item-remove"
                onClick={() => handleRemoveItem(item.product.id)}
                title="Удалить из корзины"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M15 5L5 15" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5 5L15 15" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          );
        })}
        </div>

        <OrderMenu 
          cartItems={cart.items}
        />
      </div>
    </div>
  );
};

export default Cart;
