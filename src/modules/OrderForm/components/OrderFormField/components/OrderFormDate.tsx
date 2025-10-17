import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/kit/form";
import { OtherFieldsType } from "../config/fieldConfigTypes";
import { Calendar } from "@/shared/ui/kit/calendar";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/shared/ui/kit/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/ui/kit/popover";
import { cn } from "@/shared/lib/css";
import { Control } from "react-hook-form";
import { RecipientFormData } from "@/modules/OrderForm/helpers/recepientSchema";

export const OrderFormDate = ({
  name,
  label,
  actions,
  formControl,
}: OtherFieldsType & { formControl: Control<RecipientFormData> }) => {
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
                    "w-full pl-3 text-left font-normal bg-[rgb(242,242,242)] hover:bg-[rgb(226,226,226)] h-10 flex items-center cursor-pointer",
                    !field.value && "text-muted-foreground"
                  )}
                  onBlur={() => {
                    field.onBlur();
                    if (field.value) actions?.onBlur?.(field.value);
                  }}
                >
                  {field.value ? (
                    new Date(field.value).toLocaleDateString("ru-RU", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  ) : (
                    <span>Выберите дату</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-white min-w-[300px]" align="start">
              <Calendar
                mode="single"
                selected={field.value ? new Date(field.value) : undefined}
                onSelect={(date) => {
                  if (date) {
                    const dateString = date.toISOString();
                    field.onChange(dateString);
                    actions?.onChange?.(dateString);
                  }
                }}
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