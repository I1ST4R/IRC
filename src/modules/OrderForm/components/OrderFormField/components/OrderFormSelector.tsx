import { 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage
} from "@/shared/ui/kit/form";
import { SelectorType } from "../fieldConfigTypes";
import { formControl } from "@/modules/OrderForm/helpers/formConfig";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/shared/ui/kit/select";
import { type DeliveryMethodName, type PaymentMethodName} from "@/modules/OrderMenu";

export const OrderFormSelector = ({
  name,
  label,
  options,
  actions
}: SelectorType) => {
  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select 
            defaultValue={field.value}
            onValueChange={(value) => {
              field.onChange(value); 
              actions?.onChange?.(value); 
            }}
            >
            {/* <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Выберите способ доставки" />
              </SelectTrigger>
            </FormControl> */}
            <SelectContent>
              {
                options.map((el) => {
                  return <SelectItem value={el.name}>{el.label}</SelectItem>
                })
              }
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
