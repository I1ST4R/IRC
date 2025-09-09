type OrderMenuTotalsPointProps = {
  name: string,
  value: number
}

export const OrderMenuTotalsPoint = (props: OrderMenuTotalsPointProps) => {
  return (
    <div className="flex justify-between items-center">
      <span>{props.name}</span>
      <span className="text-[var(--coral)]">{props.value} ₽</span>
    </div>
  );
};
