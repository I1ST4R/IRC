import { OrderMenuTotalsItem } from "./getOrderMenuTotalsItems";

export const OrderMenuTotalsPoint = (props: OrderMenuTotalsItem) => {
  return (
    <div className="flex justify-between items-center uppercase font-manrope text-xs font-semibold py-1">
      <span>{props.name}</span>
      <span className="text-[var(--coral)]">{props.value} ₽</span>
    </div>
  );
};
