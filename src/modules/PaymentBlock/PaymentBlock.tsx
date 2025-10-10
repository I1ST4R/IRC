import { useSelector } from "react-redux";
import { useGetUserQuery } from "@/shared/store/user/userApiSlice";
import { Unauthorized } from "@/shared/ui/components/Unauthorized";
import { openAccount, useAppDispatch } from "../AuthForm";
import { selectCartTotals } from "../OrderMenu/store/cartTotals/cartTotalsSlice";
import { Link } from "react-router-dom";
import { CardPaymentForm } from "./components/CardPaymentForm/CardPaymentForm";
import { SBPPaymentForm } from "./components/SBPPaymentForm/SBPPaymentForm";
import { selectPaymentMethod } from "../OrderForm/store/recipientSlice";


export const PaymentBlock = () => {
  const deliveryMethod = useSelector(selectPaymentMethod);
  const { data: user } = useGetUserQuery();
  const dispatch = useAppDispatch();
  const cartTotals = useSelector(selectCartTotals);

  if (!user)
    return (
      <Unauthorized
        text="Чтобы иметь возможность заказывать, нужно пройти регистрацию"
        handleClick={() => dispatch(openAccount())}
      />
    );

  if (cartTotals.cartItems.length === 0)
    return (
      <div>
        Чтобы оплатить заказ его надо сначала создать (как бы это ни было
        странно), перейдите в <Link to="/catatlog">каталог</Link> и выберите
        что-нибудь.
      </div>
    );

  return (
    <div className="payment container">
    { deliveryMethod === "Банковская карта" ? <CardPaymentForm/> : <SBPPaymentForm/> }
    </div>
  )
  
};
