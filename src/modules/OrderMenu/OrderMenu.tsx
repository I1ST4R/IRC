import { OrderMenuDiscountSection } from "./components/OrderMenuDiscountSection";
import { OrderMenuList } from "./components/OrderMenuList";
import { OrderMenuTotals } from "./components/OrderMenuTotals";
import { useLocation, useNavigate } from "react-router-dom";
import { useOrderSync } from "./helpers/useOrderSync";

interface OrderMenuProps {
  handleSubmit?: () => void;
}

export const OrderMenu = (props: OrderMenuProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, checkedCartItems, order } = useOrderSync();
  const isOrderPage = location.pathname === "/order";

  const handleCheckout = () => {
    if (!isOrderPage) {
      navigate("/order");
      return;
    }
    props.handleSubmit?.();
  };

  if (!user?.id || !order || !order.total) return null;

  return (
    <div className="order-menu">
      <p className="order-menu__item">Ваш заказ</p>
      <OrderMenuList isOrderPage={isOrderPage} checkedCartItems={checkedCartItems}/>
      <OrderMenuTotals order={order}/>
      <OrderMenuDiscountSection/>
      <button className="order-menu__button" onClick={handleCheckout}>
        Оформить заказ
      </button>
    </div>
  );
};
