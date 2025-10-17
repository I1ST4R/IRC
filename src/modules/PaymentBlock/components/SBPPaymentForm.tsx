import { useNavigate } from "react-router-dom";
import { useGetUserQuery } from "@/shared/store/user/userApiSlice";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/kit/form";
import { Input } from "@/shared/ui/kit/input";
import { Button } from "@/shared/ui/kit/button";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { useAppDispatch } from "@/App/store";
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
  const onValidSubmit = (validData: SBPPaymentData) => {
    dispatch(
      createOrder({
        recipient: {
          ...recipient,
          paymentPhone: validData.phone,
        },
        navigate,
        userId: user?.id ?? "",
      })
    )
      .unwrap()
      .catch((err) => console.error("createOrder failed", err));
  }
  return (
    <Form {...SBPPaymentForm}>
  <div className="space-y-4">
    <h2 className="text-xl font-semibold text-center">Оплата через СБП</h2>
    
    <form
      onSubmit={SBPPaymentForm.handleSubmit(onValidSubmit)}
      className="space-y-6 border-1 border-gray-400 p-5 rounded-[3px]"
    >
      <FormField
        control={SBPPaymentForm.control}
        name="phone"
        render={({ field }: { field: ControllerRenderProps<SBPPaymentData, "phone"> }) => (
          <FormItem>
            <FormLabel>Телефон</FormLabel>
            <FormControl>
              <Input placeholder="телефон" {...field} className="rounded-none w-full py-2.5 pl-3"/>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Button type="submit" className="w-full rounded-[2px] h-11 text-[14px] font-semibold">
        Оплатить
      </Button>
    </form>
  </div>
</Form>
  );
};