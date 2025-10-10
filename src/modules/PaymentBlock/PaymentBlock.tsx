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
  const [phoneNumber, setPhoneNumber] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [cardError, setCardError] = useState("");
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

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value === "" || (value.startsWith("7") && value.length <= 11)) {
      setPhoneNumber(value);
    }
  };

  // Обработчик изменения номера карты
  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 16) {
      const formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1 ");
      setCardNumber(formattedValue);
    }
  };

  const validatePhone = () => {
    if (phoneNumber.length !== 11) {
      setPhoneError("Номер должен содержать 11 цифр");
    } else {
      setPhoneError("");
    }
  };

  const validateCard = () => {
    if (cardNumber.replace(/\s/g, "").length !== 16) {
      setCardError("Номер карты должен содержать 16 цифр");
    } else {
      setCardError("");
    }
  };

  const removeCartItems = async () => {
    const cartItemsId = order.cartItems.map((cartItem: CartItem) => {
      return cartItem.product.id
    })
    for (const cartItemId of cartItemsId) {
      await removeFromCart({userId: user?.id! ,productId: cartItemId});
    }
  }

  const handlePaymentCreate = () => {
    if (order.recipient.paymentMethod === "SBP") {
      validatePhone();
    } else validateCard();


    //() => navigate("/cart")
    if (!phoneError && !cardError) {
      createOrder(order).then(() => {
        removeCartItems().then(() => navigate("/cart"))
      })
      setPhoneError("");
      setCardError("");
    }
  };

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

