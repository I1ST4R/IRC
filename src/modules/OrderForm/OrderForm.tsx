import BreadCrumb from "@/shared/BreadCrumb/BreadCrumb";
import {
  changeOrderInfo,
  defaultRecipient,
  recipientInterface,
} from "../OrderMenu/index";
import { useGetUserQuery } from "@/shared/store/user/userApiSlice";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DELIVERY_METHODS, PAYMENT_METHODS } from "../OrderMenu/index";
import { Form, useForm, UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/kit/form";
import { Textarea } from "@/shared/ui/kit/textarea";

const recipientSchema = z.object({
  deliveryMethod: z.enum(DELIVERY_METHODS, {
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

export const OrderForm = () => {
  const { data: user } = useGetUserQuery();

  //Check for matching types of zod scheme and type
  const typeCheck: recipientInterface = {} as RecipientFormData;

  const form = useForm<RecipientFormData>({
    resolver: zodResolver(recipientSchema),
    defaultValues: defaultRecipient,
    mode: "onBlur",
  });

  function onSubmit(data: RecipientFormData) {
    console.log("Данные формы:", data);
    // Здесь отправка данных на сервер
  }

  return (
    <>
      <div className="order__form">
        <BreadCrumb
          pageLinks={[
            { name: "Главная", link: "/" },
            { name: "Корзина", link: "/cart" },
            { name: "Заказ", link: "/" },
          ]}
        />
        <div className="order__point">
          <h1 className="order__point-title">Доставка</h1>
          <div className="order__point-methods">
            <label className="order__point-method">
              <input
                type="radio"
                name="deliveryMethod"
                value="courier"
                checked={formData.deliveryMethod === "courier"}
                onChange={handleDeliveryChange}
              />
              <span>Доставка курьером</span>
            </label>

            <label className="order__point-method">
              <input
                type="radio"
                name="deliveryMethod"
                value="pickup"
                checked={formData.deliveryMethod === "pickup"}
                onChange={handleDeliveryChange}
              />
              <span>Самовывоз</span>
            </label>
          </div>
        </div>

        <div className="order__point">
          <h1 className="order__point-title">Оплата</h1>
          <div className="order__point-methods">
            <label className="order__point-method">
              <input
                type="radio"
                name="paymentMethod"
                value="SBP"
                checked={formData.paymentMethod === "SBP"}
                onChange={handleChange}
              />
              <span>СБП</span>
            </label>
            <label className="order__point-method">
              <input
                type="radio"
                name="paymentMethod"
                value="bank card"
                checked={formData.paymentMethod === "bank card"}
                onChange={handleChange}
              />
              <span>Банковской картой</span>
            </label>
          </div>
        </div>

        <div className="order__point">
          <h1 className="order__point-title">Получатель</h1>
          <div className="order__point-form">
            <div className="order__point-field">
              <label htmlFor="fullName">Ф.И.О.</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Введите ваше полное имя"
                required
              />
              {fieldErrors.fullName && (
                <span className="field-error">{fieldErrors.fullName}</span>
              )}
            </div>

            <div className="order__point-field">
              <label htmlFor="phone">Телефон</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+7 (___) ___-__-__"
                required
              />
              {fieldErrors.phone && (
                <span className="field-error">{fieldErrors.phone}</span>
              )}
            </div>

            <div className="order__point-field">
              <label htmlFor="address">Адрес</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Введите адрес доставки"
                required
              />
              {fieldErrors.address && (
                <span className="field-error">{fieldErrors.address}</span>
              )}
            </div>

            <div className="order__point-field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Введите ваш email"
                required
              />
              {fieldErrors.email && (
                <span className="field-error">{fieldErrors.email}</span>
              )}
            </div>

            <div className="order__point-field">
              <label htmlFor="deliveryDate">Дата доставки</label>
              <input
                type="date"
                id="deliveryDate"
                name="deliveryDate"
                value={formData.deliveryDate}
                onChange={handleChange}
                required
              />
              {fieldErrors.deliveryDate && (
                <span className="field-error">{fieldErrors.deliveryDate}</span>
              )}
            </div>

            <div className="order__point-field">
              <label htmlFor="comment">Комментарий к заказу</label>
              <textarea
                id="comment"
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                placeholder="Дополнительная информация к заказу"
                rows={4}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="order__form">
        <Form {...form}>
          
        </Form>
      </div>
    </>
  );
};
