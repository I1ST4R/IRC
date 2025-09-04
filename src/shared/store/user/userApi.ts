import axios from "axios";
import { API_CLIENT } from "@/shared/consts"
import { LoginData, RegisterData, User } from "./userTypes";


const axiosInstance = axios.create(API_CLIENT);

export const INITIAL_USER: User = {
  id: localStorage.getItem('userId'),
  login: null,
  email: null,
  password: null,
  type: null,
  cart: [],
  liked: [],
  orders: []
};

// const checkAuth = async (userId: string) => {
//   try {
//     const response = await axiosInstance.get<User[]>(`/users?id=${userId}`);
//     if (response.data.length === 0) {
//       throw new Error('Пользователь не найден');
//     }
//     const user = response.data[0];
//     const { password, ...userWithoutPassword } = user;
//     return userWithoutPassword as User;
//   } catch (error: any) {
//     console.error('error in checkAuth', error);
//     throw error;
//   }
// };

export const getUser = async () => {
  const userId = localStorage.getItem("userId")
  if(!userId) return INITIAL_USER
  const response = await axiosInstance.get<User[]>(`/users?id=${userId}`);

  if( response.data.length === 0){
    localStorage.removeItem("userId")
    return INITIAL_USER
  } 

  return response.data[0]
}

export const login = async (data: LoginData) => {
  try {
    const response = await axiosInstance.get<User[]>('/users');
    const users = Object.values(response.data);
    const user = users.find(u => u.login === data.login);

    if (!user) throw new Error('Пользователь не найден');
    
    if (user.password !== data.password) throw new Error('Неверный пароль');
    if( user.id ) localStorage.setItem('userId', user.id)
    return user as User;
  } catch (error: any) {
    console.error('error in login', error);
    throw error;
  }
};

export const logout = async () => {
  localStorage.removeItem('userId');
  return INITIAL_USER
}

export const register = async (data: RegisterData) => {
  try {
    const existingByLogin = await axiosInstance.get<User[]>(`/users?login=${data.login}`);
    if (existingByLogin.data.length > 0) {
      throw new Error('Такой логин уже существует');
    }
    const existingByEmail = await axiosInstance.get<User[]>(`/users?email=${data.email}`);
    if (existingByEmail.data.length > 0) {
      throw new Error('Такой email уже существует');
    }

    const userData = { ...data, type: "client" };

    const response = await axiosInstance.post<User>('/users', userData);
    if(response.data.id) localStorage.setItem('userId', response.data.id)
    const { password, ...userWithoutPassword } = response.data;
    return userWithoutPassword as User;
  } catch (error: any) {
    console.error('error in register', error);
    throw error;
  }
};