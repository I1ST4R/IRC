import { useEffect, useState } from "react";
import React from "react";
import { Input } from "@/shared/ui/kit/input";
import { cn } from "@/shared/lib/css";
import { Alert, AlertTitle } from "@/shared/ui/kit/alert";
import {
  getCertificate,
  selectCertificate,
  validateCertificate,
} from "../../store/cartTotals/cartTotalsSlice";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/App/store";

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
      <Alert className="bg-transparent border-0 uppercase font-manrope text-xs ">
        <AlertTitle className="font-semibold tracking-[0.15em]">
          Сертификат активирован
        </AlertTitle>
      </Alert>
    );

  return (
    <div className="order-menu__field">
      <Input
        type="text"
        onBlur={handleSertificateBlur}
        placeholder="Сертификат"
        className={cn(showError && "border-[var(--coral)] ")}
      ></Input>
      {!certificate.valid && certTouched && (
        <Alert variant="destructive" className="border-0">
          <AlertTitle>Сертификат недействителен</AlertTitle>
        </Alert>
      )}
    </div>
  );
};
