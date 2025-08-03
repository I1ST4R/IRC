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
  promocodeDiscount: number | null;
  promocodePercent: number | null;
  promocodeId: string | null;
  certificateDiscount: number | null;
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

export interface OrdersState {
  items: Order[];
  current: Order | null;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

export const enum OrderActionTypes {
  FETCH_ORDERS_REQUEST = 'FETCH_ORDERS_REQUEST',
  FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS',
  FETCH_ORDERS_FAILURE = 'FETCH_ORDERS_FAILURE',
  
  FETCH_ORDERS_BY_USER_ID_REQUEST = 'FETCH_ORDERS_BY_USER_ID_REQUEST',
  FETCH_ORDERS_BY_USER_ID_SUCCESS = 'FETCH_ORDERS_BY_USER_ID_SUCCESS',
  FETCH_ORDERS_BY_USER_ID_FAILURE = 'FETCH_ORDERS_BY_USER_ID_FAILURE',
  
  CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST',
  CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS',
  CREATE_ORDER_FAILURE = 'CREATE_ORDER_FAILURE',
  
  CHANGE_ORDER_INFO = 'CHANGE_ORDER_INFO',
}

interface FetchOrdersRequestAction {
  type: OrderActionTypes.FETCH_ORDERS_REQUEST;
}

interface FetchOrdersSuccessAction {
  type: OrderActionTypes.FETCH_ORDERS_SUCCESS;
  payload: Order[];
}

interface FetchOrdersFailureAction {
  type: OrderActionTypes.FETCH_ORDERS_FAILURE;
  payload: string;
}

interface FetchOrdersByUserIdRequestAction {
  type: OrderActionTypes.FETCH_ORDERS_BY_USER_ID_REQUEST;
}

interface FetchOrdersByUserIdSuccessAction {
  type: OrderActionTypes.FETCH_ORDERS_BY_USER_ID_SUCCESS;
  payload: Order[];
}

interface FetchOrdersByUserIdFailureAction {
  type: OrderActionTypes.FETCH_ORDERS_BY_USER_ID_FAILURE;
  payload: string;
}

interface CreateOrderRequestAction {
  type: OrderActionTypes.CREATE_ORDER_REQUEST;
}

interface CreateOrderSuccessAction {
  type: OrderActionTypes.CREATE_ORDER_SUCCESS;
  payload: Order[];
}

interface CreateOrderFailureAction {
  type: OrderActionTypes.CREATE_ORDER_FAILURE;
  payload: string;
}

interface ChangeOrderInfoAction {
  type: OrderActionTypes.CHANGE_ORDER_INFO;
  payload: Partial<Order> & { userId: string } | undefined;
}

export type OrderActions =
  | FetchOrdersRequestAction
  | FetchOrdersSuccessAction
  | FetchOrdersFailureAction
  | FetchOrdersByUserIdRequestAction
  | FetchOrdersByUserIdSuccessAction
  | FetchOrdersByUserIdFailureAction
  | CreateOrderRequestAction
  | CreateOrderSuccessAction
  | CreateOrderFailureAction
  | ChangeOrderInfoAction;

