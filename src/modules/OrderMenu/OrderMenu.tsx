import { OrderMenuDiscountSection } from "./components/OrderMenuDiscountSection/OrderMenuDiscountSection";
import { OrderMenuList } from "./components/OrderMenuList/OrderMenuList";
import { OrderMenuTotals } from "./components/OrderMenuTotals/OrderMenuTotals";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetCheckedCartItemsQuery } from "@/modules/CartBody";
import { useGetUserQuery } from "@/shared/store/user/userApiSlice";
import { Button } from "@/shared/ui/kit/button";
import { selectCartTotals } from "./store/cartTotals/cartTotalsSlice";
import { useSelector } from "react-redux";
import { changeCartTotals } from "."
import { Loader } from "@/shared/ui/components/Loader";
import { useAppDispatch } from "@/App/store";

export const OrderMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: user } = useGetUserQuery();
  const { data: checkedCartItems, isLoading: isCartItemsLoading } = useGetCheckedCartItemsQuery(
    user?.id ?? "",
    { skip: !user?.id }
  );
  const cartTotals = useSelector(selectCartTotals);
  const isOrderPage = location.pathname === "/order";
  const dispatch = useAppDispatch()

  if(isCartItemsLoading) return <Loader title="Корзина"/>

  const handleCheckout = () => {
    if (!user?.id) return
    if (!isOrderPage) {
      navigate("order");
      return;
    }
    dispatch(
      changeCartTotals({
        cartItems: checkedCartItems?.items
      })
    )
    navigate("payment")
  };

  if (!user?.id || !checkedCartItems || checkedCartItems.items.length === 0) return null;

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
