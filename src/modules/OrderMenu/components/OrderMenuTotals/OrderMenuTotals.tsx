import { OrderMenuTotalsPoint } from "./OrderMenuTotalsPoint";
import { getOrderMenuTotalsItems } from "./getOrderMenuTotalsItems";
import { CartTotals } from "../../store/cartTotals/cartTotalsTypes";

type OrderMenuTotalsProps = {
  cartTotals: CartTotals;
};

export const OrderMenuTotals = ({cartTotals}: OrderMenuTotalsProps) => {
  const items = getOrderMenuTotalsItems(cartTotals);
  return (
    <div className="p-3 border-b border-gray-200">
      {items.map((el) => {
        if (el.value === null) return <></>;
        return <OrderMenuTotalsPoint name={el.name} value={el.value} />;
      })}
    </div>
  );
};
