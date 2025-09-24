import { FieldConfigType, FieldTypes, OtherFieldsConfig, SelectorConfig } from "./fieldConfigTypes";

export const fieldConfig = [
  {
    fieldType: FieldTypes.Selector,
    name: "deliveryMethod",
    label: "Способ доставки",
    options: [
      { value: "courier", label: "Курьером" },
      { value: "pickup", label: "Самовывоз" }
    ]
  } as SelectorConfig,
  {
    fieldType: FieldTypes.Selector,
    name: "paymentMethod",
    label: "Способ оплаты",
    options: [
      { value: "SBP", label: "СБП" },
      { value: "bank card", label: "Банковская карта" }
    ]
  } as SelectorConfig,
  {
    fieldType: FieldTypes.Input,
    name: "fullName",
    label: "ФИО",
    placeholder: "Иванов Иван Иванович"
  } as OtherFieldsConfig,
  {
    fieldType: FieldTypes.Input,
    name: "phone",
    label: "Телефон",
    placeholder: "+7 (999) 123-45-67"
  } as OtherFieldsConfig,
  {
    fieldType: FieldTypes.Input,
    name: "email",
    label: "Email",
    placeholder: "your@email.com"
  } as OtherFieldsConfig,
  {
    fieldType: FieldTypes.Input,
    name: "address",
    label: "Адрес",
    placeholder: "г. Москва, ул. Примерная, д. 1"
  } as OtherFieldsConfig,
  {
    fieldType: FieldTypes.Date,
    name: "deliveryDate",
    label: "Дата доставки",
    placeholder: ""
  } as OtherFieldsConfig,
  {
    fieldType: FieldTypes.TextArea,
    name: "comment",
    label: "Комментарий (необязательно)",
    placeholder: "Дополнительная информация для курьера"
  } as OtherFieldsConfig
] as const
