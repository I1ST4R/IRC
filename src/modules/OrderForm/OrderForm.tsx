import { Form } from "@/shared/ui/kit/form";
import { OrderFormField } from "./components/OrderFormField/OrderMenuField";
import { getFieldConfig } from "./components/OrderFormField/config/fieldConfig";
import { UseRecipientForm } from "./hooks/UseRecipientForm";
import { useAppDispatch } from "@/App/store";
import { UseRecipientFormOnSubmit } from "./hooks/UseRecipientFormOnSubmit";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectFormClick, setFormClick } from "./store/recipientSlice";
import { useEffect } from "react";

export const OrderForm = () => {
  const dispatch = useAppDispatch()
  const fieldConfig = getFieldConfig(dispatch)
  const form = UseRecipientForm()
  const navigate = useNavigate()
  const handleCheckout = UseRecipientFormOnSubmit(dispatch, navigate, form)
  const formClick = useSelector(selectFormClick)

  useEffect(() => {
    if (formClick) {
      handleCheckout();
      dispatch(setFormClick(false));
    }
  }, [formClick, handleCheckout, dispatch]);

  return (
    <Form {...form}>
      <form className="space-y-6" id="order-form">
        {fieldConfig.map((el) => (
          <OrderFormField {...el} formControl={form.control} key={el.name} />
        ))}
      </form>
    </Form>
  );
};