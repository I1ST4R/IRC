
import { CartItem } from '../cart/types'
import { Order } from '../order/orderTypes';
import { Product } from '../productTypes';

export interface User {
  id: string | null;
  login: string | null;
  email: string | null;
  password: string | null;
  type: "client" | "admin" | null;
  cart: CartItem[];
  liked: Product[];
  orders: Order[];
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginData {
  login: string;
  password: string;
}

export interface RegisterData {
  login: string;
  email: string;
  password: string;
  type: 'client'; 
}