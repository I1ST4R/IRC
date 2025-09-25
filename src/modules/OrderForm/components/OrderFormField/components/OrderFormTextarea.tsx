import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/kit/form";
import { OtherFieldsType } from "../fieldConfigTypes";
import { Textarea } from "@/shared/ui/kit/textarea";
import { formControl } from "@/modules/OrderForm/helpers/formConfig";

export const OrderFormTextarea = ({
  name,
  label,
  placeholder,
}: OtherFieldsType) => {
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
