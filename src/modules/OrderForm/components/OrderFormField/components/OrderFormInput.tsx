import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/kit/form";
import { OtherFieldsConfig } from "../fieldConfigTypes";
import { form } from "@/modules/OrderForm/helpers/formConfig";
import { Input } from "@/shared/ui/kit/input";

export const OrderFormInput = ({
  name,
  label,
  fieldType,
  placeholder,
}: OtherFieldsConfig) => {

  return (
    <FormField
      control = {form.control}
      name = {name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder="Иванов Иван Иванович" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
