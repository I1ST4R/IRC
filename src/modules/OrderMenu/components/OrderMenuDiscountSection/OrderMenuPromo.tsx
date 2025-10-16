import { useEffect, useState } from "react";
import React from "react";
import { Alert, AlertTitle } from "@/shared/ui/kit/alert";
import { Input } from "@/shared/ui/kit/input";
import { cn } from "@/shared/lib/css";
import { useSelector } from "react-redux";
import {
  getPromocode,
  selectPromocode,
  validatePromocode,
} from "../../store/cartTotals/cartTotalsSlice";
import { useAppDispatch } from "@/App/store";

export const OrderMenuPromo = () => {
  const [promoTouched, setPromoTouched] = useState(false);
  const dispatch = useAppDispatch();

  const promo = useSelector(selectPromocode);
  const showError = promoTouched && !promo.valid;

  useEffect(() => {
    dispatch(getPromocode());
    console.log(promo)
  }, [dispatch]);

  const handlePromocodeBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setPromoTouched(true);
      dispatch(validatePromocode(e.target.value));
    }
  };

  if (promo.valid)
    return (
      <Alert className="bg-transparent border-0 uppercase font-manrope text-xs ">
        <AlertTitle className="font-semibold tracking-[0.15em]">
          Промокод активирован
        </AlertTitle>
      </Alert>
    );

  return (
    <div className="order-menu__field">
      <Input
        type="text"
        onBlur={handlePromocodeBlur}
        placeholder="Промокод"
        className={cn(showError && "border-[var(--coral)] ")}
      ></Input>
      {!promo.valid && promoTouched && (
        <Alert variant="destructive" className="border-0">
          <AlertTitle>Промокод недействителен</AlertTitle>
        </Alert>
      )}
    </div>
  );
};
