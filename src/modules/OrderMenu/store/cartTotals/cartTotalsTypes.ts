import { CartItem, CartItemDb } from "@/modules/CartBody/index";
import { DeliveryMethodCost, Recipient } from "@/modules/OrderForm";

export type Promo = {
  id: string | null
  valid: boolean;
  code: string | null;
  discount: number,
  percent: number;
}

export interface Certificate{
  id: string | null
  valid: boolean
  code: string | null
  discount: number
}

export type CartTotals<T extends "DB" | "default" = "default"> = {  
  cartItems: T extends "DB" ? CartItemDb[] : CartItem[];
  total: number;
  totalWithDiscount: number;
  discount: number;
  promo: Promo
  certificate: Certificate
  deliveryCost: DeliveryMethodCost;
}

export type CartTotalsState = {
  item: CartTotals;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}





export const DEFAULT_RECEPIENT: Recipient = {
  deliveryMethod: "Курьером",
  paymentMethod: "СБП",
  fullName: "",
  phone: "",
  address: "",
  email: "",
  deliveryDate: "",
  comment: ""
}

export type Order<T extends "DB" | "default" = "default"> = {
  recipient: Recipient,
  cartTotals: CartTotals<T>,
}