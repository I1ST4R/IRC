import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "../../main/store";
import { fetchCart, removeItemFromCart, updateItemQuantity, clearCart } from "../../entity/products/cartSlice.ts";
import { toggleLike } from "../../entity/users/users.slice";
import { fetchProducts } from "../../entity/products/products.slice";
import { validatePromoCode, clearPromo } from "../../entity/promo/promo.slice";
import { validateCertificateCode, clearCertificate } from "../../entity/certificates/certificates.slice";
import cart from "./cart.svg";
import cartGarbageIcon from "./cartGarbageIcon.svg";
import promo from "./promo.svg";
import certificate from "./certificate.svg";

const USER_ID_KEY = "currentUserId";

export const Cart: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userId = localStorage.getItem(USER_ID_KEY) || "";
  const {
    items,
    loading: cartLoading,
    error: cartError,
  } = useSelector((state: RootState) => state.cart);
  const {
    items: products,
    loading: productsLoading,
    error: productsError,
  } = useSelector((state: RootState) => state.products);
  const { likedIds } = useSelector((state: RootState) => state.user);
  const { code: promoCode, discount: promoDiscount, error: promoError } = useSelector((state: RootState) => state.promo);
  const { code: certificateCode, amount: certificateAmount, error: certificateError } = useSelector((state: RootState) => state.certificates);
  
  const [isPromoOpen, setIsPromoOpen] = useState(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [promoInput, setPromoInput] = useState("");
  const [certificateInput, setCertificateInput] = useState("");

  useEffect(() => {
    if (userId) {
      dispatch(fetchCart(userId));
      dispatch(fetchProducts({ page: 1 }));
    }
  }, [dispatch, userId]);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (userId && newQuantity > 0) {
      dispatch(
        updateItemQuantity({ userId, productId, quantity: newQuantity })
      );
    }
  };

  const handleRemoveItem = (productId: string) => {
    if (userId) {
      dispatch(removeItemFromCart({ userId, productId }));
    }
  };

  const handleClearCart = () => {
    if (userId) {
      dispatch(clearCart(userId));
    }
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
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

  const getCartTotal = (withDiscount: boolean = true) =>
    items.reduce((sum, item) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) return sum;
      return sum + getItemTotal(product, item.quantity, withDiscount);
    }, 0);

  const getTotalDiscount = () => {
    return items.reduce((sum, item) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product || !product.prevPrice) return sum;
      return sum + (product.prevPrice - product.price) * item.quantity;
    }, 0);
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

  // Функция для расчёта скидки по промокоду
  const getPromoDiscountValue = () => {
    if (promoDiscount) {
      // Скидка по промокоду применяется к сумме после товарных скидок
      return Math.round(getCartTotal(true) * (promoDiscount / 100));
    }
    return 0;
  };

  // Чистая функция для расчёта скидки по сертификату
  const getCertificateDiscountValue = () => {
    const afterPromo = getCartTotal(true) - getPromoDiscountValue();
    console.log('certificateAmount:', certificateAmount, 'afterPromo:', afterPromo);
    if (certificateAmount && afterPromo > 0) {
      const applied = Math.min(certificateAmount, afterPromo);
      console.log('applied certificate:', applied);
      return applied;
    }
    return 0;
  };

  // Итоговая сумма
  const getFinalPrice = () => {
    const afterPromo = getCartTotal(true) - getPromoDiscountValue();
    const afterCertificate = afterPromo - getCertificateDiscountValue();
    console.log('getFinalPrice:', { afterPromo, afterCertificate });
    return afterCertificate > 0 ? Math.round(afterCertificate) : 0;
  };

  // Обработка нажатия на кнопку оформления заказа: если промокод или сертификат введены, но не валидированы, запускаем их валидацию
  const handleCheckout = async () => {
    if (promoInput && !promoCode) {
      await dispatch(validatePromoCode(promoInput));
    }
    if (certificateInput && !certificateCode) {
      await dispatch(validateCertificateCode(certificateInput));
    }
  };

  const loading = cartLoading || productsLoading === "pending";
  const error = cartError || productsError;

  if (loading) {
    return (
      <div className="cart">
        <h2 className="cart__title">Корзина</h2>
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
        <h2 className="cart__title">Корзина</h2>
        <img src={cart} alt="cart" />
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
            В корзине <span>{getTotalItems()}</span>
          </span>
          {items.length > 0 && (
            <button
              onClick={handleClearCart}
              title="Очистить корзину"
              className="cart__clear"
            >
              <img src={cartGarbageIcon} alt="cart-garbage-icon" />
              Очистить корзину
            </button>
          )}
        </div>
      </div>
      <div className="cart__body">
        <div className="cart__items">
          {items.map((item) => {
            const product = products.find((p) => p.id === item.productId);
            if (!product) return null;
            const itemTotal = getItemTotal(product, item.quantity);

            return (
              <div key={item.productId} className="cart__item">
                <div className="cart__item-img-block">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="cart__item-image"
                  />
                  <button
                    className={`product__like${
                      likedIds.includes(product.id)
                        ? " product__like--active"
                        : ""
                    }`}
                    onClick={() =>
                      dispatch(
                        toggleLike({ userId, productId: product.id, likedIds })
                      )
                    }
                    title={
                      likedIds.includes(product.id)
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

                <div className="cart__item-name-block">
                  <p className="cart__item-name">{product.name}</p>
                  <p className="cart__item-technology">{product.technology}</p>
                </div>

                <div className="cart__item-quantity">
                  <button
                    className="cart__item-quantity-btn"
                    onClick={() =>
                      handleQuantityChange(
                        item.productId,
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
                      handleQuantityChange(item.productId, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>

                <div className="cart__item-price-block">
                  {product.prevPrice ? (
                    <>
                      <p className="cart__item-price cart__item-price--new">
                        {itemTotal} ₽
                      </p>
                      <p className="cart__item-price cart__item-price--old">
                        {product.prevPrice * item.quantity} ₽
                      </p>
                    </>
                  ) : (
                    <div className="cart__item-price">{itemTotal} ₽</div>
                  )}
                </div>

                <button
                  className="cart__item-remove"
                  onClick={() => handleRemoveItem(item.productId)}
                  title="Удалить из корзины"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g>
                      <path
                        d="M15.0018 4.99985C14.8455 4.84362 14.6336 4.75586 14.4126 4.75586C14.1917 4.75586 13.9797 4.84362 13.8235 4.99985L10.0018 8.82152L6.18013 4.99985C6.02386 4.84362 5.81194 4.75586 5.59097 4.75586C5.37 4.75586 5.15807 4.84362 5.0018 4.99985C4.84558 5.15612 4.75781 5.36804 4.75781 5.58901C4.75781 5.80998 4.84558 6.02191 5.0018 6.17818L8.82347 9.99985L5.0018 13.8215C4.84558 13.9778 4.75781 14.1897 4.75781 14.4107C4.75781 14.6317 4.84558 14.8436 5.0018 14.9998C5.15807 15.1561 5.37 15.2438 5.59097 15.2438C5.81194 15.2438 6.02386 15.1561 6.18013 14.9998L10.0018 11.1782L13.8235 14.9998C13.9797 15.1561 14.1917 15.2438 14.4126 15.2438C14.6336 15.2438 14.8455 15.1561 15.0018 14.9998C15.158 14.8436 15.2458 14.6317 15.2458 14.4107C15.2458 14.1897 15.158 13.9778 15.0018 13.8215L11.1801 9.99985L15.0018 6.17818C15.158 6.02191 15.2458 5.80998 15.2458 5.58901C15.2458 5.36804 15.158 5.15612 15.0018 4.99985Z"
                        fill="grey"
                      />
                    </g>
                  </svg>
                </button>
              </div>
            );
          })}
        </div>

        <div className="cart__summary">
          <p className="cart__summary-item">Ваш заказ</p>

          <div className="cart__summary-item">
            <div className="cart__summary-text">
              <span className="cart__summary-label">Товары на сумму:</span>
              <span className="cart__summary-value">
                {getCartTotal(false)} ₽
              </span>
            </div>
            <div className="cart__summary-text">
              <span className="cart__summary-label">Скидка:</span>
              <span className="cart__summary-value cart__summary-value--discount">
                {getTotalDiscount()} ₽
              </span>
            </div>
            {(promoDiscount ?? 0) > 0 && (
              <div className="cart__summary-text">
                <span className="cart__summary-label">Скидка по промокоду:</span>
                <span className="cart__summary-value cart__summary-value--discount">
                  {getPromoDiscountValue()} ₽
                </span>
              </div>
            )}
            {(certificateAmount ?? 0) > 0 && (
              <div className="cart__summary-text">
                <span className="cart__summary-label">Сертификат:</span>
                <span className="cart__summary-value cart__summary-value--discount">
                  {getCertificateDiscountValue()} ₽
                </span>
              </div>
            )}
            <div className="cart__summary-text">
              <span className="cart__summary-label">Доставка:</span>
              <span className="cart__summary-value">0 ₽</span>
            </div>
            <div className="cart__summary-text">
              <span className="cart__summary-label">Всего к оплате:</span>
              <span className="cart__summary-value">{getFinalPrice()} ₽</span>
            </div>
          </div>

          <div className="cart__summary-item">
            <div 
              className="cart__summary-field"
              onClick={() => setIsPromoOpen(!isPromoOpen)}
            >
              <div className="cart__summary-item-name">
                <img src={promo} alt="promo" />
                <span>Промокод</span>
              </div>
              <svg 
                className={`cart__summary-arrow ${isPromoOpen ? 'cart__summary-arrow--open' : ''}`}
                width="12" 
                height="8" 
                viewBox="0 0 12 8" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1 1.5L6 6.5L11 1.5" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            {isPromoOpen && (
              <div className="cart__summary-input-wrapper">
                {promoError && <div className="cart__summary-error">{promoError}</div>}
                <input 
                  type="text" 
                  placeholder="промокод" 
                  value={promoInput}
                  onChange={(e) => {
                    setPromoInput(e.target.value);
                    if (promoError) dispatch(clearPromo());
                  }}
                  onKeyPress={(e) => e.key === 'Enter' && handlePromoSubmit()}
                />
                {promoCode && (
                  <div className="cart__summary-success">
                    Промокод применен
                    <button 
                      className="cart__summary-clear"
                      onClick={() => {
                        dispatch(clearPromo());
                        setPromoInput('');
                      }}
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="cart__summary-item">
            <div 
              className="cart__summary-field"
              onClick={() => setIsCertificateOpen(!isCertificateOpen)}
            >
              <div className="cart__summary-item-name">
                <img src={certificate} alt="certificate" />
                <span>Сертификат</span>
              </div>
              <svg 
                className={`cart__summary-arrow ${isCertificateOpen ? 'cart__summary-arrow--open' : ''}`}
                width="12" 
                height="8" 
                viewBox="0 0 12 8" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1 1.5L6 6.5L11 1.5" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            {isCertificateOpen && (
              <div className="cart__summary-input-wrapper">
                {certificateError && <div className="cart__summary-error">{certificateError}</div>}
                <input 
                  type="text" 
                  placeholder="сертификат" 
                  value={certificateInput}
                  onChange={(e) => {
                    setCertificateInput(e.target.value);
                    if (certificateError) dispatch(clearCertificate());
                  }}
                  onKeyPress={(e) => e.key === 'Enter' && handleCertificateSubmit()}
                />
                {certificateCode && (
                  <div className="cart__summary-success">
                    Сертификат применен
                    <button 
                      className="cart__summary-clear"
                      onClick={() => {
                        dispatch(clearCertificate());
                        setCertificateInput('');
                      }}
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <button 
            className="cart__summary-button"
            onClick={handleCheckout}
          >
            Оформить заказ
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
