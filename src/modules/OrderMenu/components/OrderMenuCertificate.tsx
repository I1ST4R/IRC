import { useState } from "react";
import {
  useGetCertificateCodeQuery,
  useValidateCertificateCodeMutation,
} from "../store/certificate/api";

export const OrderMenuCertificate = () => {
  const [validateCertificate] = useValidateCertificateCodeMutation();
  const { data: certificate } = useGetCertificateCodeQuery();

  const [certTouched, setCertTouched] = useState(false);

  const handleSertificateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) setCertTouched(false);
  };

  const handleSertificateBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (certificate) {
      setCertTouched(true);
      validateCertificate(e.target.value);
    }
  };

  const showError = certTouched && !certificate?.id;

  if (certificate?.id)
    return (
      <div className="order-menu__field" style={{ color: "#CA354F" }}>
        Certificate activated
      </div>
    );

  return (
    <div className="order-menu__field">
      <input
        type="text"
        onChange={handleSertificateChange}
        onBlur={handleSertificateBlur}
        placeholder="Сертификат"
        className={`order-menu__input ${
          showError ? "order-menu__input--error" : ""
        }`}
      />
      {showError && (
        <div style={{ color: "red", fontSize: "13px", marginTop: "4px" }}>
          {"Сертификат недействителен"}
        </div>
      )}
    </div>
  );
};
