import { TableCell } from "@/shared/ui/kit/table";
import { FullOrder } from "../store/order/orderApi";
import { OrderTableRecipient } from "./OrderTableRecipient";
import { OrderTableProducts } from "./OrderTableProducts";
import { OrderTableCartTotals } from "./OrderTableCartTotals";

type OrderTableCellProps = {
  order: FullOrder
}

export const OrderTableCell = ({order} : OrderTableCellProps) => {
  return (
    <TableCell key={order.id} className="order-block">
      <h1 className="font-medium">Заказ #{order.id}</h1>
      <OrderTableCartTotals cartTotals = {order.cartTotals}/>
      <OrderTableRecipient recipient = {order.recipient}/>
      <OrderTableProducts cartItems = {order.cartTotals.cartItems}/>
    </TableCell>
  );
};