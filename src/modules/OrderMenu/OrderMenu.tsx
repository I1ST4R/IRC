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
import { OrderMenuTotals } from "./components/OrderMenuTotals";
import { OrderMenuDiscountSection } from "./components/OrderMenuDiscountSection";


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

  const isOrderPage = location.pathname === "/order";

  const handleCheckout = () => {
    if (!isOrderPage) {
      navigate("/order");
      return;
    }
    if (props.handleSubmit) props.handleSubmit();
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
      <OrderMenuTotals order = {order}/>
      <OrderMenuDiscountSection/>
      <button className="order-menu__button" onClick={handleCheckout}>
        Оформить заказ
      </button>
    </div>
  );
};

export default OrderMenu;
