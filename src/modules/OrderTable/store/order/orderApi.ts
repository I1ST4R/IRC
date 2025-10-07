import axios from "axios";
import { API_CLIENT } from "@/shared/consts"
import { Order } from "@/modules/OrderMenu";
import { loadCartProducts } from "@/modules/CartBody";

const axiosInstance = axios.create(API_CLIENT);

export type FullOrder<T extends "DB" | "default" = "default"> = 
& Order<T> 
& {userId: string} 
& {id: string}

export type OrderRecord = Record<string, FullOrder[]>

export const getOrders = async () => {
  try {
    const ordersResponse = await axiosInstance.get(`/orders`)
    const ordersWithCartItem = await Promise.all(
      ordersResponse.data.map(async (order: FullOrder<"DB">): Promise<Order> => {
        const cartItems = await loadCartProducts(order.cartTotals.cartItems)
        return {
          ...order,
          cartTotals: {
            ...order.cartTotals,
            cartItems
          } 
        }
      })
    ) as FullOrder[]

    const groupedOrders = ordersWithCartItem.reduce(
      (acc: Record<string, FullOrder[]>, order: FullOrder) => {
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