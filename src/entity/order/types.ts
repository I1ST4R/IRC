import { CartItem, CartItemDb } from "../cart/types";

export interface recipientInterface {
  deliveryMethod: "courier" | "pickup"
  paymentMethod: "SBP" | "bank card"
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
  promocodeDiscount: number | null;
  promocodeId: string | null;
  certificateDiscount: number | null;
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

export interface OrdersState {
  items: Order[];
  current: Order | null;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

