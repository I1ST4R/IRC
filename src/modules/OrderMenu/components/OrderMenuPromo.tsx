import { useState } from "react";
import { validatePromo } from "../api/promo/validatePromo";
import { useGetPromoCodeQuery } from "../store/promo/api";

export const OrderMenuPromo = () => {
  const { data: promo } = useGetPromoCodeQuery();
  const [promoTouched, setPromoTouched] = useState(false);

  const handlePromocodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setPromoTouched(false);
    }
  };

  const handlePromocodeBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setPromoTouched(true);
      validatePromo(e.target.value);
    }
  };

  const showError = promoTouched && !promo?.id;

  return (
    <>
      {!promo?.id && (
        <div className="order-menu__field">
          <input
            type="text"
            onChange={handlePromocodeChange}
            onBlur={handlePromocodeBlur}
            placeholder="Промокод"
            className={`order-menu__input ${
              showError
                ? "order-menu__input--error"
                : ""
            }`}
          />
          {showError && (
            <div style={{ color: "red", fontSize: "13px", marginTop: "4px" }}>
              {"Промокод недействителен"}
            </div>
          )}
        </div>
      )}
      {promo?.id && (
        <div className="order-menu__field" style={{ color: "#CA354F" }}>
          Promocode activated
        </div>
      )}
    </>
  );
};
