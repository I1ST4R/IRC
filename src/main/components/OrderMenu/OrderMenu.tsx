import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { RootState } from "../../../main/store";
import { useValidatePromoCodeMutation } from "../../../entity/promo/api";
import { useValidateCertificateCodeMutation } from "../../../entity/certificate/api";
import "./_order-menu.scss";
import { useGetCartQuery } from "@/entity/cart/api";
import { changeOrderInfo } from "@/entity/order/slice";
import { useAppDispatch } from "@/main/store";
import { useGetUserQuery } from "@/entity/users/api";

interface OrderMenuProps {
  handleSubmit?: () => void;
}

export const OrderMenu = (props: OrderMenuProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const promo = useSelector((state: RootState) => state.promo);
  const order = useSelector((state: RootState) => state.orders.current);
  const certificate = useSelector((state: RootState) => state.certificate);
  const { data: user } = useGetUserQuery();
  
  const { data: cartItems = [] } = useGetCartQuery(user?.id ?? '', { skip: !user?.id });
  const [validatePromo] = useValidatePromoCodeMutation();
  const [validateCertificate] = useValidateCertificateCodeMutation();

  const [promocode, setPromocode] = useState<string | null>(null);
  const [sertificate, setSertificate] = useState<string | null>(null);
  const [promoTouched, setPromoTouched] = useState(false);
  const [sertTouched, setSertTouched] = useState(false);

  const checkedCartItems = cartItems.filter((item) => item.isChecked);

  useEffect(() => {
    if (!user?.id || !cartItems.filter((item) => item.isChecked).length) return;

    dispatch(
      changeOrderInfo({
        userId: user.id,
        cartItems: checkedCartItems,
        promocodePercent: promo.promo.valid 
          ? promo.promo.discount 
          : null,
        promocodeId: promo.promo.id,
        certificateDiscount: certificate.certificate.valid
          ? certificate.certificate.amount
          : null,
          certificateId: certificate.certificate.id,
      })
    );
  }, [
    dispatch,
    user?.id,
    promo.promo.valid,
    certificate.certificate.valid,
    cartItems,
    checkedCartItems,
  ]);

  // Сброс touched состояний когда промокод/сертификат становятся валидными
  useEffect(() => {
    if (promo.promo.valid) {
      setPromoTouched(false);
    }
  }, [promo.promo.valid]);

  useEffect(() => {
    if (certificate.certificate.valid) {
      setSertTouched(false);
    }
  }, [certificate.certificate.valid]);

  const isOrderPage = location.pathname === "/order";

  const handleCheckout = () => {
    if(!isOrderPage){
      navigate("/order");
      return
    }
    if(props.handleSubmit) props.handleSubmit()
  }

  const handlePromocodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPromocode(e.target.value);
    // Сброс touched если поле очищается
    if (!e.target.value) {
      setPromoTouched(false);
    }
  };

  const handlePromocodeBlur = () => {
    if (promocode) {
      setPromoTouched(true);
      validatePromo(promocode);
    }
  };

  const handleSertificateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSertificate(e.target.value);
    // Сброс touched если поле очищается
    if (!e.target.value) {
      setSertTouched(false);
    }
  };

  const handleSertificateBlur = () => {
    if (sertificate) {
      setSertTouched(true);
      validateCertificate(sertificate);
    }
  };

  if (!user?.id) {
    return (
      <div className="order-menu">
        <div className="order-menu__error">Пожалуйста, войдите в систему</div>
      </div>
    );
  }

  if (!order || !order.total) {
    return;
  }

  return (
    <div className="order-menu">
      <p className="order-menu__item">Ваш заказ</p>

      {isOrderPage && checkedCartItems.length > 0 && (
        <div className="order-menu__items">
          {checkedCartItems.map((item) => {
            return (
              <div key={item.product.id} className="order-menu__item-details">
                <div className="order-menu__item-info">
                  <img
                    src={item.product.img}
                    alt={item.product.name}
                    className="order-menu__item-image"
                  />
                  <div className="order-menu__item-text">
                    <span className="order-menu__item-name">
                      {item.product.name}
                    </span>
                    <span className="order-menu__item-technology">
                      {item.product.technology}
                    </span>
                    <span className="order-menu__item-quantity">
                      x{item.quantity}
                    </span>
                  </div>
                </div>
                <span className="order-menu__item-price">
                  {item.product.price * item.quantity} ₽
                </span>
              </div>
            );
          })}
        </div>
      )}

      <div className="order-menu__item">
        <div className="order-menu__text">
          <span className="order-menu__label">Товары на сумму:</span>
          <span className="order-menu__value">{order.total} ₽</span>
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
          <span className="order-menu__value">{order.deliveryCost} ₽</span>
        </div>
        <div className="order-menu__text">
          <span className="order-menu__label">Всего к оплате:</span>
          <span className="order-menu__value">{order.totalWithDiscount} ₽</span>
        </div>
      </div>

      <div className="order-menu__item">
        {!promo.promo.valid && (
          <div className="order-menu__field">
            <input
              type="text"
              value={promocode || ""}
              onChange={handlePromocodeChange}
              onBlur={handlePromocodeBlur}
              placeholder="Промокод"
              className={`order-menu__input ${promoTouched && promocode && !promo.promo.valid ? 'order-menu__input--error' : ''}`}
            />
            {promoTouched && promocode && !promo.promo.valid && (
              <div style={{ color: "red", fontSize: "13px", marginTop: "4px" }}>
                {promo.error || "Промокод недействителен"}
              </div>
            )}
          </div>
        )}
        {promo.promo.valid && (
          <div className="order-menu__field" style={{ color: '#CA354F' }}>
            Promocode activated
          </div>
        )}
        {!certificate.certificate.valid && (
          <div className="order-menu__field">
            <input
              type="text"
              value={sertificate || ""}
              onChange={handleSertificateChange}
              onBlur={handleSertificateBlur}
              placeholder="Сертификат"
              className={`order-menu__input ${sertTouched && sertificate && !certificate.certificate.valid ? 'order-menu__input--error' : ''}`}
            />
            {sertTouched && sertificate && !certificate.certificate.valid && (
              <div style={{ color: "red", fontSize: "13px", marginTop: "4px" }}>
                {certificate.error || "Сертификат недействителен"}
              </div>
            )}
          </div>
        )}
        {certificate.certificate.valid && (
          <div className="order-menu__field" style={{ color: '#CA354F' }}>
            Certificate activated
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
