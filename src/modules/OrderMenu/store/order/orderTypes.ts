import { CartItem, CartItemDb } from "@/modules/CartBody/index";

export type DeliveryMethodName = "courier" | "pickup" 
type DeliveryMethodLabel = "Курьером" | "Самовывоз"
type DeliveryMethodCost = 500 | 0

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

export type PaymentMethodName = "SBP" | "bank card"
type PaymentMethodLabel = "СБП" | "Банковская карта"

export type PaymentMethod = {
  name: PaymentMethodName,
  label: PaymentMethodLabel,
}

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


export interface recipientInterface {
  deliveryMethod: DeliveryMethodName;
  paymentMethod: PaymentMethodName;
  fullName: string;
  phone: string;
  address: string;
  email: string;
  deliveryDate: string;
  comment?: string;
}

interface GeneralOrder {
  userId: string;
  total: number;
  totalWithDiscount: number;
  discount: number;
  promocodeDiscount: number
  promocodePercent: number
  promocodeId: string | null;
  certificateDiscount: number
  deliveryCost: DeliveryMethodCost;
  certificateId: string | null;
  recipient: recipientInterface;
}

export interface OrderDbAdd extends GeneralOrder {
  cartItems: CartItemDb[];
}

export interface OrderDb extends GeneralOrder {
  id: number;
  cartItems: CartItemDb[];
}

export interface Order extends GeneralOrder {
  id: number;
  cartItems: CartItem[];
}

export interface OrderState {
  item: Order;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

