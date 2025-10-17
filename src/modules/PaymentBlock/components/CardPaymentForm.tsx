import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/kit/form";
import { useNavigate } from "react-router-dom";
import { useGetUserQuery } from "@/shared/store/user/userApiSlice";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { Input } from "@/shared/ui/kit/input";
import { Button } from "@/shared/ui/kit/button";
import z from "zod";
import { useAppDispatch } from "@/App/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector } from "react-redux";
import { selectRecipient } from "@/modules/OrderForm";
import { createOrder } from "@/modules/OrderMenu";

export const CardPaymentForm = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const {data: user} = useGetUserQuery()
  const recipient = useSelector(selectRecipient)

  const cardPaymentSchema = z.object({
    number: z.string().regex(/^\d+$/, "Номер банковской карты должен содержать только цифры")
  })
  
  type CardPaymentData = z.infer<typeof cardPaymentSchema>
  
  const cardPaymentForm = useForm<CardPaymentData>({
    resolver: zodResolver(cardPaymentSchema),
    defaultValues: {
      number: ""
    },
    mode: "onChange"
  })
  
  const onValidSubmit = (validData: CardPaymentData) => {
    dispatch(
      createOrder({
        recipient: {
          ...recipient,
          cardNumber: validData.number,
        },
        navigate,
        userId: user?.id ?? "",
      })
    )
      .unwrap()
      .catch((err) => console.error("createOrder failed", err));
  };

  return (
    <Form {...cardPaymentForm}>
      <h2 className="text-xl font-semibold text-center">Оплата по номеру карты</h2>
      <form
        onSubmit={cardPaymentForm.handleSubmit(onValidSubmit)}
        className="space-y-6 border-1 border-gray-400 p-5 rounded-[3px]"
      >
        <FormField
          control={cardPaymentForm.control}
          name="number"
          render={({ field }: { field: ControllerRenderProps<CardPaymentData, "number"> }) => (
            <FormItem>
              <FormLabel>Номер карты</FormLabel>
              <FormControl>
                <Input placeholder="номер карты" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full rounded-[2px] h-11 text-[14px] font-semibold">
          Оплатить
        </Button>
      </form>
    </Form>
  );
};
