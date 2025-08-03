import { OrderActionTypes } from './types';
import { OrdersState, OrderActions, Order } from './types';

const defaultOrder: Order = {
  id: 0,
  userId: "",
  cartItems: [],
  total: 0,
  totalWithDiscount: 0,
  discount: 0,
  promocodeDiscount: null,
  promocodePercent: null,
  promocodeId: null,
  certificateDiscount: null,
  deliveryCost: 500,
  certificateId: null,
  recipient: {
    deliveryMethod: "courier",
    paymentMethod: "SBP",
    fullName: "",
    phone: "",
    address: "",
    email: "",
    deliveryDate: "",
    comment: "",
  },
};

const initialState: OrdersState = {
  items: [],
  current: { ...defaultOrder },
  loading: 'idle',
  error: null
};

export const orderReducer = (
  state = initialState,
  action: OrderActions
): OrdersState => {
  switch (action.type) {
    // Загрузка всех заказов
    case OrderActionTypes.FETCH_ORDERS_REQUEST:
      return {
        ...state,
        loading: 'pending',
        error: null
      };
    case OrderActionTypes.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        loading: 'succeeded',
        items: action.payload,
        error: null
      };
    case OrderActionTypes.FETCH_ORDERS_FAILURE:
      return {
        ...state,
        loading: 'failed',
        error: action.payload
      };

    // Загрузка заказов пользователя
    case OrderActionTypes.FETCH_ORDERS_BY_USER_ID_REQUEST:
      return {
        ...state,
        loading: 'pending',
        error: null
      };
    case OrderActionTypes.FETCH_ORDERS_BY_USER_ID_SUCCESS:
      return {
        ...state,
        loading: 'succeeded',
        items: action.payload,
        error: null
      };
    case OrderActionTypes.FETCH_ORDERS_BY_USER_ID_FAILURE:
      return {
        ...state,
        loading: 'failed',
        error: action.payload
      };

    // Создание заказа
    case OrderActionTypes.CREATE_ORDER_REQUEST:
      return {
        ...state,
        loading: 'pending',
        error: null
      };
    case OrderActionTypes.CREATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: 'succeeded',
        items: action.payload,
        error: null
      };
    case OrderActionTypes.CREATE_ORDER_FAILURE:
      return {
        ...state,
        loading: 'failed',
        error: action.payload
      };

    // Изменение информации заказа
    case OrderActionTypes.CHANGE_ORDER_INFO:
      const newState = { ...state };
      
      if (newState.current === null) {
        newState.current = { ...defaultOrder };
      }

      if (action.payload) {
        newState.current.userId = action.payload.userId;
        const { userId, ...rest } = action.payload;
        Object.assign(newState.current, rest);
      }

      // Пересчёт totals
      const cartItems = newState.current.cartItems || [];
      const total = cartItems.reduce(
        (sum, item) => sum + item.product.prevPrice * item.quantity,
        0
      );
      let totalWithDiscount = cartItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );
      const discount = total - totalWithDiscount;

      // Промокод — процент
      let promoDiscount = 0;
      if (
        typeof newState.current.promocodePercent === 'number' && 
        newState.current.promocodePercent > 0
      ) {
        promoDiscount = totalWithDiscount * newState.current.promocodePercent;
        totalWithDiscount -= promoDiscount;
        newState.current.promocodeDiscount = promoDiscount;
      }

      // Сертификат — сумма
      if (
        typeof newState.current.certificateDiscount === 'number' && 
        newState.current.certificateDiscount > 0
      ) {
        totalWithDiscount -= newState.current.certificateDiscount;
      }

      newState.current.total = total;
      newState.current.totalWithDiscount = totalWithDiscount + newState.current.deliveryCost;
      newState.current.discount = discount;

      return newState;

    default:
      return state;
  }
}; 