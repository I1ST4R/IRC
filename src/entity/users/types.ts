import { LikedItem } from '../liked/types';
import { CartItem } from '../cart/types'

export interface User {
  id: string | null;
  login: string | null;
  email: string | null;
  password: string | null;
  type: "client" | "admin" | null;
  cart: CartItem[];
  liked: LikedItem[];
}

export interface UserState {
  id: string | null;
  login: string | null;
  email: string | null;
  password: string | null;
  type: "client" | "admin" | null;
  cart: CartItem[];
  liked: LikedItem[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
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