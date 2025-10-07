import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/shared/ui/kit/table";
import { useGetOrdersQuery } from "./store/order/orderApiSlice";
import { useGetUserQuery } from "@/shared/store/user/userApiSlice";
import { OrderTableCell } from "./components/OrderTableCell";
import { Order } from "../OrderMenu";

export const OrderTable = () => {
  const { data: orders = {}, isLoading } = useGetOrdersQuery();
  const { data: user } = useGetUserQuery();

  if (user?.type !== "admin") {
    return <div className="admin-no-access">У вас нет прав доступа</div>;
  }

  if (isLoading || !Array.isArray(orders)) return <div>Загрузка...</div>;

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
            <tr key={userId}>
              <td>{userId}</td>
              <td>
                {userOrders.map((order: Order & {userId: string}) => (
                  <OrderTableCell order = {order}/>
                ))}
              </td>
            </tr>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
