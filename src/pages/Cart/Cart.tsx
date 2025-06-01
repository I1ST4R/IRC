import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../main/store";
import {
  fetchCart,
  removeItemFromCart,
  updateCartQuantity,
  addItemToLiked,
  removeItemFromLiked
} from "../../entity/users/users.slice";
import { validatePromoCode } from "../../entity/promo/promo.slice";
import { validateCertificateCode } from "../../entity/certificates/certificates.slice";
import { fetchProducts } from "../../entity/products/products.slice";
import cart from "./cart.svg";
import cartGarbageIcon from "./cartGarbageIcon.svg";
import { useAppSelector } from "../../main/store";
import PersonalAccount from "../../main/App/PersonalAccount/PersonalAccount";
import OrderMenu from "../../main/components/OrderMenu/OrderMenu";
import "./_cart.scss";

export const Cart: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id: userId, cart: cartItems, liked, loading: userLoading } = useAppSelector((state) => state.user);
  const {
    items: products,
    loading: productsLoading,
    error: productsError,
  } = useSelector((state: RootState) => state.products);
  const {
    code: promoCode,
    discount: promoDiscount,
    error: promoError,
  } = useSelector((state: RootState) => state.promo);
  const {
    code: certificateCode,
    amount: certificateAmount,
    error: certificateError,
  } = useSelector((state: RootState) => state.certificates);
  const navigate = useNavigate();

  const [isPromoOpen, setIsPromoOpen] = useState(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [promoInput, setPromoInput] = useState("");
  const [certificateInput, setCertificateInput] = useState("");
  const [isPersonalAccountOpen, setIsPersonalAccountOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchCart(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    dispatch(fetchProducts({ page: 1 }));
  }, [dispatch]);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (userId && newQuantity > 0) {
      dispatch(
        updateCartQuantity({
          userId,
          productId,
          quantity: newQuantity,
        })
      );
    }
  };

  const handleRemoveItem = (productId: string) => {
    if (userId) {
      dispatch(removeItemFromCart({ userId, productId }));
      setSelectedItems(prev => prev.filter(id => id !== productId));
    }
  };

  const handleSelectItem = (productId: string) => {
    setSelectedItems(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const getTotalItems = () => {
    if (selectedItems.length === 0) {
      return cartItems.reduce((total, item) => total + item.quantity, 0);
    }
    return cartItems
      .filter(item => selectedItems.includes(item.productId))
      .reduce((total, item) => total + item.quantity, 0);
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

  const getCartTotal = (withDiscount: boolean = true) => {
    const itemsToCalculate = selectedItems.length === 0 
      ? cartItems 
      : cartItems.filter(item => selectedItems.includes(item.productId));

    return itemsToCalculate.reduce((sum, item) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) return sum;
      return sum + getItemTotal(product, item.quantity, withDiscount);
    }, 0);
  };

  const getTotalDiscount = () => {
    const itemsToCalculate = selectedItems.length === 0 
      ? cartItems 
      : cartItems.filter(item => selectedItems.includes(item.productId));

    return itemsToCalculate.reduce((sum, item) => {
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

  const getPromoDiscountValue = () => {
    if (promoDiscount) {
      return Math.round(getCartTotal(true) * (promoDiscount / 100));
    }
    return 0;
  };

  const getCertificateDiscountValue = () => {
    const afterPromo = getCartTotal(true) - getPromoDiscountValue();
    if (certificateAmount && afterPromo > 0) {
      return Math.min(certificateAmount, afterPromo);
    }
    return 0;
  };

  const getFinalPrice = () => {
    const afterPromo = getCartTotal(true) - getPromoDiscountValue();
    const afterCertificate = afterPromo - getCertificateDiscountValue();
    return afterCertificate > 0 ? Math.round(afterCertificate) : 0;
  };

  if (!userId) {
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

  if (userLoading) {
    return (
      <div className="cart">
        <h2 className="cart__title">Корзина</h2>
        <div className="cart__loading">Загрузка...</div>
      </div>
    );
  }

  if (productsError) {
    return <div className="cart__error">{productsError}</div>;
  }

  if (cartItems.length === 0) {
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
        </div>
      </div>
      <div className="cart__body">
        {cartItems.length > 0 && (
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
        {cartItems.map((item) => {
          const product = products.find((p) => p.id === item.productId);
          if (!product) return null;
          const itemTotal = getItemTotal(product, item.quantity);

          return (
            <div key={item.productId} className="cart__item">
              <div className="cart__item-checkbox">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.productId)}
                  onChange={() => handleSelectItem(item.productId)}
                />
              </div>

              <div className="cart__item-img-block">
                <img
                  src={product.img}
                  alt={product.name}
                  className="cart__item-image"
                />
                <button
                  className={`product__like${
                    liked.some(item => item.productId === product.id)
                      ? " product__like--active"
                      : ""
                  }`}
                  onClick={() => {
                    if (userId) {
                      const isLiked = liked.some(item => item.productId === product.id);
                      if (isLiked) {
                        dispatch(removeItemFromLiked({ userId, productId: product.id }));
                      } else {
                        dispatch(addItemToLiked({ userId, productId: product.id }));
                      }
                    }
                  }}
                  title={
                    liked.some(item => item.productId === product.id)
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
                  <path d="M15 5L5 15" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5 5L15 15" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          );
        })}
        </div>

        <OrderMenu 
          selectedItems={selectedItems}
          cartItems={cartItems}
          products={products}
          promoDiscount={promoDiscount}
          certificateAmount={certificateAmount}
        />
      </div>
    </div>
  );
};

export default Cart;
