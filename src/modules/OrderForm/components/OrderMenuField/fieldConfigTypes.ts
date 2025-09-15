export const enum FieldTypes {
  Selector = "Selector",
  TextArea = "TextArea", 
  Input = "Input",
  Date = "Date"
}

type GeneralConfig = {
  name: string
  label: string
  className: string
}

type FieldOptionType = {
  value: string
  label: string
}

type SelectorConfig = {
  fieldType: FieldTypes.Selector;
  options: Array<FieldOptionType>;
} & GeneralConfig

type OtherFieldsConfig = {
  fieldType: FieldTypes.TextArea | FieldTypes.Input | FieldTypes.Date;
  placeholder?: string;
} & GeneralConfig

export type FieldConfigType = SelectorConfig | OtherFieldsConfig
