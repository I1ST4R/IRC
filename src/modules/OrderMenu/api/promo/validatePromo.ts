import axios from "axios";
import { INITIAL_PROMO } from "./INITIAL_PROMO"
import { API_CLIENT } from "@/shared/consts/API_CLIENT"

const axiosInstance = axios.create(API_CLIENT);

export const validatePromo = async (code: string) => {
  try {
    const upperCode = code.toUpperCase();
    
    const response = await axiosInstance.get(`/promo?code=${upperCode}`);
    let promo = INITIAL_PROMO
    if (response.data && response.data.length > 0 && !response.data[0].used) {
      promo = {
        id: response.data[0].id,
        valid: true, 
        code: response.data[0].code, 
        discount: response.data[0].discount 
      } 
      localStorage.setItem("promoId", promo.id ?? "")
      return promo
    }
    return promo;
  } catch (error: any) {
    console.error('error in validatePromo', error);
    throw error;
  }
};