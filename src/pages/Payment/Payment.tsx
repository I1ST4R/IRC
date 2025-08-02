import { fetchCart } from "@/entity/cart/slice";
import { createOrder } from "@/entity/order/slice";
import { AppDispatch, RootState } from "@/main/store";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Payment = () => {
  const order = useSelector((state: RootState) => state.orders.current);
  const user = useSelector((state: RootState) => state.user);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [cardError, setCardError] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

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

  const handlePaymentCreate = () => {
    if (order.recipient.paymentMethod === "SBP") {
      validatePhone();
    } else validateCard();

    if (!phoneError && !cardError) {
      dispatch(createOrder(order)).then(() => {
        if (user.id) dispatch(fetchCart(user.id));
        navigate("/cart");
      });
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

export default Payment;
