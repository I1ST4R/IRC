
import { CartItem } from '../cart/types'
import { Order } from '../order/types';
import { Product } from '../product/types';

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

export interface UserState {
  id: string | null;
  login: string | null;
  email: string | null;
  password: string | null;
  type: "client" | "admin" | null;
  cart: CartItem[];
  liked: Product[];
  isAccountOpen: boolean;
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

export const enum UserActionTypes {
  LOGIN_REQUEST = 'LOGIN_REQUEST',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAILURE = 'LOGIN_FAILURE',
  
  REGISTER_REQUEST = 'REGISTER_REQUEST',
  REGISTER_SUCCESS = 'REGISTER_SUCCESS',
  REGISTER_FAILURE = 'REGISTER_FAILURE',
  
  CHECK_AUTH_REQUEST = 'CHECK_AUTH_REQUEST',
  CHECK_AUTH_SUCCESS = 'CHECK_AUTH_SUCCESS',
  CHECK_AUTH_FAILURE = 'CHECK_AUTH_FAILURE',
  
  LOGOUT = 'LOGOUT',
  CLEAR_ERROR = 'CLEAR_ERROR',
  OPEN_ACCOUNT = 'OPEN_ACCOUNT',
  CLOSE_ACCOUNT = 'CLOSE_ACCOUNT',
}

interface LoginRequestAction {
  type: UserActionTypes.LOGIN_REQUEST;
}

interface LoginSuccessAction {
  type: UserActionTypes.LOGIN_SUCCESS;
  payload: User;
}

interface LoginFailureAction {
  type: UserActionTypes.LOGIN_FAILURE;
  payload: string;
}

interface RegisterRequestAction {
  type: UserActionTypes.REGISTER_REQUEST;
}

interface RegisterSuccessAction {
  type: UserActionTypes.REGISTER_SUCCESS;
  payload: User;
}

interface RegisterFailureAction {
  type: UserActionTypes.REGISTER_FAILURE;
  payload: string;
}

interface CheckAuthRequestAction {
  type: UserActionTypes.CHECK_AUTH_REQUEST;
}

interface CheckAuthSuccessAction {
  type: UserActionTypes.CHECK_AUTH_SUCCESS;
  payload: User;
}

interface CheckAuthFailureAction {
  type: UserActionTypes.CHECK_AUTH_FAILURE;
  payload: string;
}

interface LogoutAction {
  type: UserActionTypes.LOGOUT;
}

interface ClearErrorAction {
  type: UserActionTypes.CLEAR_ERROR;
}

interface OpenAccountAction {
  type: UserActionTypes.OPEN_ACCOUNT;
}

interface CloseAccountAction {
  type: UserActionTypes.CLOSE_ACCOUNT;
}

export type UserActions =
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction
  | RegisterRequestAction
  | RegisterSuccessAction
  | RegisterFailureAction
  | CheckAuthRequestAction
  | CheckAuthSuccessAction
  | CheckAuthFailureAction
  | LogoutAction
  | ClearErrorAction
  | OpenAccountAction
  | CloseAccountAction;