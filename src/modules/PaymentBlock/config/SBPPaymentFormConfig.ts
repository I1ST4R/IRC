import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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