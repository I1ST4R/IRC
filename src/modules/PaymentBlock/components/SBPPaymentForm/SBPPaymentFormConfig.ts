import { selectRecipient } from "@/modules/OrderForm";
import { AppDispatch, createOrder } from "@/modules/OrderMenu";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { NavigateFunction } from "react-router-dom";
import z from "zod";

const SBPPaymentSchema = z.object({
  phone: z.string()
  .min(10, "Номер телефона должен содержать минимум 10 цифр")
  .max(15, "Номер телефона должен содержать максимум 15 цифр")
  .regex(/^[\d\+\-\(\)\s]+$/, "Номер телефона содержит недопустимые символы") 
})

export type SBPPaymentData = z.infer<typeof SBPPaymentSchema>

export const SBPPaymentForm = useForm<SBPPaymentData>({
  resolver: zodResolver(SBPPaymentSchema),
  defaultValues: {
    phone: ""
  },
  mode: "onChange"
})

export const onSBPPaymentSubmit = (
  dispatch: AppDispatch,
  navigate: NavigateFunction,
  userId: string
) => {
  SBPPaymentForm.handleSubmit((validData) => {
    const recipient = useSelector(selectRecipient)
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