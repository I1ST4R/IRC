import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../../services/store';
import { validatePromoCode, clearPromo } from '../../../entity/promo/promo.slice';
import { validateCertificateCode, clearCertificate } from '../../../entity/certificates/certificates.slice';
import { fetchOrderTotals } from '../../../entity/cart/cart.slice';
import promo from '../../../pages/Cart/promo.svg';
import certificate from '../../../pages/Cart/certificate.svg';
import './_order-menu.scss';

interface OrderMenuProps {
  selectedItems?: string[];
  promoCode?: string;
  certificateCode?: string;
  showItems?: boolean;
}

export const OrderMenu: React.FC<OrderMenuProps> = ({
  selectedItems = [],
  promoCode,
  certificateCode,
  showItems = false
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id: userId } = useSelector((state: RootState) => state.user);
  const { totals, loading, error } = useSelector((state: RootState) => state.cart);

  console.log('OrderMenu render:', { userId, totals, loading, error });

  useEffect(() => {
    if (userId) {
      console.log('Dispatching fetchOrderTotals with:', { userId, promoCode, certificateCode });
      dispatch(fetchOrderTotals({ userId, promoCode, certificateCode }));
    }
  }, [dispatch, userId, promoCode, certificateCode]);

  const handlePromoSubmit = async () => {
    if (!promoCode) {
      return;
    }
    dispatch(validatePromoCode(promoCode));
  };

  const handleCertificateSubmit = async () => {
    if (!certificateCode) {
      return;
    }
    dispatch(validateCertificateCode(certificateCode));
  };

  const handleCheckout = () => {
    navigate('/order');
  };

  if (!userId) {
    return (
      <div className="order-menu">
        <div className="order-menu__error">Пожалуйста, войдите в систему</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="order-menu">
        <div className="order-menu__loading">Загрузка...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="order-menu">
        <div className="order-menu__error">{error}</div>
      </div>
    );
  }

  if (!totals) {
    return (
      <div className="order-menu">
        <div className="order-menu__error">Нет данных для отображения</div>
      </div>
    );
  }

  return (
    <div className="order-menu">
      <p className="order-menu__item">Ваш заказ</p>

      <div className="order-menu__item">
        <div className="order-menu__text">
          <span className="order-menu__label">Товары на сумму:</span>
          <span className="order-menu__value">
            {totals.totalWithoutDiscount} ₽
          </span>
        </div>
        <div className="order-menu__text">
          <span className="order-menu__label">Скидка:</span>
          <span className="order-menu__value order-menu__value--discount">
            {totals.totalDiscount} ₽
          </span>
        </div>
        {totals.promoDiscount > 0 && (
          <div className="order-menu__text">
            <span className="order-menu__label">Скидка по промокоду:</span>
            <span className="order-menu__value order-menu__value--discount">
              {totals.promoDiscount} ₽
            </span>
          </div>
        )}
        {totals.certificateDiscount > 0 && (
          <div className="order-menu__text">
            <span className="order-menu__label">Скидка по сертификату:</span>
            <span className="order-menu__value order-menu__value--discount">
              {totals.certificateDiscount} ₽
            </span>
          </div>
        )}
        <div className="order-menu__text">
          <span className="order-menu__label">Доставка:</span>
          <span className="order-menu__value">0 ₽</span>
        </div>
        <div className="order-menu__text">
          <span className="order-menu__label">Всего к оплате:</span>
          <span className="order-menu__value">{totals.finalTotal} ₽</span>
        </div>
      </div>

      <div className="order-menu__item">
        <div
          className="order-menu__field"
          onClick={handlePromoSubmit}
        >
          <div className="order-menu__item-name">
            <img src={promo} alt="promo" />
            <span>Промокод</span>
          </div>
        </div>
      </div>

      <div className="order-menu__item">
        <div
          className="order-menu__field"
          onClick={handleCertificateSubmit}
        >
          <div className="order-menu__item-name">
            <img src={certificate} alt="certificate" />
            <span>Сертификат</span>
          </div>
        </div>
      </div>

      <button className="order-menu__button" onClick={handleCheckout}>
        Оформить заказ
      </button>
    </div>
  );
};

export default OrderMenu; 