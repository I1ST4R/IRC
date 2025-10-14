import { DELIVERY_METHOD_NAMES, PAYMENT_METHODS } from "../../../store/recipientTypes";

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

export type FieldOptions<T extends FieldName = FieldName> = 
  T extends "deliveryMethod" ? typeof DELIVERY_METHOD_NAMES:
  T extends "paymentMethod" ? typeof PAYMENT_METHODS:
  Array<{value: string, label: string}>


export type SelectorConfig = {
  fieldType: FieldTypes.Selector;
  options: FieldOptions<"deliveryMethod" | "paymentMethod" >
  name: FieldName
  label: string
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
  actions?: {
    onBlur?: (value: string) => void;
    onChange?: (value: string) => void;
  }
} 

export type FieldConfigType = SelectorConfig | OtherFieldsConfig

export type OtherFieldsType = Omit<OtherFieldsConfig, 'fieldType'>
export type SelectorType = Omit<SelectorConfig, 'fieldType'>
 
