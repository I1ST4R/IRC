import { useEffect, useState } from "react";
import React from "react";
import { Input } from "@/shared/ui/kit/input";
import { cn } from "@/shared/lib/css";
import { Alert, AlertTitle } from "@/shared/ui/kit/alert";
import {
  getCertificate,
  removeCertificate,
  selectCertificate,
  validateCertificate,
} from "../../store/cartTotals/cartTotalsSlice";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/App/store";
import { Button } from "@/shared/ui/kit/button";

export const OrderMenuCertificate = () => {
  const [certTouched, setCertTouched] = useState(false);
  const dispatch = useAppDispatch();
  const certificate = useSelector(selectCertificate);
  const showError = certTouched && !certificate.valid;

  useEffect(() => {
    dispatch(getCertificate());
  }, [dispatch]);

  const handleSertificateBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setCertTouched(true);
      dispatch(validateCertificate(e.target.value));
    }
  };

  if (certificate.valid)
    return (
      <Alert className="bg-transparent border-0 uppercase font-manrope text-[11px] p-0">
        <AlertTitle className="font-semibold tracking-[0.15em] flex items-center justify-between">
          Сертификат активирован
          <Button 
          className="bg-transparent w-5 h-10 block p-0 m-0 hover:bg-transparent cursor-pointer"
          onClick={() => {
            dispatch(removeCertificate())
            setCertTouched(false)
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
    <div className="order-menu__field">
      <Input
        type="text"
        onBlur={handleSertificateBlur}
        placeholder="Сертификат"
        className={cn(showError && "border-[var(--coral)]", "w-full")}
      ></Input>
      {!certificate.valid && certTouched && (
        <Alert variant="destructive" className="border-0">
          <AlertTitle>Сертификат недействителен</AlertTitle>
        </Alert>
      )}
    </div>
  );
};
