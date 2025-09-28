import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/kit/form";
import { OtherFieldsType } from "../fieldConfigTypes";
import { formControl } from "@/modules/OrderForm/helpers/formConfig";
import { Input } from "@/shared/ui/kit/input";

export const OrderFormInput = ({
  name,
  label,
  placeholder,
  actions
}: OtherFieldsType) => {
  return (
    <FormField
      control = {formControl}
      name = {name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
             placeholder={placeholder} 
             {...field} 
             onBlur={(e) => {
              field.onBlur(); 
              actions?.onBlur?.(e.target.value); 
            }}
            onChange={(e) => {
              field.onChange(e); 
              actions?.onChange?.(e.target.value); 
            }}
             />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
