import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../_old-version/services/store";
import OrderMenu from "../../_old-version/main/components/OrderMenu/OrderMenu";
import "./_order.scss";
import { DeliveryMethod, PaymentMethod } from "@/entity/order/types";
import { changeOrderInfo } from "@/entity/order/slice";
import { AppDispatch } from "@/main/store";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "@/main/components/BreadCrumb/BreadCrumb";
import { useGetUserQuery } from "@/entity/users/api";

export const Order: React.FC = () => {
  const { data: user } = useGetUserQuery();
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

  
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  

  const handleSubmit = () => {
    if (user?.id) {
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
    }
  };

  if (!user?.id) {
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
      

      <OrderMenu handleSubmit={handleSubmit} />
    </div>
  );
};

export default Order;
