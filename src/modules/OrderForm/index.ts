export { useAppDispatch } from "./store/OrderFormStore";
export { selectRecipient } from "./store/recipientSlice";
export { OrderForm } from "./OrderForm";
export { onSubmit } from "../OrderForm/helpers/formConfig"
export {
  type Recipient,
  type DeliveryMethodCost,
  type DeliveryMethodName,
  DELIVERY_METHODS
} from "./store/recipientTypes"