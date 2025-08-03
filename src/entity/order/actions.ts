import { OrderActionTypes } from './types';
import { addOrder, getOrders, getOrdersByUserId } from '../../services/api';
import { Order } from './types';

// Action creators
const fetchOrdersRequest = () => ({ 
  type: OrderActionTypes.FETCH_ORDERS_REQUEST as const 
});

const fetchOrdersSuccess = (orders: Order[]) => ({
  type: OrderActionTypes.FETCH_ORDERS_SUCCESS as const,
  payload: orders
});

const fetchOrdersFailure = (error: string) => ({
  type: OrderActionTypes.FETCH_ORDERS_FAILURE as const,
  payload: error
});

const fetchOrdersByUserIdRequest = () => ({ 
  type: OrderActionTypes.FETCH_ORDERS_BY_USER_ID_REQUEST as const 
});

const fetchOrdersByUserIdSuccess = (orders: Order[]) => ({
  type: OrderActionTypes.FETCH_ORDERS_BY_USER_ID_SUCCESS as const,
  payload: orders
});

const fetchOrdersByUserIdFailure = (error: string) => ({
  type: OrderActionTypes.FETCH_ORDERS_BY_USER_ID_FAILURE as const,
  payload: error
});

const createOrderRequest = () => ({ 
  type: OrderActionTypes.CREATE_ORDER_REQUEST as const 
});

const createOrderSuccess = (orders: Order[]) => ({
  type: OrderActionTypes.CREATE_ORDER_SUCCESS as const,
  payload: orders
});

const createOrderFailure = (error: string) => ({
  type: OrderActionTypes.CREATE_ORDER_FAILURE as const,
  payload: error
});

export const changeOrderInfo = (orderInfo: Partial<Order> & { userId: string } | undefined) => ({
  type: OrderActionTypes.CHANGE_ORDER_INFO as const,
  payload: orderInfo
});

// Thunk actions
export const fetchOrders = () => {
  return async (dispatch: any) => {
    dispatch(fetchOrdersRequest());
    try {
      const response = await getOrders();
      dispatch(fetchOrdersSuccess(response));
    } catch (error) {
      dispatch(fetchOrdersFailure(error instanceof Error ? error.message : 'Unknown error'));
    }
  };
};

export const fetchOrdersByUserId = (userId: string) => {
  return async (dispatch: any) => {
    dispatch(fetchOrdersByUserIdRequest());
    try {
      const response = await getOrdersByUserId(userId);
      dispatch(fetchOrdersByUserIdSuccess(response));
    } catch (error) {
      dispatch(fetchOrdersByUserIdFailure(error instanceof Error ? error.message : 'Unknown error'));
    }
  };
};

export const createOrder = (order: Order) => {
  return async (dispatch: any) => {
    dispatch(createOrderRequest());
    try {
      const response = await addOrder(order);
      dispatch(createOrderSuccess(response));
    } catch (error) {
      dispatch(createOrderFailure(error instanceof Error ? error.message : 'Unknown error'));
    }
  };
}; 