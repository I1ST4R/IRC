// hooks/useAuth.ts
import { useDispatch, useSelector } from 'react-redux';
import { login, register, logout, checkAuth, clearError } from '../entity/users/users.slice';
import { RootState, AppDispatch } from '../entity/products/types';
import { LoginData, RegisterData } from '../entity/users/types';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, error } = useSelector((state: RootState) => state.user);

  const handleLogin = async (loginData: LoginData) => {
    const result = await dispatch(login(loginData));
    return result;
  };

  const handleRegister = async (registerData: RegisterData) => {
    const result = await dispatch(register(registerData));
    return result;
  };

  const handleLogout = async () => {
    const result = await dispatch(logout());
    return result;
  };

  const handleCheckAuth = async () => {
    const result = await dispatch(checkAuth());
    return result;
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

  return {
    user,
    loading,
    error,
    handleLogin,
    handleRegister,
    handleLogout,
    handleCheckAuth,
    handleClearError,
  };
};