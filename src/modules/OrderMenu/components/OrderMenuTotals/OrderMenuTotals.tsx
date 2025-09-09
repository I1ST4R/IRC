import { Order } from "@/_old-version/entity/order/types";
import { OrderMenuTotalsPoint } from "./OrderMenuTotalsPoint";
import { getOrderMenuTotalsItems } from "./getOrderMenuTotalsItems";

type OrderMenuTotalsProps = {
  order: Order;
};

export const OrderMenuTotals = (props: OrderMenuTotalsProps) => {
  const items = getOrderMenuTotalsItems(props.order);
  return (
    <div className="p-3 border-b border-gray-200">
      {items.map((el) => {
        if (el.value === null) return <></>;
        return <OrderMenuTotalsPoint name={el.name} value={el.value} />;
      })}
    </div>
  );
};
