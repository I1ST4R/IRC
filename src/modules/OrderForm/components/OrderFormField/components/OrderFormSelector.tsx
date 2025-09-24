import { 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage
} from "@/shared/ui/kit/form";
import { SelectorType } from "../fieldConfigTypes";
import { form } from "@/modules/OrderForm/helpers/formConfig";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/shared/ui/kit/select";

export const OrderFormSelector = ({
  name,
  label,
  options,
}: SelectorType) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            {/* <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Выберите способ доставки" />
              </SelectTrigger>
            </FormControl> */}
            <SelectContent>
              {
                options.map((el) => {
                  return  <SelectItem value={el.value}>{el.label}</SelectItem>
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
