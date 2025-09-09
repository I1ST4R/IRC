import { Order } from "@/_old-version/entity/order/types";

export type OrderMenuTotalsItem = {
  name: string,
  value: number | null,
}

export const getOrderMenuTotalsItems = (order: Order) => {
  return [
    {
      name: "Товары на сумму:",
      value: order.total
    },
    {
      name: "Скидка:",
      value: order.discount
    },
    {
      name: "Скидка по промокоду:",
      value: order.promocodeDiscount
    },
    {
      name: "Скидка по сертификату:",
      value: order.certificateDiscount
    },
    {
      name: "Доставка:",
      value: order.deliveryCost
    },
    {
      name: "Всего к оплате:",
      value: order.totalWithDiscount
    },
  ] as OrderMenuTotalsItem[]
}