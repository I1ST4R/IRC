import { Form } from "react-hook-form";
import { form, onSubmit } from "./helpers/formConfig";
import { getFieldConfig } from "./components/OrderFormField/fieldConfig";
import { OrderFormField } from "./components/OrderFormField/OrderMenuField";
import { useAppDispatch } from "../OrderMenu";

export const OrderForm = () => {

  const dispatch = useAppDispatch()
  const fieldConfig = getFieldConfig(dispatch)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {fieldConfig.map((el) => (
          <OrderFormField {...el} key={el.name} />
        ))}
      </form>
    </Form>
  );
};
