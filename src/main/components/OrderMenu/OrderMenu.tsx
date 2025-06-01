import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store';
import { validatePromoCode, clearPromo } from '../../../entity/promo/promo.slice';
import { validateCertificateCode, clearCertificate } from '../../../entity/certificates/certificates.slice';
import promo from '../../../pages/Cart/promo.svg';
import certificate from '../../../pages/Cart/certificate.svg';
import './_order-menu.scss';

interface OrderMenuProps {
  selectedItems: string[];
  cartItems: Array<{ productId: string; quantity: number }>;
  products: Array<{
    id: string;
    name: string;
    technology: string;
    price: number;
    prevPrice?: number;
    img: string;
  }>;
  promoDiscount: number | null;
  certificateAmount: number | null;
  showItems?: boolean;
}

export const OrderMenu: React.FC<OrderMenuProps> = ({
  selectedItems = [],
  cartItems = [],
  products = [],
  promoDiscount,
  certificateAmount,
  showItems = false
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isPromoOpen, setIsPromoOpen] = useState(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [promoInput, setPromoInput] = useState("");
  const [certificateInput, setCertificateInput] = useState("");

  const {
    code: promoCode,
    error: promoError,
  } = useSelector((state: RootState) => state.promo);
  const {
    code: certificateCode,
    error: certificateError,
  } = useSelector((state: RootState) => state.certificates);

  const getItemTotal = (product: any, quantity: number, withDiscount: boolean = true) => {
    const price = withDiscount ? product.price : product.prevPrice || product.price;
    return price * quantity;
  };

  const getCartTotal = (withDiscount: boolean = true) => {
    if (!cartItems || !products) return 0;
    
    const itemsToCalculate = selectedItems?.length === 0 
      ? cartItems 
      : cartItems.filter(item => selectedItems.includes(item.productId));

    return itemsToCalculate.reduce((sum, item) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) return sum;
      const price = withDiscount ? product.price : product.prevPrice || product.price;
      return sum + price * item.quantity;
    }, 0);
  };

  const getTotalDiscount = () => {
    if (!cartItems || !products) return 0;

    const itemsToCalculate = selectedItems?.length === 0 
      ? cartItems 
      : cartItems.filter(item => selectedItems.includes(item.productId));

    return itemsToCalculate.reduce((sum, item) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product || !product.prevPrice) return sum;
      return sum + (product.prevPrice - product.price) * item.quantity;
    }, 0);
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

  const handleCheckout = () => {
    navigate('/order');
  };

  const renderOrderItems = () => {
    if (!showItems || !cartItems || !products) return null;

    const itemsToShow = selectedItems?.length === 0 
      ? cartItems 
      : cartItems.filter(item => selectedItems.includes(item.productId));

    return (
      <div className="order-menu__items">
        {itemsToShow.map((item) => {
          const product = products.find((p) => p.id === item.productId);
          if (!product) return null;

          return (
            <div key={item.productId} className="order-menu__item-row">
              <div className="order-menu__item-info">
                <img src={product.img} alt={product.name} className="order-menu__item-image" />
                <div className="order-menu__item-details">
                  <span className="order-menu__item-name">{product.name}</span>
                  <span className="order-menu__item-technology">{product.technology}</span>
                </div>
              </div>
              <div className="order-menu__item-quantity">
                <span>{item.quantity} шт.</span>
              </div>
              <div className="order-menu__item-price">
                {getItemTotal(product, item.quantity)} ₽
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="order-menu">
      <p className="order-menu__item">Ваш заказ</p>

      {renderOrderItems()}

      <div className="order-menu__item">
        <div className="order-menu__text">
          <span className="order-menu__label">Товары на сумму:</span>
          <span className="order-menu__value">
            {getCartTotal(false)} ₽
          </span>
        </div>
        <div className="order-menu__text">
          <span className="order-menu__label">Скидка:</span>
          <span className="order-menu__value order-menu__value--discount">
            {getTotalDiscount()} ₽
          </span>
        </div>
        {(promoDiscount ?? 0) > 0 && (
          <div className="order-menu__text">
            <span className="order-menu__label">
              Скидка по промокоду:
            </span>
            <span className="order-menu__value order-menu__value--discount">
              {getPromoDiscountValue()} ₽
            </span>
          </div>
        )}
        {(certificateAmount ?? 0) > 0 && (
          <div className="order-menu__text">
            <span className="order-menu__label">Сертификат:</span>
            <span className="order-menu__value order-menu__value--discount">
              {getCertificateDiscountValue()} ₽
            </span>
          </div>
        )}
        <div className="order-menu__text">
          <span className="order-menu__label">Доставка:</span>
          <span className="order-menu__value">0 ₽</span>
        </div>
        <div className="order-menu__text">
          <span className="order-menu__label">Всего к оплате:</span>
          <span className="order-menu__value">{getFinalPrice()} ₽</span>
        </div>
      </div>

      <div className="order-menu__item">
        <div
          className="order-menu__field"
          onClick={() => setIsPromoOpen(!isPromoOpen)}
        >
          <div className="order-menu__item-name">
            <img src={promo} alt="promo" />
            <span>Промокод</span>
          </div>
          <svg
            className={`order-menu__arrow ${
              isPromoOpen ? "order-menu__arrow--open" : ""
            }`}
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1.5L6 6.5L11 1.5"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        {isPromoOpen && (
          <div className="order-menu__input-wrapper">
            {promoError && (
              <div className="order-menu__error">{promoError}</div>
            )}
            <input
              type="text"
              placeholder="промокод"
              value={promoInput}
              onChange={(e) => {
                setPromoInput(e.target.value);
                if (promoError) dispatch(clearPromo());
              }}
              onKeyPress={(e) => e.key === "Enter" && handlePromoSubmit()}
            />
            {promoCode && (
              <div className="order-menu__success">
                Промокод применен
                <button
                  className="order-menu__clear"
                  onClick={() => {
                    dispatch(clearPromo());
                    setPromoInput("");
                  }}
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="order-menu__item">
        <div
          className="order-menu__field"
          onClick={() => setIsCertificateOpen(!isCertificateOpen)}
        >
          <div className="order-menu__item-name">
            <img src={certificate} alt="certificate" />
            <span>Сертификат</span>
          </div>
          <svg
            className={`order-menu__arrow ${
              isCertificateOpen ? "order-menu__arrow--open" : ""
            }`}
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1.5L6 6.5L11 1.5"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        {isCertificateOpen && (
          <div className="order-menu__input-wrapper">
            {certificateError && (
              <div className="order-menu__error">{certificateError}</div>
            )}
            <input
              type="text"
              placeholder="сертификат"
              value={certificateInput}
              onChange={(e) => {
                setCertificateInput(e.target.value);
                if (certificateError) dispatch(clearCertificate());
              }}
              onKeyPress={(e) =>
                e.key === "Enter" && handleCertificateSubmit()
              }
            />
            {certificateCode && (
              <div className="order-menu__success">
                Сертификат применен
                <button
                  className="order-menu__clear"
                  onClick={() => {
                    dispatch(clearCertificate());
                    setCertificateInput("");
                  }}
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <button className="order-menu__button" onClick={handleCheckout}>
        Оформить заказ
      </button>
    </div>
  );
};

export default OrderMenu; 