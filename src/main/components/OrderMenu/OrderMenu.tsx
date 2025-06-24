import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppDispatch, RootState } from '../../../main/store';
import { validatePromoCode, clearPromo } from '../../../entity/promo/slice';
import { validateCertificateCode, clearCertificate } from '../../../entity/certificate/slice';
import promoSvg from '../../../pages/Cart/promo.svg';
import certificate from '../../../pages/Cart/certificate.svg';
import './_order-menu.scss';
import { CartItem, CartState } from '@/entity/cart/types';
import { changeOrderInfo } from '@/entity/order/slice';

export const OrderMenu = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const promo = useSelector((state: RootState) => state.promo);
  const order = useSelector((state: RootState) => state.orders.current);
  const certificates = useSelector((state: RootState) => state.certificates);
  const user = useSelector((state: RootState) => state.user);
  const {loading, error, items } = useSelector((state: RootState) => state.cart as CartState);
  const [promocode, setPromocode] = useState(null)
  const [sertificate, setSertificate] = useState(null)
  

  useEffect(() => {
    if (!user.id || !items.filter(item => item.isChecked)) return
    const checkedCartItems = items.filter(item => item.isChecked);

    dispatch(changeOrderInfo({
      userId: user.id,
      cartItems: checkedCartItems,
      promocodeDiscount: promo.discount, 
      certificateDiscount: certificates.amount, 
    }));
  }, [dispatch, user.id, promocode, sertificate, items]);

  const handlePromoSubmit = async () => {
    if (!promocode) return
    await dispatch(validatePromoCode(promocode));
  };

  const handleCertificateSubmit = async () => {
    if (!sertificate) return;
    dispatch(validateCertificateCode(sertificate));
  };

  const handleCheckout = () => {
    navigate('/order');
  };

  if (!user.id) {
    return (
      <div className="order-menu">
        <div className="order-menu__error">Пожалуйста, войдите в систему</div>
      </div>
    );
  }

  if (loading === "pending") {
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

  const isOrderPage = location.pathname === '/order';

  if (!order || !order.total){
    return 
  }

  return (
    <div className="order-menu">
      <p className="order-menu__item">Ваш заказ</p>

      {isOrderPage && items.length > 0 && (
        <div className="order-menu__items">
          {items.map((item) => {
            
            return (
              <div key={item.product.id} className="order-menu__item-details">
                <div className="order-menu__item-info">
                  <img 
                    src={item.product.img} 
                    alt={item.product.name} 
                    className="order-menu__item-image"
                  />
                  <div className="order-menu__item-text">
                    <span className="order-menu__item-name">{item.product.name}</span>
                    <span className="order-menu__item-technology">{item.product.technology}</span>
                    <span className="order-menu__item-quantity">x{item.quantity}</span>
                  </div>
                </div>
                <span className="order-menu__item-price">{item.product.price * item.quantity} ₽</span>
              </div>
            );
          })}
        </div>
      )}

      <div className="order-menu__item">
        <div className="order-menu__text">
          <span className="order-menu__label">Товары на сумму:</span>
          <span className="order-menu__value">
            {order.total} ₽
          </span>
        </div>
        <div className="order-menu__text">
          <span className="order-menu__label">Скидка:</span>
          <span className="order-menu__value order-menu__value--discount">
            {order.discount} ₽
          </span>
        </div>
        {order.promocodeDiscount && (
          <div className="order-menu__text">
            <span className="order-menu__label">Скидка по промокоду:</span>
            <span className="order-menu__value order-menu__value--discount">
              {order.promocodeDiscount} ₽
            </span>
          </div>
        )}
        {order.certificateDiscount && (
          <div className="order-menu__text">
            <span className="order-menu__label">Скидка по сертификату:</span>
            <span className="order-menu__value order-menu__value--discount">
              {order.certificateDiscount} ₽
            </span>
          </div>
        )}
        <div className="order-menu__text">
          <span className="order-menu__label">Доставка:</span>
          <span className="order-menu__value">0 ₽</span>
        </div>
        <div className="order-menu__text">
          <span className="order-menu__label">Всего к оплате:</span>
          <span className="order-menu__value">{order.totalWithDiscount} ₽</span>
        </div>
      </div>

      <div className="order-menu__item">
        <div
          className="order-menu__field"
          onClick={handlePromoSubmit}
        >
          <div className="order-menu__item-name">
            <img src={promoSvg} alt="promo" />
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