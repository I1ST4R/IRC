import { useRemoveFromCartMutation } from "@/entity/cart/api";
import { CartItem } from "@/entity/cart/types";

import { useGetUserQuery } from "@/entity/users/api";
import { RootState } from "@/main/store";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const PaymentBlock = () => {
  const order = useSelector((state: RootState) => state.orders.current);
  const {data: user} = useGetUserQuery()
  const navigate = useNavigate();

  const [createOrder] = useAddOrderMutation();

  const [removeFromCart] = useRemoveFromCartMutation()

  if (!order || !order.totalWithDiscount) {
    return (
      <div className="payment container">
        <p>Ошибка при оплате товаров</p>
      </div>
    );
  }

  return (
    <div className="payment container">
      <div className="payment__form">
        <p>Товары на сумму: {order.totalWithDiscount}</p>
        {order.recipient.paymentMethod === "SBP" && (
          <div className="order-menu__field">
            <input
              type="tel"
              placeholder="Номер телефона"
              className={`order-menu__input ${phoneError ? "error" : ""}`}
              maxLength={11}
              value={phoneNumber}
              onChange={handlePhoneChange}
              onBlur={validatePhone}
            />
            {phoneError && (
              <div className="payment__form-error">{phoneError}</div>
            )}
          </div>
        )}

        {order.recipient.paymentMethod === "bank card" && (
          <div className="order-menu__field">
            <input
              type="text"
              placeholder="Номер банковской карты"
              className={`order-menu__input ${cardError ? "error" : ""}`}
              value={cardNumber}
              onChange={handleCardChange}
              onBlur={validateCard}
            />
            {cardError && (
              <div className="payment__form-error">{cardError}</div>
            )}
          </div>
        )}

        <button className="btn" onClick={handlePaymentCreate}>
          Оплатить
        </button>
      </div>
    </div>
  );
};

