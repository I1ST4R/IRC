import axios from "axios";
import { Promo } from "./promoTypes";
import { API_CLIENT } from "@/shared/consts";

export const INITIAL_PROMO : Promo = {
  id: null,
  valid: false,
  code: null,
  discount: null 
}

const axiosInstance = axios.create(API_CLIENT);

export const getPromo = async () => {
  const promoId = localStorage.getItem("promoId")
  if(!promoId) return INITIAL_PROMO
  const response = await axiosInstance.get<Promo[]>(`/promo?id=${promoId}`)
  if(response.data.length === 0) {
    localStorage.removeItem("promoId")
    return INITIAL_PROMO
  }

  return response.data[0]
}

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

