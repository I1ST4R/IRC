import { useState } from "react";
import React from 'react';
import { Alert, AlertTitle } from "@/shared/ui/kit/alert";
import { Input } from "@/shared/ui/kit/input";
import { cn } from "@/shared/lib/css";
import { useSelector } from "react-redux";
import { selectPromocode, validatePromocode } from "../../store/cartTotals/cartTotalsSlice";
import { useAppDispatch } from "@/App/store";

export const OrderMenuPromo = () => {
  const [promoTouched, setPromoTouched] = useState(false);
  const promo = useSelector(selectPromocode)
  const showError = promoTouched && !promo.valid;
  const dispatch = useAppDispatch();

  const handlePromocodeBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setPromoTouched(true);
      dispatch(validatePromocode(e.target.value))
    }
  };

  if (promo.valid)
    return (
      <Alert>
        <AlertTitle>Промокод активирован</AlertTitle>
      </Alert>
    )

  return (
    <div className="order-menu__field">
      <Alert variant="destructive">
        <AlertTitle>Промокод недействителен</AlertTitle>
      </Alert>
      <Input
        type="text"
        onBlur={handlePromocodeBlur}
        placeholder="Промокод"
        className={cn(showError && "border-[var(--coral)] ")}
      ></Input>
    </div>
  );
};
