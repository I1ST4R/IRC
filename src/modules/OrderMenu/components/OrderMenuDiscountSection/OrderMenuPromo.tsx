import { useEffect, useState } from "react";
import React from "react";
import { Alert, AlertTitle } from "@/shared/ui/kit/alert";
import { Input } from "@/shared/ui/kit/input";
import { cn } from "@/shared/lib/css";
import { useSelector } from "react-redux";
import {
  changeCartTotals,
  getPromocode,
  removePromo,
  selectPromocode,
  validatePromocode,
} from "../../store/cartTotals/cartTotalsSlice";
import { useAppDispatch } from "@/App/store";
import { Button } from "@/shared/ui/kit/button";

export const OrderMenuPromo = () => {
  const [promoTouched, setPromoTouched] = useState(false);
  const dispatch = useAppDispatch();

  const promo = useSelector(selectPromocode);
  const showError = promoTouched && !promo.valid;

  useEffect(() => {
    dispatch(getPromocode());
  }, [dispatch]);

  const handlePromocodeBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setPromoTouched(true);
      dispatch(validatePromocode(e.target.value));
    }
  };

  if (promo.valid)
    return (
      <Alert className="bg-transparent border-0 uppercase font-manrope text-[11px] p-0">
        <AlertTitle className="font-semibold tracking-[0.15em] flex items-center justify-between">
          Промокод активирован
          <Button 
          className="bg-transparent w-5 block h-10 p-0 m-0 hover:bg-transparent cursor-pointer"
          onClick={() => {
            dispatch(removePromo())
            dispatch(changeCartTotals({}))
            setPromoTouched(false)
          }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 5L5 15"
                stroke="#333"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5 5L15 15"
                stroke="#333"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
        </AlertTitle>
      </Alert>
    );

  return (
    <div className="mb-2">
      <Input
        type="text"
        onBlur={handlePromocodeBlur}
        placeholder="Промокод"
        className={cn(showError && "border-[var(--coral)]", "w-full")}
      ></Input>
      {!promo.valid && promoTouched && (
        <Alert variant="destructive" className="border-0">
          <AlertTitle>Промокод недействителен</AlertTitle>
        </Alert>
      )}
    </div>
  );
};
