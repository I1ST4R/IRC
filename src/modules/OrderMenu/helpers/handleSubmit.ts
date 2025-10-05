import { RootState } from "@reduxjs/toolkit/query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/orderMenuStore";
import { selectCurrentOrder } from "../store/cartTotals/cartTotalsSlice";

const handleSubmit = () => {
  const order = useSelector(selectCurrentOrder);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  (data) => dispatch(changeDeliveryMethod(data))

  if (user?.id) {
    const deliveryCost = formData.deliveryMethod === "courier" ? 500 : 0;
    dispatch(
      changeOrderInfo({
        userId: user.id,
        deliveryCost: deliveryCost,
        recipient: {
          deliveryMethod: formData.deliveryMethod as DeliveryMethod,
          paymentMethod: formData.paymentMethod as PaymentMethod,
          fullName: formData.fullName,
          phone: formData.phone,
          address: formData.address,
          email: formData.email,
          deliveryDate: formData.deliveryDate,
          comment: formData.comment,
        },
      })
    );
  }
};