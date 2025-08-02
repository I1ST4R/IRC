import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../main/store";
import OrderMenu from "../../main/components/OrderMenu/OrderMenu";
import "./_order.scss";
import { DeliveryMethod, PaymentMethod } from "@/entity/order/types";
import { changeOrderInfo, createOrder } from "@/entity/order/slice";
import { AppDispatch } from "@/main/store";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "@/main/components/BreadCrumb/BreadCrumb";
import { fetchCart, fetchCartTotals } from "@/entity/cart/slice";

export const Order: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const order = useSelector((state: RootState) => state.orders.current);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState({
    deliveryMethod: "courier",
    paymentMethod: "SBP",
    fullName: "",
    phone: "",
    address: "",
    email: "",
    deliveryDate: "",
    comment: "",
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [shouldCreateOrder, setShouldCreateOrder] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Очищаем ошибку поля при вводе
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleDeliveryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(1)
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      deliveryMethod: value,
    }));

    // Диспатч для изменения стоимости доставки
    const deliveryCost = formData.deliveryMethod === "courier" ? 500 : 0;
    if (user.id) {
      dispatch(
        changeOrderInfo({
          userId: user.id,
          deliveryCost: deliveryCost,
        })
      );
    }
  };

  const validateForm = (): {
    isValid: boolean;
    errors: Record<string, string>;
  } => {
    const errors: Record<string, string> = {};

    // Проверка всех полей кроме comment
    Object.entries(formData).forEach(([field, value]) => {
      if (field === "comment") return; // Пропускаем необязательное поле

      if (!value || !value.toString().trim()) {
        errors[field] = "Обязательное поле";
      }
    });

    // Дополнительная проверка email на корректность
    if (
      formData.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      errors.email = "Введите корректный email";
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  };

  const handleSubmit = () => {
    if (user.id) {
      const validation = validateForm();

      if (!validation.isValid) {
        setFieldErrors(validation.errors);
        return;
      }

      const deliveryCost = formData.deliveryMethod === "courier" ? 500 : 0;
      dispatch(
        changeOrderInfo({
          userId: user.id,
          deliveryCost: deliveryCost,
          recipient: {
            deliveryMethod: formData.deliveryMethod as DeliveryMethod,
            paymentMethod: formData.paymentMethod as PaymentMethod,
            fullName: formData.fullName,
            phone: formData.phone,
            address: formData.address,
            email: formData.email,
            deliveryDate: formData.deliveryDate,
            comment: formData.comment,
          },
        })
      );
      navigate("/payment")
      // setShouldCreateOrder(true);
    }
  };

  // useEffect(() => {
  //   if (shouldCreateOrder && order) {
  //     dispatch(createOrder(order)).then(() => {
  //       if (user.id) dispatch(fetchCart(user.id));
  //       navigate("/cart");
  //     });
  //     setShouldCreateOrder(false);
  //   }
  // }, [shouldCreateOrder, order, dispatch, user.id, navigate]);

  if (!user.id) {
    return (
      <div className="order container">
        <BreadCrumb
          pageLinks={[
            { name: "Главная", link: "/" },
            { name: "Корзина", link: "/cart" },
            { name: "Заказ", link: "/" },
          ]}
        />
        <h2 className="order__title">Оформление заказа</h2>
        <div className="order__empty">
          <p className="order__empty-message">
            Авторизуйтесь, чтобы оформить заказ
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="order container">
      <div className="order__form">
        <BreadCrumb
          pageLinks={[
            { name: "Главная", link: "/" },
            { name: "Корзина", link: "/cart" },
            { name: "Заказ", link: "/" },
          ]}
        />
        <div className="order__point">
          <h1 className="order__point-title">Доставка</h1>
          <div className="order__point-methods">
            <label className="order__point-method">
              <input
                type="radio"
                name="deliveryMethod"
                value="courier"
                checked={formData.deliveryMethod === "courier"}
                onChange={handleDeliveryChange}
              />
              <span>Доставка курьером</span>
            </label>

            <label className="order__point-method">
              <input
                type="radio"
                name="deliveryMethod"
                value="pickup"
                checked={formData.deliveryMethod === "pickup"}
                onChange={handleDeliveryChange}
              />
              <span>Самовывоз</span>
            </label>
          </div>
        </div>

        <div className="order__point">
          <h1 className="order__point-title">Оплата</h1>
          <div className="order__point-methods">
            <label className="order__point-method">
              <input
                type="radio"
                name="paymentMethod"
                value="SBP"
                checked={formData.paymentMethod === "SBP"}
                onChange={handleChange}
              />
              <span>СБП</span>
            </label>
            <label className="order__point-method">
              <input
                type="radio"
                name="paymentMethod"
                value="bank card"
                checked={formData.paymentMethod === "bank card"}
                onChange={handleChange}
              />
              <span>Банковской картой</span>
            </label>
          </div>
        </div>

        <div className="order__point">
          <h1 className="order__point-title">Получатель</h1>
          <div className="order__point-form">
            <div className="order__point-field">
              <label htmlFor="fullName">Ф.И.О.</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Введите ваше полное имя"
                required
              />
              {fieldErrors.fullName && (
                <span className="field-error">{fieldErrors.fullName}</span>
              )}
            </div>

            <div className="order__point-field">
              <label htmlFor="phone">Телефон</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+7 (___) ___-__-__"
                required
              />
              {fieldErrors.phone && (
                <span className="field-error">{fieldErrors.phone}</span>
              )}
            </div>

            <div className="order__point-field">
              <label htmlFor="address">Адрес</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Введите адрес доставки"
                required
              />
              {fieldErrors.address && (
                <span className="field-error">{fieldErrors.address}</span>
              )}
            </div>

            <div className="order__point-field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Введите ваш email"
                required
              />
              {fieldErrors.email && (
                <span className="field-error">{fieldErrors.email}</span>
              )}
            </div>

            <div className="order__point-field">
              <label htmlFor="deliveryDate">Дата доставки</label>
              <input
                type="date"
                id="deliveryDate"
                name="deliveryDate"
                value={formData.deliveryDate}
                onChange={handleChange}
                required
              />
              {fieldErrors.deliveryDate && (
                <span className="field-error">{fieldErrors.deliveryDate}</span>
              )}
            </div>

            <div className="order__point-field">
              <label htmlFor="comment">Комментарий к заказу</label>
              <textarea
                id="comment"
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                placeholder="Дополнительная информация к заказу"
                rows={4}
              />
            </div>
          </div>
        </div>
      </div>

      <OrderMenu handleSubmit={handleSubmit} />
    </div>
  );
};

export default Order;
