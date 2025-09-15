export {OrderMenu} from "./OrderMenu";
export {
  changeOrderInfo,
  defaultRecipient
} from "./store/order/orderSlice"
export {useGetOrdersQuery} from "./store/order/orderApiSlice"
export { 
  PAYMENT_METHODS, 
  DELIVERY_METHODS,
  type recipientInterface 
} from "./store/order/orderTypes";