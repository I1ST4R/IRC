// hooks/useAuth.ts
import { useDispatch, useSelector } from 'react-redux';
import { login, register, logout, fetchCurrentUser, clearUserError } from '../users/users.slice';
import { RootState, AppDispatch } from '../store';
import { LoginData, RegisterData } from '../users/types';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentUser, loading, error } = useSelector((state: RootState) => state.user);

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

  const handleFetchCurrentUser = async () => {
    const result = await dispatch(fetchCurrentUser());
    return result;
  };

  const clearError = () => {
    dispatch(clearUserError());
  };

  return {
    currentUser,
    loading,
    error,
    handleLogin,
    handleRegister,
    handleLogout,
    handleFetchCurrentUser,
    clearError,
  };
};