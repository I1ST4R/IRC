import { OrderMenuDiscountSection } from "./components/OrderMenuDiscountSection/OrderMenuDiscountSection";
import { OrderMenuList } from "./components/OrderMenuList/OrderMenuList";
import { OrderMenuTotals } from "./components/OrderMenuTotals/OrderMenuTotals";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetCheckedCartItemsQuery } from "@/modules/CartBody/store/cart/cartApiSlice";
import { useGetUserQuery } from "@/shared/store/user/userApiSlice";
import { Button } from "@/shared/ui/kit/button";
import { selectCartTotals } from "./store/cartTotals/cartTotalsSlice";
import { useSelector } from "react-redux";
import { useAppDispatch } from "./store/orderMenuStore";
import { changeCartTotals } from "."
import { onSubmit } from "../OrderForm";

export const OrderMenu = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { data: user } = useGetUserQuery();
  const { data: checkedCartItems } = useGetCheckedCartItemsQuery(
    user?.id ?? "",
    { skip: !user?.id }
  );
  const cartTotals = useSelector(selectCartTotals);
  const isOrderPage = location.pathname === "/order";

  const handleCheckout = () => {
    if (!isOrderPage) {
      navigate("/order");
      return;
    }
    onSubmit(dispatch, navigate, user?.id ?? "")
  };

  if (!user?.id || !checkedCartItems || checkedCartItems.items.length === 0) return null;

  dispatch(changeCartTotals({ cartItems: checkedCartItems?.items || [] }));

  return (
    <div className="bg-[#F2F2F2] w-73">
      <p className="p-3 border-b border-gray-200">Ваш заказ</p>
      <OrderMenuList
        isOrderPage={isOrderPage}
        checkedCartItems={checkedCartItems.items}
      />
      <OrderMenuTotals cartTotals={cartTotals} />
      <OrderMenuDiscountSection />
      <Button onClick={handleCheckout}>Оформить заказ</Button>
    </div>
  );
};
