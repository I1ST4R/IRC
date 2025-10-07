import z from "zod";
import { DELIVERY_METHOD_NAMES, PAYMENT_METHODS, Recipient } from "@/modules/OrderMenu/store/cartTotals/cartTotalsTypes";

export const recipientSchema = z.object({
  deliveryMethod: z.enum(DELIVERY_METHOD_NAMES, {
    errorMap: () => ({ message: "Выберите способ доставки" }),
  }),
  paymentMethod: z.enum(PAYMENT_METHODS, {
    errorMap: () => ({ message: "Выберите способ оплаты" }),
  }),
  fullName: z
    .string()
    .min(5, { message: "ФИО должно содержать минимум 5 символов" })
    .max(100, { message: "ФИО слишком длинное" }),
  phone: z
    .string()
    .min(11, { message: "Телефон должен содержать минимум 11 цифр" })
    .max(15, { message: "Телефон слишком длинный" })
    .regex(/^[0-9+\-\s()]+$/, {
      message: "Телефон содержит недопустимые символы",
    }),
  address: z
    .string()
    .min(1, { message: "Адрес обязателен для заполнения" })
    .max(200, { message: "Адрес слишком длинный" }),
  email: z
    .string()
    .email({ message: "Введите корректный email адрес" })
    .max(100, { message: "Email слишком длинный" }),
  deliveryDate: z
    .string()
    .min(1, { message: "Дата доставки обязательна" })
    .refine(
      (value) => {
        const selectedDate = new Date(value);
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        return selectedDate >= tomorrow;
      },
      { message: "Дата доставки должна быть не раньше завтрашнего дня" }
    ),
  comment: z
    .string()
    .max(500, { message: "Комментарий не должен превышать 500 символов" })
    .optional(),
});

export type RecipientFormData = z.infer<typeof recipientSchema>;

//Check for matching types of zod scheme and type
const typeCheck: Recipient = {} as RecipientFormData;