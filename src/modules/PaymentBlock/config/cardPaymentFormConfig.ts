import { selectRecipient } from "@/modules/OrderForm";
import { AppDispatch, createOrder } from "@/modules/OrderMenu";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
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

export const onСardPaymentSubmit = (
  dispatch: AppDispatch,
  navigate: NavigateFunction,
  userId: string
) => {
  cardPaymentForm.handleSubmit((validData) => {
    const recipient = useSelector(selectRecipient)
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