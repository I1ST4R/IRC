import "./_order.scss";
import { OrderForm } from "@/modules/OrderForm";
import { OrderMenu } from "@/modules/OrderMenu";
import BreadCrumb from "@/shared/BreadCrumb/BreadCrumb";
import { useGetUserQuery } from "@/shared/store/user/userApiSlice";

export const Order: React.FC = () => {
  const { data: user } = useGetUserQuery();

  if (!user?.id) {
    return (
      <div className="order container">
        <BreadCrumb
          pageLinks={[
            { name: "Главная", link: "/" },
            { name: "Корзина", link: "/cart" },
            { name: "Заказ", link: "/" },
          ]}
        />
        <h2 className="order__title">Оформление заказа</h2>
        <div className="order__empty">
          <p className="order__empty-message">
            Авторизуйтесь, чтобы оформить заказ
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="order container">
      <OrderForm/>
      <OrderMenu/>
    </div>
  );
};

export default Order;
