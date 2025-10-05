import { OrderMenuTotalsItem } from "./getOrderMenuTotalsItems";

export const OrderMenuTotalsPoint = (props: OrderMenuTotalsItem) => {
  return (
    <div className="flex justify-between items-center">
      <span>{props.name}</span>
      <span className="text-[var(--coral)]">{props.value} ₽</span>
    </div>
  );
};
