import { FieldConfigType, FieldTypes } from "./fieldConfigTypes";
import { OrderFormInput } from "./components/OrderFormInput"
import { OrderFormSelector } from "./components/OrderFormSelector";
import { OrderFormTextarea } from "./components/OrderFormTextarea";
import { OrderFormDate } from "./components/OrderFormDate";

export const OrderFormField = (props : FieldConfigType) => {
  switch (props.fieldType){
    case FieldTypes.Input: return <OrderFormInput {...props}/>
    case FieldTypes.Selector: return <OrderFormSelector {...props}/>
    case FieldTypes.TextArea: return <OrderFormTextarea {...props}/>
    case FieldTypes.Date: return <OrderFormDate {...props}/>
  }
};
