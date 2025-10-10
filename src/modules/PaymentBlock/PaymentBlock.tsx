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
      {}
    </div>
  );
};

