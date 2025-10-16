import axios from "axios";
import { Promo } from "../cartTotalsTypes";
import { API_CLIENT } from "@/shared/consts";

const axiosInstance = axios.create(API_CLIENT);

export const INITIAL_PROMO : Promo = {
  id: null, 
  valid: false,
  code: null,
  discount: 0,
  percent: 0 
} as const

export const getPromo = async () => {
  const promoId = localStorage.getItem("promoId")
  if(!promoId) return INITIAL_PROMO
  const response = await axiosInstance.get(`/promo?id=${promoId}`)
  if(response.data.length === 0) {
    localStorage.removeItem("promoId")
    return INITIAL_PROMO
  }
  return {
    id: response.data[0].id,
    valid: !response.data[0].used,
    code: response.data[0].code,
    discount: 0,
    percent: response.data[0].discount,
  } 
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
        discount: 0,
        percent: response.data[0].discount,
      } 

      localStorage.setItem("promoId", promo.id ?? "")
    }
    return promo;
  } catch (error: any) {
    console.error('error in validatePromo', error);
    throw error;
  }
};

export const makePromocodeUsed = async (id: string) => {
  try {
    await axiosInstance.patch(`/promo/${id}`, { used: true });
    localStorage.removeItem("promoId");
  } catch (error: any) {
    console.error('error in makePromocodeUsed', error);
    throw error;
  }
};

