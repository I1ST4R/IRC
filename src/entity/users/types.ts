export interface User {
  id: number | string;
  type: 'admin' | 'client' | 'user';
  login: string;
  password: string;
  email: string;
  name?: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
  liked?: { productId: string }[];
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