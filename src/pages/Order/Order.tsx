import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../main/store';
import OrderMenu from "../../main/components/OrderMenu/OrderMenu";
import './_order.scss';
import { DeliveryMethod, PaymentMethod } from "@/entity/order/types";
import { changeOrderInfo } from "@/entity/order/slice";

export const Order: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDeliveryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      deliveryMethod: value,
    }));

    // Диспатч для изменения стоимости доставки
    if (user.id) {
      const deliveryCost = value === "courier" ? 500 : 0;
      dispatch(changeOrderInfo({
        userId: user.id,
        deliveryCost: deliveryCost as 0 | 500,
      }));
    }
  };

  if (!user.id) {
    return (
      <div className="order container">
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

        <OrderMenu/>
    </div>
  );
};

export default Order;
