import { CartItem, CartItemDb } from "../cart/types";

export interface recipientInterface {
  fullName: string;
  phone: string;
  address: string;
  email: string;
  deliveryDate: string;
  comment?: string;
}

export interface OrderDbAdd {
  userId: string,
  cartItems: CartItemDb[],
  total: number,
  totalWithDiscount: number,
  discount: number,
  promocodeDiscount: number | null,
  certificateDiscount: number | null,
  recipient: recipientInterface,
}

export interface OrderDb {
  id: number,
  userId: string,
  cartItems: CartItemDb[],
  total: number,
  totalWithDiscount: number,
  discount: number,
  promocodeDiscount: number | null,
  certificateDiscount: number | null,
  recipient: recipientInterface,
}

export interface Order {
  id: number,
  userId: string,
  cartItems: CartItem[],
  total: number,
  totalWithDiscount: number,
  discount: number,
  promocodeDiscount: number | null,
  certificateDiscount: number | null,
  recipient: recipientInterface,
}

export interface OrdersState {
  items: Order[];
  current: Order | null;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

