import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/kit/form";
import { Textarea } from "@/shared/ui/kit/textarea";
import { FieldConfigType } from "./fieldConfigTypes";
import { UseFormReturn } from "react-hook-form";
import {type RecipientFormData} from "../../OrderForm"

type FormReturnType = {
  form: UseFormReturn<RecipientFormData>
}

type OrderMenuFieldProps = FieldConfigType & FormReturnType

export const OrderMenuField = () => {
  return (
    <FormField
      control={form.control}
      name="comment"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Комментарий (необязательно)</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Дополнительная информация для курьера"
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
