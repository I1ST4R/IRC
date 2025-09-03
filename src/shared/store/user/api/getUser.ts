import axios from "axios";
import { API_CLIENT } from "@/shared/consts/API_CLIENT"
import { User } from "../userTypes";
import { INITIAL_USER } from "./INITIAL_USER";

const axiosInstance = axios.create(API_CLIENT);

export const getUser = async () => {
  const userId = localStorage.getItem("userId")
  if(!userId) return INITIAL_USER
  const response = await axiosInstance.get<User[]>(`/users?id=${userId}`);

  if( response.data.length === 0){
    localStorage.removeItem("userId")
    return INITIAL_USER
  } 

  return response.data[0]
}