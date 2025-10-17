import { CartTotals } from "@/modules/OrderMenu";

export const OrderTableCartTotals = ({cartTotals}: {cartTotals: CartTotals}) => {
  return (
    <>
      <p>
        Сумма: <b>{cartTotals.total} ₽</b>
      </p>
      <p>
        Сумма со скидкой: <b>{cartTotals.totalWithDiscount} ₽</b>
      </p>
      <p>
        Скидка: <b>{cartTotals.discount} ₽</b>
      </p>
      <p>
        Скидка по промокоду: <b>{cartTotals.promo.discount ?? "-"}</b>
      </p>
      <p>
        Скидка по сертификату:{" "}
        <b>{cartTotals.certificate.discount ?? "-"}</b>
      </p>
      <p>
        Доставка: <b>{cartTotals.deliveryCost} ₽</b>
      </p>
      <p>
        Промокод: <b>{cartTotals.promo.id ?? "-"}</b>
      </p>
      <p>
        Сертификат: <b>{cartTotals.certificate.id ?? "-"}</b>
      </p>
      <p className="mt-1.5 mb-1">
        <b>Получатель:</b>
      </p>
    </>
  );
};