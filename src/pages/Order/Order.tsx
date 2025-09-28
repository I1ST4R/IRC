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
