import { useState } from "react";
import {
  useGetCertificateCodeQuery,
  useValidateCertificateCodeMutation,
} from "../store/certificate/api";
import { Input } from "@/shared/ui/kit/input";
import { cn } from "@/shared/lib/css";
import { Alert, AlertTitle } from "@/shared/ui/kit/alert";

export const OrderMenuCertificate = () => {
  const [validateCertificate] = useValidateCertificateCodeMutation();
  const { data: certificate } = useGetCertificateCodeQuery();
  const [certTouched, setCertTouched] = useState(false);
  const showError = certTouched && !certificate?.id;

  const handleSertificateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) setCertTouched(false);
  };

  const handleSertificateBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (certificate) {
      setCertTouched(true);
      validateCertificate(e.target.value);
    }
  };

  if (certificate?.id)
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
        onChange={handleSertificateChange}
        onBlur={handleSertificateBlur}
        placeholder="Сертификат"
        className={cn(showError && "border-[var(--coral)] ")}>
      </Input>
    </div>
  );
};
