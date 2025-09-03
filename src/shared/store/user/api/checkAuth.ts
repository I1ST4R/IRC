import axios from "axios";
import { API_CLIENT } from "@/shared/consts/API_CLIENT"
import { RegisterData, User } from "../userTypes";

const axiosInstance = axios.create(API_CLIENT);

const checkAuth = async (userId: string) => {
  try {
    const response = await axiosInstance.get<User[]>(`/users?id=${userId}`);
    if (response.data.length === 0) {
      throw new Error('Пользователь не найден');
    }
    const user = response.data[0];
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword as User;
  } catch (error: any) {
    console.error('error in checkAuth', error);
    throw error;
  }
};