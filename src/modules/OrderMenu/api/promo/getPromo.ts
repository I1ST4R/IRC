import axios from "axios";
import { INITIAL_PROMO } from "./INITIAL_PROMO"
import { API_CLIENT } from "@/shared/consts/API_CLIENT"
import { Promo } from "../../store/promo/types";

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