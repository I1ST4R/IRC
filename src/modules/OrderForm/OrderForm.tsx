import BreadCrumb from "@/shared/BreadCrumb/BreadCrumb";
import { changeOrderInfo } from "@/shared/store/order/orderSlice";
import { useGetUserQuery } from "@/shared/store/user/userApiSlice";
import { useState } from "react";

export const OrderForm = () => {

  const { data: user } = useGetUserQuery();

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

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
    if (user?.id) {
      dispatch(
        changeOrderInfo({
          userId: user.id,
          deliveryCost: deliveryCost,
        })
      );
    }
  };
  
  return (
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
  );
};
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}

