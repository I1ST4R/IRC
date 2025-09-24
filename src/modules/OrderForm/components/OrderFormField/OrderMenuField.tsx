import { FieldConfigType, FieldTypes } from "./fieldConfigTypes";
import { OrderFormInput } from "./components/OrderFormInput";
import { OrderFormSelector } from "./components/OrderFormSelector";
import { OrderFormTextarea } from "./components/OrderFormTextarea";
import { OrderFormDate } from "./components/OrderFormDate";

export const OrderFormField = (props: FieldConfigType) => {
  switch (props.fieldType) {
    case FieldTypes.Input:
    case FieldTypes.Date:
      const { fieldType, ...inputProps } = props;
      return <OrderFormInput {...inputProps} />;
    case FieldTypes.Selector:
      const { fieldType: _, ...selectorProps } = props;
      return <OrderFormSelector {...selectorProps} />;
    case FieldTypes.TextArea:
      const { fieldType: __, ...textareaProps } = props;
      return <OrderFormTextarea {...textareaProps} />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Способ доставки */}
        <FormField
          control={form.control}
          name="deliveryMethod"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Способ доставки</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите способ доставки" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="courier">Курьером</SelectItem>
                  <SelectItem value="pickup">Самовывоз</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Способ оплаты */}
        <FormField
          control={form.control}
          name="paymentMethod"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Способ оплаты</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите способ оплаты" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="SBP">СБП</SelectItem>
                  <SelectItem value="bank card">Банковская карта</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ФИО */}
        

        {/* Телефон */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Телефон</FormLabel>
              <FormControl>
                <Input placeholder="+7 (999) 123-45-67" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="your@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Адрес */}
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Адрес</FormLabel>
              <FormControl>
                <Input
                  placeholder="г. Москва, ул. Примерная, д. 1"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Дата доставки */}
        <FormField
          control={form.control}
          name="deliveryDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Дата доставки</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(new Date(field.value), "PPP")
                      ) : (
                        <span>Выберите дату</span>
                      )}
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

        {/* Комментарий */}
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

        <Button type="submit" className="w-full" size="lg">
          Подтвердить заказ
        </Button>
      </form>
    </Form>
  );
};
