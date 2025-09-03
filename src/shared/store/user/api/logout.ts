import { INITIAL_USER } from "./INITIAL_USER";

export const logout = async () => {
  localStorage.removeItem('userId');
  return INITIAL_USER
}