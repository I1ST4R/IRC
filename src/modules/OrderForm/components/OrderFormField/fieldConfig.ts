import { changeDeliveryMethod, DELIVERY_METHOD_NAMES, PAYMENT_METHODS, AppDispatch } from "@/modules/OrderMenu";
import { FieldConfigType, FieldTypes } from "./fieldConfigTypes";
import { DeliveryMethodName } from "@/modules/OrderMenu/store/cartTotals/cartTotalsTypes";

// const DeliveryMethodOptions = DELIVERY_METHODS.map((el) => {
//   return {
//     name: el.name,
//     label: el.label
//   }
// })

// const PaymentMethodOptions = PAYMENT_METHODS.map((el) => {
//   return {
//     name: el.name,
//     label: el.label
//   }
// })

export const getFieldConfig = (dispatch: AppDispatch):  FieldConfigType[] => [
  {
    fieldType: FieldTypes.Selector,
    name: "deliveryMethod",
    label: "Способ доставки",
    options: DELIVERY_METHOD_NAMES,
    actions: {
      onBlur: (value) => { 
        dispatch(changeDeliveryMethod(value as DeliveryMethodName))
      }
    } 
  },
  {
    fieldType: FieldTypes.Selector,
    name: "paymentMethod",
    label: "Способ оплаты",
    options: PAYMENT_METHODS
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
