import { RootState, useAppDispatch } from "@/shared/store/sharedStore";
import { useGetUserQuery } from "@/shared/store/user/userApiSlice";
import { useGetCertificateCodeQuery } from "../store/certificate/api";
import { useGetPromoCodeQuery } from "../store/promo/api";
import { useGetCheckedCartItemsQuery } from "@/shared/store/cart/cartApiSlice";
import { useRef } from "react";
import { changeOrderInfo } from "@/shared/store/order/orderSlice";
import { useSelector } from "react-redux";


export const useOrderSync = () => {
  const dispatch = useAppDispatch();
  const { data: user } = useGetUserQuery();
  const { data: certificate } = useGetCertificateCodeQuery();
  const { data: promo } = useGetPromoCodeQuery();
  const { data: checkedCartItems = [] } = useGetCheckedCartItemsQuery(user?.id ?? "", { skip: !user?.id });
  const order = useSelector((state: RootState) => state.order.item);

  const lastSignatureRef = useRef<string | null>(null);
  if (user?.id && checkedCartItems.length > 0) {
    const signature = JSON.stringify({
      userId: user.id,
      items: checkedCartItems.map((i) => ({ id: i.product.id, q: i.quantity })),
      promoId: promo?.id,
      certId: certificate?.id,
    });

    if (signature !== lastSignatureRef.current) {
      lastSignatureRef.current = signature;
      dispatch(changeOrderInfo({
        userId: user.id,
        cartItems: checkedCartItems,
        promocodePercent: promo?.discount ?? 0,
        promocodeId: promo?.id,
        certificateDiscount: certificate?.amount ?? 0,
        certificateId: certificate?.id,
      }));
    }
  }

  return { user, checkedCartItems, order };
}