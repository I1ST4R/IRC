import axios from "axios";
import { API_CLIENT } from "@/shared/consts";
import { Order } from "../cartTotalsTypes";

const axiosInstance = axios.create(API_CLIENT);

export const addOrder = async (order: Order, userId: string) => {
  try {
    const responseUser = await axiosInstance.get(`/users?id=${userId}`);
    if (responseUser.data.length === 0) {
      throw new Error("Пользователь не найден");
    }
    const user = responseUser.data[0];
    const newOrder: Order & { userId: string } = {
      userId: userId,
      cartTotals: order.cartTotals,
      recipient: order.recipient,
    };
    //make response that create order in orders/
    const responseOrder = await axiosInstance.post("/orders", newOrder);
    const createdOrderId = responseOrder.data.id;

    

    //make response that create order in users/{userId}/orders
    //save id order only
    const updatedOrders = Array.isArray(user.orders)
      ? [...user.orders, createdOrderId]
      : [createdOrderId];
    await axiosInstance.patch(`/users/${user.id}`, { orders: updatedOrders });

    return responseOrder.data;
  } catch (error: any) {
    console.error("error in addOrder", error);
    throw error;
  }
};
