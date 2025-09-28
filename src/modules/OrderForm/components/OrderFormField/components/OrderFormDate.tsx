import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/kit/form";
import { OtherFieldsType } from "../fieldConfigTypes";
import { Calendar } from "@/shared/ui/kit/calendar";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/shared/ui/kit/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/kit/popover";
import { cn } from "@/shared/lib/css";
import { formControl } from "@/modules/OrderForm/helpers/formConfig";

export const OrderFormDate = ({
  name,
  label,
  placeholder,
  actions
}: OtherFieldsType) => {
  return ( 
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                  onBlur={() => {
                    field.onBlur(); 
                    if(field.value) actions?.onBlur?.(field.value); 
                  }}
                >
{/*                   
                  {field.value ? (
                    format(new Date(field.value), "PPP")
                  ) : (
                    <span>Выберите дату</span>
                  )} */}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value ? new Date(field.value) : undefined}
                onSelect={(date) => field.onChange(date?.toISOString())}
                disabled={(date) => date <= new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
