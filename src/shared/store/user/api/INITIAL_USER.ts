import { User } from "../userTypes";

export const INITIAL_USER: User = {
  id: localStorage.getItem('userId'),
  login: null,
  email: null,
  password: null,
  type: null,
  cart: [],
  liked: [],
  orders: []
};