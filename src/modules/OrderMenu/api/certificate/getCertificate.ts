import axios from "axios";
import { Certificate } from "../../store/certificate/types"
import { INITIAL_CERTIFICATE } from "./INITIAL_CERTIFICATE"
import { API_CLIENT } from "@/shared/consts/API_CLIENT"

const axiosInstance = axios.create(API_CLIENT);

export const getCertificate = async () => {
  const certificateId = localStorage.getItem("certificateId")
  if(!certificateId) return INITIAL_CERTIFICATE
  const response = await axiosInstance.get<Certificate[]>(`/certificates?id=${certificateId}`)

  if(response.data.length === 0) {
    localStorage.removeItem("certificateId")
    return INITIAL_CERTIFICATE
  }

  return response.data[0]
}