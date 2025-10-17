import { Recipient } from "@/modules/OrderForm";

export const OrderTableRecipient = ({recipient} : {recipient: Recipient}) => {
  return (
    <div>
      <li>ФИО: {recipient.fullName}</li>
      <li>Телефон: {recipient.phone}</li>
      <li>Адрес: {recipient.address}</li>
      <li>Email: {recipient.email}</li>
      <li>Дата доставки: {recipient.deliveryDate}</li>
      <li>Комментарий: {recipient.comment || "-"}</li>
      <li>Доставка: {recipient.deliveryMethod}</li>
      <li>Оплата: {recipient.paymentMethod}</li>
    </div>
  );
};
