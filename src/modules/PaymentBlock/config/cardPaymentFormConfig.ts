import { AppDispatch, createOrder } from "@/modules/OrderMenu";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { NavigateFunction } from "react-router-dom";
import z from "zod";

const cardPaymentSchema = z.object({
  number: z.string().regex(/^\d+$/, "Номер банковской карты должен содержать только цифры")
})

export type cardPaymentData = z.infer<typeof cardPaymentSchema>

export const cardPaymentForm = useForm<cardPaymentData>({
  resolver: zodResolver(cardPaymentSchema),
  defaultValues: {
    number: ""
  },
  mode: "onChange"
})

export const onSubmit = (
  dispatch: AppDispatch,
  navigate: NavigateFunction,
  userId: string
) => {
  cardPaymentForm.handleSubmit((validData) => {
    
    dispatch(createOrder({ 
      recipient: {
        ...validData
        paymentPhone: 
      }, 
      navigate, 
      userId 
    }));
  })()
};