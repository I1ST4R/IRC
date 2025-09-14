import axios from "axios";
import { API_CLIENT } from "@/shared/consts";

const axiosInstance = axios.create(API_CLIENT);

export const getCategories = async () => {
  try{
    const response = await axiosInstance.get('/productCategories');
    return response.data;
  } catch (error: any) {
    console.error('error in getCategories', error);
    throw error;
  }
};