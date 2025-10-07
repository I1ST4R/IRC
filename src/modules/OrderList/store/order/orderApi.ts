import axios from "axios";
import { API_CLIENT } from "@/shared/consts"
import { Order } from "@/modules/OrderMenu";
import { loadCartProducts } from "@/modules/CartBody";

const axiosInstance = axios.create(API_CLIENT);

export const getOrders = async () => {
  try {
    const response = await axiosInstance.get(`/orders`)
    const ordersWithCartItem = await Promise.all(
      response.data.map(async (order: Order<"DB">): Promise<Order> => {
        const cartItems = await loadCartProducts(order.cartTotals.cartItems)
        return {
          ...order,
          cartTotals: {
            ...order.cartTotals,
            cartItems
          } 
        }
      })
    ) as Order[]
    return ordersWithCartItem
  } catch (error: any) {
    console.error('error in getOrders', error);
    throw error;
  }
};