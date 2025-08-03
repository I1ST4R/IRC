import { UserActionTypes } from './types';
import { login as apiLogin, register as apiRegister, checkAuth as apiCheckAuth } from '../../services/api';
import { User, LoginData, RegisterData } from './types';

// Action creators
const loginRequest = () => ({ 
  type: UserActionTypes.LOGIN_REQUEST as const 
});

const loginSuccess = (user: User) => ({
  type: UserActionTypes.LOGIN_SUCCESS as const,
  payload: user
});

const loginFailure = (error: string) => ({
  type: UserActionTypes.LOGIN_FAILURE as const,
  payload: error
});

const registerRequest = () => ({ 
  type: UserActionTypes.REGISTER_REQUEST as const 
});

const registerSuccess = (user: User) => ({
  type: UserActionTypes.REGISTER_SUCCESS as const,
  payload: user
});

const registerFailure = (error: string) => ({
  type: UserActionTypes.REGISTER_FAILURE as const,
  payload: error
});

const checkAuthRequest = () => ({ 
  type: UserActionTypes.CHECK_AUTH_REQUEST as const 
});

const checkAuthSuccess = (user: User) => ({
  type: UserActionTypes.CHECK_AUTH_SUCCESS as const,
  payload: user
});

const checkAuthFailure = (error: string) => ({
  type: UserActionTypes.CHECK_AUTH_FAILURE as const,
  payload: error
});

export const logout = () => ({
  type: UserActionTypes.LOGOUT as const
});

export const clearError = () => ({
  type: UserActionTypes.CLEAR_ERROR as const
});

export const openAccount = () => ({
  type: UserActionTypes.OPEN_ACCOUNT as const
});

export const closeAccount = () => ({
  type: UserActionTypes.CLOSE_ACCOUNT as const
});

// Thunk actions
export const login = (data: LoginData) => {
  return async (dispatch: any) => {
    dispatch(loginRequest());
    try {
      const user = await apiLogin(data);
      if (user && user.id) {
        localStorage.setItem('userId', String(user.id));
      }
      dispatch(loginSuccess(user));
    } catch (error) {
      dispatch(loginFailure(error instanceof Error ? error.message : 'Unknown error'));
    }
  };
};

export const register = (data: RegisterData) => {
  return async (dispatch: any) => {
    dispatch(registerRequest());
    try {
      const user = await apiRegister(data);
      if (user && user.id) {
        localStorage.setItem('userId', String(user.id));
      }
      dispatch(registerSuccess(user));
    } catch (error) {
      dispatch(registerFailure(error instanceof Error ? error.message : 'Unknown error'));
    }
  };
};

export const checkAuth = () => {
  return async (dispatch: any) => {
    dispatch(checkAuthRequest());
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        dispatch(checkAuthFailure('No user ID found'));
        return;
      }
      const user = await apiCheckAuth(userId);
      dispatch(checkAuthSuccess(user));
    } catch (error) {
      localStorage.removeItem('userId');
      dispatch(checkAuthFailure(error instanceof Error ? error.message : 'Unknown error'));
    }
  };
}; 