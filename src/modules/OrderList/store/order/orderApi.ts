import axios from "axios";
import { API_CLIENT } from "@/shared/consts"
import { Order } from "@/modules/OrderMenu";
import { loadCartProducts } from "@/modules/CartBody";

const axiosInstance = axios.create(API_CLIENT);

type OrderWithUserId = Order & {userId: string}
export type OrderRecord = Record<string, OrderWithUserId[]>

export const getOrders = async () => {
  try {
    const ordersResponse = await axiosInstance.get(`/orders`)
    const ordersWithCartItem = await Promise.all(
      ordersResponse.data.map(async (order: Order<"DB">): Promise<Order> => {
        const cartItems = await loadCartProducts(order.cartTotals.cartItems)
        return {
          ...order,
          cartTotals: {
            ...order.cartTotals,
            cartItems
          } 
        }
      })
    ) as OrderWithUserId[]

    const groupedOrders = ordersWithCartItem.reduce(
      (acc: Record<string, OrderWithUserId[]>, order: OrderWithUserId) => {
        if (!acc[order.userId]) acc[order.userId] = [];
        acc[order.userId].push(order);
        return acc;
      },
      {}
    );

    return groupedOrders
  } catch (error: any) {
    console.error('error in getOrders', error);
    throw error;
  }
};