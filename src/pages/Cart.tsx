import React from "react";
import { OrderMenu } from "@/modules/OrderMenu";
import { CartBody } from "@/modules/CartBody";
import BreadCrumb from "@/shared/BreadCrumb/BreadCrumb";

export const Cart: React.FC = () => {
  return (
    <div className="cart container">
      <div className="cart__header">
        <BreadCrumb
          pageLinks={[
            { name: "Главная", link: "/" },
            { name: "Корзина", link: "/" },
          ]}
        />
        <h2 className="cart__title">Корзина</h2>
      </div>
      <div>
        <CartBody />
        <OrderMenu />
      </div>
    </div>
  );
};

export default Cart;
