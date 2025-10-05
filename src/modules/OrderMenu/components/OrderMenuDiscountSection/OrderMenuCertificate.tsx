import { useState } from "react";
import { Input } from "@/shared/ui/kit/input";
import { cn } from "@/shared/lib/css";
import { Alert, AlertTitle } from "@/shared/ui/kit/alert";
import { selectCertificate, validateCertificate } from "../../store/cartTotals/cartTotalsSlice";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store/orderMenuStore";

export const OrderMenuCertificate = () => {
  const [certTouched, setCertTouched] = useState(false);
  const certificate = useSelector(selectCertificate)
  const showError = certTouched && !certificate.valid;
  const dispatch = useAppDispatch();

  const handleSertificateBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setCertTouched(true);
      dispatch(validateCertificate(e.target.value));
    }
  };

  if (certificate.valid)
    return (
      <Alert>
        <AlertTitle>Сертификат активирован</AlertTitle>
      </Alert>
    );

  return (
    <div className="order-menu__field">
      <Alert variant="destructive">
        <AlertTitle>Сертификат недействителен</AlertTitle>
      </Alert>
      <Input
        type="text"
        onBlur={handleSertificateBlur}
        placeholder="Сертификат"
        className={cn(showError && "border-[var(--coral)] ")}
      ></Input>
    </div>
  );
};
