import { CartTotals } from "../../store/cartTotals/cartTotalsTypes";

export type OrderMenuTotalsItem = {
  name: string,
  value: number | null,
}

export const getOrderMenuTotalsItems = (cartTotals: CartTotals) => {
  return [
    {
      name: "Товары на сумму:",
      value: cartTotals.total
    },
    {
      name: "Скидка:",
      value: cartTotals.discount
    },
    {
      name: "Скидка по промокоду:",
      value: cartTotals.promo.discount
    },
    {
      name: "Скидка по сертификату:",
      value: cartTotals.certificate.discount
    },
    {
      name: "Доставка:",
      value: cartTotals.deliveryCost
    },
    {
      name: "Всего к оплате:",
      value: cartTotals.totalWithDiscount
    },
  ] as OrderMenuTotalsItem[]
}