export const enum FieldTypes {
  Selector = "Selector",
  TextArea = "TextArea", 
  Input = "Input",
  Date = "Date"
}

export type FieldName = 
| "deliveryMethod" 
| "paymentMethod" 
| "fullName" 
| "phone" 
| "address" 
| "email" 
| "deliveryDate" 
| "comment"


type GeneralConfig = {
  name: FieldName
  label: string
  className: string
}

type FieldOptionType = {
  value: string
  label: string
}

export type SelectorConfig = {
  fieldType: FieldTypes.Selector;
  options: Array<FieldOptionType>;
} & GeneralConfig

export type OtherFieldsConfig = {
  fieldType: FieldTypes.TextArea | FieldTypes.Input | FieldTypes.Date;
  placeholder?: string;
} & GeneralConfig

export type FieldConfigType = SelectorConfig | OtherFieldsConfig
