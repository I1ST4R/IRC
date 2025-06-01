import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { RootState } from '../../main/store';
import OrderMenu from "../../main/components/OrderMenu/OrderMenu";
import './_order.scss';

export const Order: React.FC = () => {
  const { id: userId, cart: cartItems } = useSelector((state: RootState) => state.user);
  const { items: products } = useSelector((state: RootState) => state.products);
  const { discount: promoDiscount } = useSelector((state: RootState) => state.promo);
  const { amount: certificateAmount } = useSelector((state: RootState) => state.certificates);

  const [deliveryMethod, setDeliveryMethod] = useState<"courier" | "pickup">(
    "courier"
  );
  const [formData, setFormData] = useState({
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

  if (!userId) {
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
                  name="delivery"
                  value="courier"
                  checked={deliveryMethod === "courier"}
                  onChange={(e) =>
                    setDeliveryMethod(e.target.value as "courier" | "pickup")
                  }
                />
                <span>Доставка курьером</span>
              </label>

              <label className="order__point-method">
                <input
                  type="radio"
                  name="delivery"
                  value="pickup"
                  checked={deliveryMethod === "pickup"}
                  onChange={(e) =>
                    setDeliveryMethod(e.target.value as "courier" | "pickup")
                  }
                />
                <span>Самовывоз</span>
              </label>
            </div>
          </div>

          <div className="order__point">
            <h1 className="order__point-title">Оплата</h1>
            <div className="order__point-methods">
              <label className="order__point-method">
                <input type="radio" name="payment" value="cash" />
                <span>СБП</span>
              </label>
              <label className="order__point-method">
                <input type="radio" name="payment" value="card" />
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

        <OrderMenu
          selectedItems={[]}
          cartItems={cartItems}
          products={products}
          promoDiscount={promoDiscount}
          certificateAmount={certificateAmount}
          showItems={true}
        />
    </div>
  );
};

export default Order;
