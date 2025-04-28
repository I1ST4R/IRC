// hooks/useAuth.ts
import { useState } from 'react';
import { api } from '../api.ts';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: { login: string; password: string }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.login(credentials);
      // Сохраняем пользователя в состоянии приложения
      return response.user;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка авторизации');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: { 
    login: string; 
    password: string; 
    confirmPassword: string 
  }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.register(data);
      return response.user;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка регистрации');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { login, register, loading, error };
};