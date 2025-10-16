import React from "react";
import { OrderMenu } from "@/modules/OrderMenu";
import { CartBody } from "@/modules/CartBody";
import { BreadCrumb } from "@/shared/ui/components/BreadCrumb";

export const Cart: React.FC = () => {
  return (
    <div className="cart container m-auto">
      <div className="cart__header">
        <BreadCrumb/>
        <h2 className="cart__title">Корзина</h2>
      </div>
      <div className="grid grid-cols-[auto_300px] gap-[50px]">
        <CartBody />
        <OrderMenu />
      </div>
    </div>
  );
};

export default Cart;
