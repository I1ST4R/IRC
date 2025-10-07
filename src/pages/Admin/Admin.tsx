import React from "react";
import { Order } from "@/entity/order/types";
import { useGetOrdersQuery } from "@/entity/order/api";
import { useGetUserQuery } from "@/entity/users/api";
import { OrderList } from "@/modules/OrderList";

const Admin: React.FC = () => {
  return (
    <div className="admin-page">
      <OrderList/>
    </div>
  )
}
export default Admin;
