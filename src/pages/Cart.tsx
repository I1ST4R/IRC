import React from "react";
import BreadCrumb from "@/main/components/BreadCrumb/BreadCrumb";
import { CartBody } from "@/modules/CartList/CartBody";
import { OrderMenu } from "@/modules/OrderMenu";

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
