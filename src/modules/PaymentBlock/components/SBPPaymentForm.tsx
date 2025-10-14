import { NavigateFunction, useNavigate } from "react-router-dom";
import { useGetUserQuery } from "@/shared/store/user/userApiSlice";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/kit/form";
import { Input } from "@/shared/ui/kit/input";
import { Button } from "@/shared/ui/kit/button";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { AppDispatch, useAppDispatch } from "@/App/store";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector } from "react-redux";
import { selectRecipient } from "@/modules/OrderForm";
import { createOrder } from "@/modules/OrderMenu";

export const SBPPaymentForm = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const {data: user} = useGetUserQuery()

  const SBPPaymentSchema = z.object({
    phone: z.string()
    .min(10, "Номер телефона должен содержать минимум 10 цифр")
    .max(15, "Номер телефона должен содержать максимум 15 цифр")
    // eslint-disable-next-line no-useless-escape
    .regex(/^[\d\+\-\(\)\s]+$/, "Номер телефона содержит недопустимые символы") 
  })
  
  type SBPPaymentData = z.infer<typeof SBPPaymentSchema>
  
  const SBPPaymentForm = useForm<SBPPaymentData>({
    resolver: zodResolver(SBPPaymentSchema),
    defaultValues: {
      phone: ""
    },
    mode: "onChange"
  })
  
  const recipient = useSelector(selectRecipient)
  const onSBPPaymentSubmit = (
    dispatch: AppDispatch,
    navigate: NavigateFunction,
    userId: string
  ) => {
    SBPPaymentForm.handleSubmit((validData) => {
      
      dispatch(createOrder({ 
        recipient: {
          ...recipient,
          paymentPhone: validData.phone
        }, 
        navigate, 
        userId 
      }));
    })()
  };

  return (
    <Form {...SBPPaymentForm}>
      <form
        onSubmit={() => onSBPPaymentSubmit(dispatch, navigate, user?.id ?? "")}
        className="space-y-6"
      >
        <FormField
          control={SBPPaymentForm.control}
          name="phone"
          render={({ field }: { field: ControllerRenderProps<SBPPaymentData, "phone"> }) => (
            <FormItem>
              <FormLabel>Телефон</FormLabel>
              <FormControl>
                <Input placeholder="телефон" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Оплатить
        </Button>
      </form>
    </Form>
  );
};