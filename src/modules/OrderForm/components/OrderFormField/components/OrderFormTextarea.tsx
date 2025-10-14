import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/kit/form";
import { OtherFieldsType } from "../config/fieldConfigTypes";
import { Textarea } from "@/shared/ui/kit/textarea";
import { Control } from "react-hook-form";
import { RecipientFormData } from "@/modules/OrderForm/helpers/recepientSchema";

export const OrderFormTextarea = ({
  name,
  label,
  placeholder,
  formControl
}: OtherFieldsType & {formControl: Control<RecipientFormData>}) => {
  return (
    <FormField
      control={formControl}
      name= {name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea
              placeholder={placeholder}
              className="resize-none"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
