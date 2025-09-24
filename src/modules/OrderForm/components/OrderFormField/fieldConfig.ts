import { FieldConfigType, FieldTypes } from "./fieldConfigTypes";

export const fieldConfig : FieldConfigType[] = [
  {
    fieldType: FieldTypes.Selector,
    name: "deliveryMethod",
    label: "Способ доставки",
    options: [
      { value: "courier", label: "Курьером" },
      { value: "pickup", label: "Самовывоз" }
    ]
  },
  {
    fieldType: FieldTypes.Selector,
    name: "paymentMethod",
    label: "Способ оплаты",
    options: [
      { value: "SBP", label: "СБП" },
      { value: "bank card", label: "Банковская карта" }
    ]
  },
  {
    fieldType: FieldTypes.Input,
    name: "fullName",
    label: "ФИО",
    placeholder: "Иванов Иван Иванович"
  },
  {
    fieldType: FieldTypes.Input,
    name: "phone",
    label: "Телефон",
    placeholder: "+7 (999) 123-45-67"
  },
  {
    fieldType: FieldTypes.Input,
    name: "email",
    label: "Email",
    placeholder: "your@email.com"
  },
  {
    fieldType: FieldTypes.Input,
    name: "address",
    label: "Адрес",
    placeholder: "г. Москва, ул. Примерная, д. 1"
  },
  {
    fieldType: FieldTypes.Date,
    name: "deliveryDate",
    label: "Дата доставки",
    placeholder: ""
  },
  {
    fieldType: FieldTypes.TextArea,
    name: "comment",
    label: "Комментарий (необязательно)",
    placeholder: "Дополнительная информация для курьера"
  }
] as const
