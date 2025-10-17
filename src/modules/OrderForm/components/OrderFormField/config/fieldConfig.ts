import { changeDeliveryMethod } from "@/modules/OrderMenu";
import { FieldConfigType, FieldTypes } from "./fieldConfigTypes";
import { DELIVERY_METHOD_NAMES, DeliveryMethodName, PAYMENT_METHODS } from "../../../store/recipientTypes";
import { AppDispatch } from "@/App/store";

export const getFieldConfig = (dispatch: AppDispatch):  FieldConfigType[] => [
  {
    fieldType: FieldTypes.Selector,
    name: "deliveryMethod",
    label: "Доставка",
    options: DELIVERY_METHOD_NAMES,
    actions: {
      onChange: (value) => { 
        dispatch(changeDeliveryMethod(value as DeliveryMethodName))
      }
    }, 
  },
  {
    fieldType: FieldTypes.Selector,
    name: "paymentMethod",
    label: "Оплата",
    options: PAYMENT_METHODS
  },
  {
    fieldType: FieldTypes.Input,
    name: "fullName",
    label: "ФИО",
    placeholder: "Введите ваше полное имя"
  },
  {
    fieldType: FieldTypes.Input,
    name: "phone",
    label: "Телефон",
    placeholder: "+7 (___) ___-__-__"
  },
  {
    fieldType: FieldTypes.Input,
    name: "email",
    label: "Email",
    placeholder: "Введите ваш email"
  },
  {
    fieldType: FieldTypes.Input,
    name: "address",
    label: "Адрес",
    placeholder: "Введите Адрес доставки"
  },
  {
    fieldType: FieldTypes.Date,
    name: "deliveryDate",
    label: "Введите дату доставки",
    placeholder: ""
  },
  {
    fieldType: FieldTypes.TextArea,
    name: "comment",
    label: "Комментарий к заказу (необязательно)",
    placeholder: "Дополнительная информация для курьера"
  }
] as const
