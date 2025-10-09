import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/kit/table";
import { useGetOrdersQuery } from "./store/order/orderApiSlice";
import { useGetUserQuery } from "@/shared/store/user/userApiSlice";
import { OrderTableCell } from "./components/OrderTableCell";
import { FullOrder } from "./store/order/orderApi";
import { Loader } from "@/shared/ui/components/Loader";

export const OrderTable = () => {
  const { data: orders = {}, isLoading } = useGetOrdersQuery();
  const { data: user } = useGetUserQuery();

  if (user?.type !== "admin") {
    return <div className="admin-no-access">У вас нет прав доступа</div>;
  }

  if (isLoading) return  <Loader title="Заказы"/>

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Id пользователя</TableHead>
            <TableHead>Заказы</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(orders).map(([userId, userOrders]) => (
            <TableRow key={userId}>
              <TableCell>{userId}</TableCell>
              {userOrders.map((order: FullOrder) => (
                <OrderTableCell order={order} />
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
