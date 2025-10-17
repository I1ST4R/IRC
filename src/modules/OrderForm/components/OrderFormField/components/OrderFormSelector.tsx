import { 
  FormControl,
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage
} from "@/shared/ui/kit/form";
import { SelectorType } from "../config/fieldConfigTypes";
import { 
  Select, 
  SelectContent, 
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/shared/ui/kit/select";
import { Control } from "react-hook-form";
import { RecipientFormData } from "@/modules/OrderForm/helpers/recepientSchema";

export const OrderFormSelector = ({
  name,
  label,
  options,
  actions,
  formControl
}: SelectorType & {formControl: Control<RecipientFormData>}) => {
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
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Выберите способ доставки" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {
                options.map((el) => {
                  return <SelectItem value={el}>{el}</SelectItem>
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
