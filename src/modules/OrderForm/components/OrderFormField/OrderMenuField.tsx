import { FieldConfigType, FieldTypes } from "./config/fieldConfigTypes";
import { OrderFormInput } from "./components/OrderFormInput";
import { OrderFormSelector } from "./components/OrderFormSelector";
import { OrderFormTextarea } from "./components/OrderFormTextarea";
import { OrderFormDate } from "./components/OrderFormDate";
import { Control } from "react-hook-form";
import { RecipientFormData } from "../../helpers/recepientSchema";

type OrderFormFieldProps = FieldConfigType & {
  formControl: Control<RecipientFormData>
}

export const OrderFormField = (props: OrderFormFieldProps) => {
  switch (props.fieldType) {
    case FieldTypes.Input: {
      const { fieldType: _, ...inputProps } = props;
      return <OrderFormInput {...inputProps} />;
    }
    case FieldTypes.Date: {
      const { fieldType: _, ...dateProps } = props;
      return <OrderFormDate {...dateProps} />;
    }
    case FieldTypes.Selector: {
      const { fieldType: _, ...selectorProps } = props;
      return <OrderFormSelector {...selectorProps} />;
    }
    case FieldTypes.TextArea: {
      const { fieldType: _t, ...textareaProps } = props;
      return <OrderFormTextarea {...textareaProps} />;
    }
  }
};
