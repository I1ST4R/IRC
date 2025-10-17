import { openAccount } from "@/modules/AuthForm";
import { OrderForm } from "@/modules/OrderForm";
import { OrderMenu } from "@/modules/OrderMenu";
import { useGetUserQuery } from "@/shared/store/user/userApiSlice";
import { Unauthorized } from "@/shared/ui/components/Unauthorized";
import { BreadCrumb } from "@/shared/ui/components/BreadCrumb";
import { useAppDispatch } from "@/App/store";

export const Order = () => {
  const { data: user } = useGetUserQuery();
  const dispatch = useAppDispatch();

  if (!user?.id)
    return (
      <Unauthorized
        text="чтобы иметь возможность заказывать продукцию магазина"
        handleClick={() => dispatch(openAccount())}
      />
    );

  return (
    <div className="order container m-auto">
      <BreadCrumb />
      <div className="grid grid-cols-[auto_300px] gap-7 pl-5 pb-5">
        <OrderForm />
        <OrderMenu />
      </div>
    </div>
  );
};

export default Order;
