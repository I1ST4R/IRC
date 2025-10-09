import { CartItem } from "@/modules/CartBody";
import { Order } from "@/modules/OrderMenu";
import { ProductT } from "@/modules/ProductList";



export type User = {
  id: string | null;
  login: string | null;
  email: string | null;
  password: string | null;
  type: "client" | "admin" | null;
  cart: CartItem[];
  liked: ProductT[];
  orders: Order[];
}

export interface AuthResponse {
  user: User;
  token: string;
}

export type LoginData = {
  login: string;
  password: string;
}

export type RegisterData<T extends "form" | "default" = "default"> = {
  login: string;
  email: string;
  password: string;
} & (T extends "default" ? { type: 'client' } : {})