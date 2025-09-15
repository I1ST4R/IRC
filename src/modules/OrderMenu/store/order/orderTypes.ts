import { CartItem, CartItemDb } from "@/modules/CartBody/index";

// Определяем константы для значений
export const DELIVERY_METHODS = ["courier", "pickup"] as const;
export const PAYMENT_METHODS = ["SBP", "bank card"] as const;

// Создаем типы
export type DeliveryMethod = typeof DELIVERY_METHODS[number];
export type PaymentMethod = typeof PAYMENT_METHODS[number];

export interface recipientInterface {
  deliveryMethod: DeliveryMethod;
  paymentMethod: PaymentMethod;
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
  deliveryCost: 0 | 500;
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

