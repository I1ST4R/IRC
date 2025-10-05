import {DeliveryMethodName} from "@/modules/OrderMenu/index"
import { DeliveyMethod, PaymentMethod } from "@/modules/OrderMenu/store/cartTotals/cartTotalsTypes";
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


// type GeneralConfig = {
//   name: FieldName
//   label: string
// }

// type FieldOptionType = {
//   value: string
//   label: string
// }

// Для каждого поля свой тип значения
type FieldValue<T extends FieldName> = 
  T extends "deliveryMethod" ? DeliveryMethodName :
  string;

// Теперь FieldAction знает КАКОЕ значение ожидать
export type FieldAction<T extends FieldName = FieldName> = {
  onBlur?: (value: FieldValue<T>) => void;
  onChange?: (value: FieldValue<T>) => void;
}

export type FieldOptions<T extends FieldName = FieldName> = 
  T extends "deliveryMethod" ? Array<Omit<DeliveyMethod, "cost">>:
  T extends "paymentMethod" ? PaymentMethod[]:
  Array<{value: string, label: string}>


export type SelectorConfig = {
  fieldType: FieldTypes.Selector;
  options: FieldOptions<"deliveryMethod" | "paymentMethod" >
  name: FieldName
  label: string
  // actions?: FieldAction<"deliveryMethod">
  actions?: {
    onBlur?: (value: string) => void;
    onChange?: (value: string) => void;
  }
} 

export type OtherFieldsConfig = {
  fieldType: FieldTypes.TextArea | FieldTypes.Input | FieldTypes.Date;
  placeholder: string;
  name: FieldName
  label: string
  // actions?: FieldAction<FieldName>
  actions?: {
    onBlur?: (value: string) => void;
    onChange?: (value: string) => void;
  }
} 

export type FieldConfigType = SelectorConfig | OtherFieldsConfig

export type OtherFieldsType = Omit<OtherFieldsConfig, 'fieldType'>
export type SelectorType = Omit<SelectorConfig, 'fieldType'>
 
