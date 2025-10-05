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

export type PaymentMethodName = "SBP" | "bank card"
type PaymentMethodLabel = "СБП" | "Банковская карта"

export type PaymentMethod = {
  name: PaymentMethodName,
  label: PaymentMethodLabel,
}

export type DeliveryMethodName = "courier" | "pickup" 
export type DeliveryMethodCost = 500 | 0

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    name: "SBP",
    label: "СБП",
  },
  {
    name: "bank card",
    label: "Банковская карта",
  }
] as const;

type DeliveryMethodLabel = "Курьером" | "Самовывоз"

export type DeliveyMethod = {
  name: DeliveryMethodName,
  label: DeliveryMethodLabel,
  cost: DeliveryMethodCost
}

export const DELIVERY_METHODS: DeliveyMethod[] = [
  {
    name: "courier",
    label: "Курьером",
    cost: 500
  },
  {
    name: "pickup",
    label: "Самовывоз",
    cost: 0
  }
] as const;

export type Recipient = {
  deliveryMethod: DeliveryMethodName;
  paymentMethod: PaymentMethodName;
  fullName: string;
  phone: string;
  address: string;
  email: string;
  deliveryDate: string;
  comment?: string;
}

export type Order = {
  recipient: Recipient,
  cartTotals: CartTotals<"DB">,
}


