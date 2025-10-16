import { OrderMenuTotalsPoint } from "./OrderMenuTotalsPoint";
import { getOrderMenuTotalsItems } from "./getOrderMenuTotalsItems";
import { CartTotals } from "../../store/cartTotals/cartTotalsTypes";

export const OrderMenuTotals = ({cartTotals}: {cartTotals: CartTotals}) => {
  const items = getOrderMenuTotalsItems(cartTotals);
  return (
    <div className="p-5 border-b border-gray-200">
      {items.map((el) => {
        if (el.value === null) return <></>;
        return <OrderMenuTotalsPoint key={el.name} name={el.name} value={el.value} />;
      })}
    </div>
  );
};
