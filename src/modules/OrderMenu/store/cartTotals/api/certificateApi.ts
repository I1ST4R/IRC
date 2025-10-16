import axios from "axios";
import { Certificate } from "../cartTotalsTypes";
import { API_CLIENT } from "@/shared/consts";

export const INITIAL_CERTIFICATE: Certificate = {
  id: null,
  valid: false,
  code: null,
  discount: 0
} as const

const axiosInstance = axios.create(API_CLIENT);

export const getCertificate = async () => {
  const certificateId = localStorage.getItem("certificateId")
  if(!certificateId) return INITIAL_CERTIFICATE
  const response = await axiosInstance.get(`/certificates?id=${certificateId}`)

  if(response.data.length === 0) {
    localStorage.removeItem("certificateId")
    return INITIAL_CERTIFICATE
  }
  
  return {
    id: response.data[0].id,
    valid: !response.data[0].used,
    code: response.data[0].code,
    discount: response.data[0].discount
  } 
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
        discount: response.data[0].discount
      } as Certificate

      localStorage.setItem("certificateId", certificate.id ?? "")
    }
    return certificate;
  } catch (error: any) {
    console.error('error in validateCertificate', error);
    throw error;
  }
};

export const makeCertificateUsed = async (id: string) => {
  try{
    await axiosInstance.patch(`/certificate${id}`, {used: true})
    localStorage.removeItem("certificateId")
  } catch (error: any){
    console.error("error in makeCertificateUsed")
    throw error
  }
}