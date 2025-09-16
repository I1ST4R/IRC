import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/kit/form";
import { OtherFieldsConfig } from "../fieldConfigTypes";
import { form } from "@/modules/OrderForm/helpers/formConfig";
import { Input } from "@/shared/ui/kit/input";

export const OrderFormInput = ({
  name,
  label,
  className,
  fieldType,
  placeholder,
}: OtherFieldsConfig) => {

  return (
    <FormField
      control = {form.control}
      name = {name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>ФИО</FormLabel>
          <FormControl>
            <Input placeholder="Иванов Иван Иванович" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
