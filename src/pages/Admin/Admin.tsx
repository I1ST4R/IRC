import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/main/store";
import { Order } from "@/entity/order/types";
import { useGetOrdersQuery } from "@/entity/order/api";

const Admin: React.FC = () => {
  const { data: orders = [], isLoading } = useGetOrdersQuery();
  const user = useSelector((state: RootState) => state.user);

  if (user.type !== "admin") {
    return <div className="admin-no-access">У вас нет прав доступа</div>;
  }

  if (isLoading || !Array.isArray(orders)) return <div>Загрузка...</div>

  const grouped = orders.reduce((acc: Record<string, Order[]>, order: Order) => {
    if (!acc[order.userId]) acc[order.userId] = [];
    acc[order.userId].push(order);
    return acc;
  }, {});

  return (
    <div className="admin-page">
      <table>
        <thead>
          <tr>
            <th>Пользователь (userId)</th>
            <th>Заказы</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(grouped).map(([userId, userOrders]) => (
            <tr key={userId}>
              <td>{userId}</td>
              <td>
                {userOrders.map((order: any) => (
                  <div key={order.id} className="order-block">
                    <div>
                      <b>Заказ #{order.id}</b>
                    </div>
                    <div>
                      Сумма: <b>{order.total} ₽</b>
                    </div>
                    <div>
                      Сумма со скидкой: <b>{order.totalWithDiscount} ₽</b>
                    </div>
                    <div>
                      Скидка: <b>{order.discount} ₽</b>
                    </div>
                    <div>
                      Скидка по промокоду: {" "}
                      <b>{order.promocodeDiscount ?? "-"}</b>
                    </div>
                    <div>
                      Скидка по сертификату: {" "}
                      <b>{order.certificateDiscount ?? "-"}</b>
                    </div>
                    <div>
                      Доставка: <b>{order.deliveryCost} ₽</b>
                    </div>
                    <div>
                      Промокод: <b>{order.promocodeId ?? "-"}</b>
                    </div>
                    <div>
                      Сертификат: <b>{order.certificateId ?? "-"}</b>
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
                      {order.cartItems.map((item: any) => {
                        return (
                          <div
                            key={item.product.id}
                            className="order-menu__item-details"
                          >
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
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
