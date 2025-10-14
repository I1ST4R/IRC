import { CartTotals } from "@/modules/OrderMenu";

export const OrderTableCartTotals = ({cartTotals}: {cartTotals: CartTotals}) => {
  return (
    <>
      <div>
        Сумма: <b>{cartTotals.total} ₽</b>
      </div>
      <div>
        Сумма со скидкой: <b>{cartTotals.totalWithDiscount} ₽</b>
      </div>
      <div>
        Скидка: <b>{cartTotals.discount} ₽</b>
      </div>
      <div>
        Скидка по промокоду: <b>{cartTotals.promo.discount ?? "-"}</b>
      </div>
      <div>
        Скидка по сертификату:{" "}
        <b>{cartTotals.certificate.discount ?? "-"}</b>
      </div>
      <div>
        Доставка: <b>{cartTotals.deliveryCost} ₽</b>
      </div>
      <div>
        Промокод: <b>{cartTotals.promo.id ?? "-"}</b>
      </div>
      <div>
        Сертификат: <b>{cartTotals.certificate.id ?? "-"}</b>
      </div>
      <div className="mt-1.5 mb-1">
        <b>Получатель:</b>
      </div>
    </>
  );
};