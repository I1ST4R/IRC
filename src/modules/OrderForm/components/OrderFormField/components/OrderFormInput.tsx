import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/kit/form";
import { OtherFieldsType } from "../config/fieldConfigTypes";
import { Input } from "@/shared/ui/kit/input";
import { Control } from "react-hook-form";
import { RecipientFormData } from "@/modules/OrderForm/helpers/recepientSchema";

export const OrderFormInput = ({
  name,
  label,
  placeholder,
  actions,
  formControl
}: OtherFieldsType & {formControl: Control<RecipientFormData>}) => {
  return (
    <FormField
      control = {formControl}
      name = {name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
            className="rounded-none w-full py-2.5 pl-3"
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
