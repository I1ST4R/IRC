import z from "zod";

const SBPPaymentSchema = z.object({
  phone: z.string()
  .min(10, "Номер телефона должен содержать минимум 10 цифр")
  .max(15, "Номер телефона должен содержать максимум 15 цифр")
  .regex(/^[\d\+\-\(\)\s]+$/, "Номер телефона содержит недопустимые символы") 
})

const cardPaymentSchema = z.object({
  number: z.string().regex(/^\d+$/, "Номер банковской карты должен содержать только цифры")
})