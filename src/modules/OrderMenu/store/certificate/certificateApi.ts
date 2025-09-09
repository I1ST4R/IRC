import axios from "axios";
import { Certificate } from "./certificateTypes";
import { API_CLIENT } from "@/shared/consts";

const INITIAL_CERTIFICATE: Certificate = {
  id: null,
  valid: false,
  code: null,
  amount: null
}

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

export const validateCertificate = async (code: string) => {
  try {
    const upperCode = code.toUpperCase();
    const response = await axiosInstance.get(`/certificates?code=${upperCode}`);
    let certificate = INITIAL_CERTIFICATE
    if (response.data && response.data.length > 0 && !response.data[0].used) {
      certificate = {
        id: response.data[0].id,
        valid: true,
        code: response.data[0].code,
        amount: response.data[0].amount
      };
      localStorage.setItem("certificateId", certificate.id ?? "")
      return certificate;
    }
    return certificate;
  } catch (error: any) {
    console.error('error in validateCertificate', error);
    throw error;
  }
};