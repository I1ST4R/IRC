import { useState } from "react";
import { 
  useGetPromoCodeQuery, 
  useValidatePromoCodeMutation 
} from "../store/promo/promoApiSlice";
import { Alert, AlertTitle } from "@/shared/ui/kit/alert";
import { Input } from "@/shared/ui/kit/input";
import { cn } from "@/shared/lib/css";

export const OrderMenuPromo = () => {
  const { data: promo } = useGetPromoCodeQuery();
  const [validatePromo] = useValidatePromoCodeMutation()
  const [promoTouched, setPromoTouched] = useState(false);
  const showError = promoTouched && !promo?.id;

  const handlePromocodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) setPromoTouched(false);
  };

  const handlePromocodeBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setPromoTouched(true);
      validatePromo(e.target.value);
    }
  };

  if (promo?.id)
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
        onChange={handlePromocodeChange}
        onBlur={handlePromocodeBlur}
        placeholder="Сертификат"
        className={cn(showError && "border-[var(--coral)] ")}
      ></Input>
    </div>
  );
};
