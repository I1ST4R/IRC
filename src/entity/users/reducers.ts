import { UserActionTypes } from './types';
import { UserState, UserActions } from './types';

const initialState: UserState = {
  id: null,
  login: null,
  email: null,
  password: null,
  type: null,
  cart: [],
  liked: [],
  isAccountOpen: false,
  loading: 'idle',
  error: null
};

export const userReducer = (
  state = initialState,
  action: UserActions
): UserState => {
  switch (action.type) {
    // Вход в систему
    case UserActionTypes.LOGIN_REQUEST:
      return {
        ...state,
        loading: 'pending',
        error: null
      };
    case UserActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loading: 'succeeded',
        id: String(action.payload.id),
        login: action.payload.login,
        email: action.payload.email,
        password: action.payload.password,
        type: action.payload.type,
        error: null
      };
    case UserActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        loading: 'failed',
        error: action.payload
      };

    // Регистрация
    case UserActionTypes.REGISTER_REQUEST:
      return {
        ...state,
        loading: 'pending',
        error: null
      };
    case UserActionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        loading: 'succeeded',
        id: String(action.payload.id),
        login: action.payload.login,
        email: action.payload.email,
        password: action.payload.password,
        type: action.payload.type,
        error: null
      };
    case UserActionTypes.REGISTER_FAILURE:
      return {
        ...state,
        loading: 'failed',
        error: action.payload
      };

    // Проверка авторизации
    case UserActionTypes.CHECK_AUTH_REQUEST:
      return {
        ...state,
        loading: 'pending',
        error: null
      };
    case UserActionTypes.CHECK_AUTH_SUCCESS:
      return {
        ...state,
        loading: 'succeeded',
        id: String(action.payload.id),
        login: action.payload.login,
        email: action.payload.email,
        type: action.payload.type,
        error: null
      };
    case UserActionTypes.CHECK_AUTH_FAILURE:
      return {
        ...state,
        loading: 'failed',
        error: action.payload
      };

    // Выход из системы
    case UserActionTypes.LOGOUT:
      localStorage.removeItem('userId');
      return {
        ...state,
        id: null,
        login: null,
        email: null,
        password: null,
        type: null,
        cart: [],
        liked: [],
        error: null
      };

    // Очистка ошибки
    case UserActionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };

    // Открытие/закрытие аккаунта
    case UserActionTypes.OPEN_ACCOUNT:
      return {
        ...state,
        isAccountOpen: true
      };

    case UserActionTypes.CLOSE_ACCOUNT:
      return {
        ...state,
        isAccountOpen: false
      };

    default:
      return state;
  }
}; 