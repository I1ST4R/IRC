import { CartItem, CartItemDb } from "../cart/types";

export type DeliveryMethod = "courier" | "pickup";

export type PaymentMethod = "SBP" | "bank card";

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

