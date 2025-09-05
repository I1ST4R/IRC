import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { RootState, useAppDispatch } from "@/shared/store/sharedStore";
import { useValidatePromoCodeMutation, useGetPromoCodeQuery } from "./store/promo/api";
import { useGetCertificateCodeQuery, useValidateCertificateCodeMutation } from "./store/certificate/api";
import { useGetUserQuery } from "@/shared/store/user/userApiSlice";
import { useGetCartQuery } from "@/shared/store/cart/cartApiSlice";
import { changeOrderInfo } from "@/shared/store/order/orderSlice";
import { OrderMenuList } from "./components/OrderMenuList";


interface OrderMenuProps {
  handleSubmit?: () => void;
}

export const OrderMenu = (props: OrderMenuProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const order = useSelector((state: RootState) => state.order.item);
  const { data: user } = useGetUserQuery();
  const { data: certificate } = useGetCertificateCodeQuery()
  const { data: promo } = useGetPromoCodeQuery();
  const { data: cartItems = [] } = useGetCartQuery(user?.id ?? "", { skip: !user?.id });
  const [validatePromo] = useValidatePromoCodeMutation();
  const [validateCertificate] = useValidateCertificateCodeMutation();

  const [promocode, setPromocode] = useState<string | null>(null);
  const [sertificate, setSertificate] = useState<string | null>(null);
  const [promoTouched, setPromoTouched] = useState(false);
  const [sertTouched, setSertTouched] = useState(false);

  const checkedCartItems = useMemo(
    () => cartItems.filter((item) => item.isChecked),
    [cartItems]
  );

  // Исключаем бесконечные диспатчи при одинаковом наборе данных
  const lastPayloadSignatureRef = useRef<string>("");

  useEffect(() => {
    if (!user?.id || checkedCartItems.length === 0) return;

    const signature = JSON.stringify({
      userId: user.id,
      items: checkedCartItems.map((i) => ({ id: i.product.id, q: i.quantity })),
      promoId: promo?.id,
      certId: certificate?.id,
    });

    if (signature === lastPayloadSignatureRef.current) return;
    lastPayloadSignatureRef.current = signature;

    dispatch(
      changeOrderInfo({
        userId: user.id,
        cartItems: checkedCartItems,
        promocodePercent: promo && promo.discount ? promo.discount : 0,
        promocodeId: promo?.id,
        certificateDiscount: certificate && certificate.amount ? certificate.amount : 0,
        certificateId: certificate?.id,
      })
    );
  }, [
    dispatch,
    user?.id,
    checkedCartItems,
    promo?.id,
    certificate?.id,
  ]);

  useEffect(() => { promo?.id ? setPromoTouched(false) : "" }, [promo?.id]);
  useEffect(() => { certificate?.id ? setSertTouched(false): "" }, [certificate?.id]);

  const isOrderPage = location.pathname === "/order";

  const handleCheckout = () => {
    if (!isOrderPage) {
      navigate("/order");
      return;
    }
    if (props.handleSubmit) props.handleSubmit();
  };

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

  if (!order || !order.total) return;

  return (
    <div className="order-menu">
      <p className="order-menu__item">Ваш заказ</p>

      <OrderMenuList isOrderPage = {isOrderPage} checkedCartItems = {checkedCartItems}/>

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
        {!promo?.id && (
          <div className="order-menu__field">
            <input
              type="text"
              value={promocode || ""}
              onChange={handlePromocodeChange}
              onBlur={handlePromocodeBlur}
              placeholder="Промокод"
              className={`order-menu__input ${promoTouched && promocode && !promo?.valid ? 'order-menu__input--error' : ''}`}
            />
            {promoTouched && !promo?.id && (
              <div style={{ color: "red", fontSize: "13px", marginTop: "4px" }}>
                {"Промокод недействителен"}
              </div>
            )}
          </div>
        )}
        {promo?.id && (
          <div className="order-menu__field" style={{ color: '#CA354F' }}>
            Promocode activated
          </div>
        )}
        {!certificate?.id && (
          <div className="order-menu__field">
            <input
              type="text"
              value={sertificate || ""}
              onChange={handleSertificateChange}
              onBlur={handleSertificateBlur}
              placeholder="Сертификат"
              className={`order-menu__input ${sertTouched && sertificate && !certificate?.id ? 'order-menu__input--error' : ''}`}
            />
            {sertTouched && !certificate?.id && (
              <div style={{ color: "red", fontSize: "13px", marginTop: "4px" }}>
                {"Сертификат недействителен"}
              </div>
            )}
          </div>
        )}
        {certificate?.id && (
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
