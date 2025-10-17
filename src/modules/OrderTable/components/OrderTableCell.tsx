import { FullOrder } from "../store/orderApi";
import { OrderTableRecipient } from "./OrderTableRecipient";
import { OrderTableProducts } from "./OrderTableProducts";
import { OrderTableCartTotals } from "./OrderTableCartTotals";

export const OrderTableCell = ({order} : {order: FullOrder}) => {
  return (
    <>
      <h1 className="font-medium">Заказ #{order.id}</h1>
      <OrderTableCartTotals cartTotals = {order.cartTotals}/>
      <OrderTableRecipient recipient = {order.recipient}/>
      <OrderTableProducts cartItems = {order.cartTotals.cartItems}/>
    </>
  );
};