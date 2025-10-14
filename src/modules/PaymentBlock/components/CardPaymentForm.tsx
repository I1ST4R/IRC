import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/kit/form";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useGetUserQuery } from "@/shared/store/user/userApiSlice";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { Input } from "@/shared/ui/kit/input";
import { Button } from "@/shared/ui/kit/button";
import z from "zod";
import { AppDispatch, useAppDispatch } from "@/App/store";
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
  
  const onСardPaymentSubmit = (
    dispatch: AppDispatch,
    navigate: NavigateFunction,
    userId: string
  ) => {
    cardPaymentForm.handleSubmit((validData) => {
      dispatch(createOrder({ 
        recipient: {
          ...recipient,
          cardNumber: validData.number
        }, 
        navigate, 
        userId 
      }));
    })()
  };

  return (
    <Form {...cardPaymentForm}>
      <form
        onSubmit={() => onСardPaymentSubmit(dispatch, navigate, user?.id ?? "")}
        className="space-y-6"
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

        <Button type="submit" className="w-full">
          Оплатить
        </Button>
      </form>
    </Form>
  );
};
