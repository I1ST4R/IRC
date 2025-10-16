import { OrderMenuDiscountSection } from "./components/OrderMenuDiscountSection/OrderMenuDiscountSection";
import { OrderMenuList } from "./components/OrderMenuList/OrderMenuList";
import { OrderMenuTotals } from "./components/OrderMenuTotals/OrderMenuTotals";
import { useLocation, useNavigate } from "react-router-dom";
import { initialCart, useGetCheckedCartItemsQuery } from "@/modules/CartBody";
import { useGetUserQuery } from "@/shared/store/user/userApiSlice";
import { Button } from "@/shared/ui/kit/button";
import { selectCartTotals } from "./store/cartTotals/cartTotalsSlice";
import { useSelector } from "react-redux";
import { changeCartTotals } from "."
import { Loader } from "@/shared/ui/components/Loader";
import { useAppDispatch } from "@/App/store";
import { useEffect, useMemo } from "react";

export const OrderMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: user } = useGetUserQuery();
  const { data: cart = initialCart, isLoading: isCartItemsLoading } = useGetCheckedCartItemsQuery(
    user?.id ?? "",
    { skip: !user?.id }
  );
  const cartTotals = useSelector(selectCartTotals);
  const isOrderPage = location.pathname === "/order";
  const dispatch = useAppDispatch()

  const cartItemsArray = useMemo(()=> {
    return Object.values(cart.items)
  },[cart.items])

  useEffect(() => {
    dispatch(
      changeCartTotals({
        cartItems: cartItemsArray
      })
    )
  }, [cartItemsArray, dispatch])

  if(isCartItemsLoading) return <Loader title="Корзина"/>


  const handleCheckout = () => {
    if (!user?.id) return
    if (!isOrderPage) {
      navigate("order");
      return;
    }
    navigate("payment")
  };

  if (!user?.id || !cartItemsArray || cartItemsArray.length === 0) return null;

  return (
    <div className="bg-[#F2F2F2] w-73 mb-8">
      <p className=" border-b border-gray-200 uppercase font-manrope text-xs font-semibold p-5">Ваш заказ</p>
      <OrderMenuList
        isOrderPage={isOrderPage}
        checkedCartItems={cartItemsArray}
      />
      <OrderMenuTotals cartTotals={cartTotals} />
      <OrderMenuDiscountSection />
      <Button onClick={handleCheckout} className="mb-5">Оформить заказ</Button>
    </div>
  );
};
