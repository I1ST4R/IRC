import { OrderMenuDiscountSection } from "./components/OrderMenuDiscountSection/OrderMenuDiscountSection";
import { OrderMenuList } from "./components/OrderMenuList/OrderMenuList";
import { OrderMenuTotals } from "./components/OrderMenuTotals/OrderMenuTotals";
import { useLocation, useNavigate } from "react-router-dom";
import { useOrderSync } from "./helpers/useOrderSync";
import { Button } from "@/shared/ui/kit/button";

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
    handleSubmit.();
  };

  if (!user?.id || !order || !order.total) return null;

  return (
    <div className="bg-[#F2F2F2] w-73">
      <p className="p-3 border-b border-gray-200">Ваш заказ</p>
      <OrderMenuList
        isOrderPage={isOrderPage}
        checkedCartItems={checkedCartItems}
      />
      <OrderMenuTotals order={order} />
      <OrderMenuDiscountSection />
      <Button onClick={handleCheckout}>Оформить заказ</Button>
    </div>
  );
};
