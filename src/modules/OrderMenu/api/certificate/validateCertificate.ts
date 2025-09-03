import axios from "axios";
import { INITIAL_CERTIFICATE } from "./INITIAL_CERTIFICATE"
import { API_CLIENT } from "@/shared/consts/API_CLIENT"

const axiosInstance = axios.create(API_CLIENT);

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