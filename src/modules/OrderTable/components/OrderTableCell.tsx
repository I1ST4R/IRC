import { Order } from "@/modules/OrderMenu";
import { Divide } from "lucide-react";
import { FullOrder } from "../store/order/orderApi";

type OrderTableCellProps = {
  order: FullOrder
}

export const OrderTableCell = ({order} : OrderTableCellProps) => {
  return (
    <div key={order.id} className="order-block">
      <div>
        <b>Заказ #{order.id}</b>
      </div>
      <div>
        Сумма: <b>{order.cartTotals.total} ₽</b>
      </div>
      <div>
        Сумма со скидкой: <b>{order.cartTotals.totalWithDiscount} ₽</b>
      </div>
      <div>
        Скидка: <b>{order.cartTotals.discount} ₽</b>
      </div>
      <div>
        Скидка по промокоду: <b>{order.cartTotals.promo.discount ?? "-"}</b>
      </div>
      <div>
        Скидка по сертификату: <b>{order.cartTotals.certificate.discount ?? "-"}</b>
      </div>
      <div>
        Доставка: <b>{order.cartTotals.deliveryCost} ₽</b>
      </div>
      <div>
        Промокод: <b>{order.cartTotals.promo.id ?? "-"}</b>
      </div>
      <div>
        Сертификат: <b>{order.cartTotals.certificate.id ?? "-"}</b>
      </div>
      <div style={{ marginTop: 6, marginBottom: 4 }}>
        <b>Получатель:</b>
      </div>
      <ul>
        <li>ФИО: {order.recipient.fullName}</li>
        <li>Телефон: {order.recipient.phone}</li>
        <li>Адрес: {order.recipient.address}</li>
        <li>Email: {order.recipient.email}</li>
        <li>Дата доставки: {order.recipient.deliveryDate}</li>
        <li>Комментарий: {order.recipient.comment || "-"}</li>
        <li>Доставка: {order.recipient.deliveryMethod}</li>
        <li>Оплата: {order.recipient.paymentMethod}</li>
      </ul>
      <div style={{ marginTop: 6, marginBottom: 4 }}>
        <b>Товары:</b>
      </div>
      <div className="order-menu__items">
        {order.cartTotals.cartItems.map((item: any) => {
          return (
            <div key={item.product.id} className="order-menu__item-details">
              <div className="order-menu__item-info">
                <img
                  src={item.product.img}
                  alt={item.product.name}
                  className="order-menu__item-image"
                />
                <div className="order-menu__item-text">
                  <span className="order-menu__item-name">
                    {item.product.name}
                  </span>
                  <span className="order-menu__item-technology">
                    {item.product.technology}
                  </span>
                  <span className="order-menu__item-quantity">
                    x{item.quantity}
                  </span>
                </div>
              </div>
              <span className="order-menu__item-price">
                {item.product.price * item.quantity} ₽
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
