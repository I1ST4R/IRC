import { CartItem, CartItemDb } from "@/modules/CartBody/index";

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

export type PaymentMethod = "СБП" | "Банковская карта"
export const PAYMENT_METHODS = [
  "СБП",
  "Банковская карта",
] as const;

export type DeliveryMethodName = "Курьером" | "Самовывоз" 
export type DeliveryMethodCost = 500 | 0
export type DeliveyMethod = {
  name: DeliveryMethodName,
  cost: DeliveryMethodCost
}
export const DELIVERY_METHOD_NAMES = [
  "Курьером", 
  "Самовывоз"
] as const

export const DELIVERY_METHODS = [
  {
    name: "Курьером",
    cost: 500
  },
  {
    name: "Самовывоз",
    cost: 0
  }
] as const;

export type Recipient = {
  deliveryMethod: DeliveryMethodName;
  paymentMethod: PaymentMethod;
  fullName: string;
  phone: string;
  address: string;
  email: string;
  deliveryDate: string;
  comment?: string;
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