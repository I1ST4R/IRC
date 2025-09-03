import axios from "axios";
import { API_CLIENT } from "@/shared/consts/API_CLIENT"
import { RegisterData, User } from "../userTypes";

const axiosInstance = axios.create(API_CLIENT);

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