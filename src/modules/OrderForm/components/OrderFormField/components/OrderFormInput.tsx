import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/kit/form";
import { OtherFieldsType } from "../fieldConfigTypes";
import { form } from "@/modules/OrderForm/helpers/formConfig";
import { Input } from "@/shared/ui/kit/input";

export const OrderFormInput = ({
  name,
  label,
  placeholder,
}: OtherFieldsType) => {
  return (
    <FormField
      control = {form.control}
      name = {name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
