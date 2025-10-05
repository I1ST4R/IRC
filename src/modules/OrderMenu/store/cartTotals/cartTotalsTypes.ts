import { CartItem } from "@/modules/CartBody/index";
import { DeliveryMethodCost } from "@/modules/OrderForm";

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

export type CartTotals = {
  cartItems: CartItem[];
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


