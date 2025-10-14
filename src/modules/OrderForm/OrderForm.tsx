import { Form } from "react-hook-form";
import { OrderFormField } from "./components/OrderFormField/OrderMenuField";
import { getFieldConfig } from "./components/OrderFormField/config/fieldConfig";
import { UseRecipientForm } from "./hooks/UseRecipientForm";
import { useAppDispatch } from "@/App/store";

export const OrderForm = () => {
  const dispatch = useAppDispatch()
  const fieldConfig = getFieldConfig(dispatch)

  const form = UseRecipientForm()

  form.control
  return (
    <Form {...form}>
      <form className="space-y-6">
        {fieldConfig.map((el) => (
          <OrderFormField {...el} formControl = {form.control} key={el.name} />
        ))}
      </form>
    </Form>
  );
};
