import { openAccount, useAppDispatch } from "@/modules/AuthForm";
import "./_order.scss";
import { OrderForm } from "@/modules/OrderForm";
import { OrderMenu } from "@/modules/OrderMenu";
import { useGetUserQuery } from "@/shared/store/user/userApiSlice";
import { Unauthorized } from "@/shared/ui/components/Unauthorized";

export const Order: React.FC = () => {
  const { data: user } = useGetUserQuery();
  const dispatch = useAppDispatch()

  if (!user?.id) 
    return <Unauthorized text="чтобы иметь возможность заказывать продукцию магазина" handleClick={() => dispatch(openAccount())}/>;

  return (
    <div className="order container">
      <OrderForm/>
      <OrderMenu/>
    </div>
  );
};

export default Order;
