import { FieldConfigType, FieldName, FieldTypes } from "./fieldConfigTypes";

export const fieldConfig : FieldConfigType[] = [
  {
    fieldType: FieldTypes.Selector,
    name: FieldName.deliveryMethod,
    label: "Способ доставки",
    className: "",
    options: [
      { value: "courier", label: "Курьером" },
      { value: "pickup", label: "Самовывоз" }
    ]
  },
  {
    fieldType: FieldTypes.Selector,
    name: FieldName.paymentMethod,
    label: "Способ оплаты",
    className: "",
    options: [
      { value: "SBP", label: "СБП" },
      { value: "bank card", label: "Банковская карта" }
    ]
  },
  {
    fieldType: FieldTypes.Input,
    name: FieldName.fullName,
    label: "ФИО",
    className: "",
    placeholder: "Иванов Иван Иванович"
  },
  {
    fieldType: FieldTypes.Input,
    name: FieldName.phone,
    label: "Телефон",
    className: "",
    placeholder: "+7 (999) 123-45-67"
  },
  {
    fieldType: FieldTypes.Input,
    name: FieldName.email,
    label: "Email",
    className: "",
    placeholder: "your@email.com"
  },
  {
    fieldType: FieldTypes.Input,
    name: FieldName.address,
    label: "Адрес",
    className: "",
    placeholder: "г. Москва, ул. Примерная, д. 1"
  },
  {
    fieldType: FieldTypes.Date,
    name: FieldName.deliveryDate,
    label: "Дата доставки",
    className: "flex flex-col"
  },
  {
    fieldType: FieldTypes.TextArea,
    name: FieldName.comment,
    label: "Комментарий (необязательно)",
    className: "",
    placeholder: "Дополнительная информация для курьера"
  }
]

