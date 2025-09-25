import { Form } from "react-hook-form";
import { form, onSubmit } from "./helpers/formConfig";
import { fieldConfig } from "./components/OrderFormField/fieldConfig";
import { OrderFormField } from "./components/OrderFormField/OrderMenuField";

export const OrderForm = () => {
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
