import axios from "axios";
import { API_CLIENT } from "@/shared/consts/API_CLIENT"
import { LoginData, User } from "../userTypes";

const axiosInstance = axios.create(API_CLIENT);

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