// features/api.ts
import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export default {
  get: <T>(url: string) => api.get<T>(url),
  post: <T>(url: string, data: any) => api.post<T>(url, data),
  // Можно добавить другие методы по необходимости
};