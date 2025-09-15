import axios from "axios";
import { API_CLIENT } from "@/shared/consts";
import { Order, OrderDb, OrderDbAdd } from "./orderTypes";
import { CartItem, loadCartProducts } from "@/modules/CartBody/index";

const axiosInstance = axios.create(API_CLIENT);

export const changeUsedPromo = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/promo?id=${id}`);
    if (response.data && response.data.length > 0) {
      await axiosInstance.patch(`/promo/${id}`, { used: true });
      localStorage.removeItem("promoId")
    }
  } catch (error: any) {
    console.error('error in changeUsedPromo', error);
    throw error;
  }
}
// Certificate
export const changeUsedCertificate = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/certificates?id=${id}`);
    if (response.data && response.data.length > 0) {
      localStorage.removeItem("certificateId")
      await axiosInstance.patch(`/certificates/${id}`, { used: true });
    }
  } catch (error: any) {
    console.error('error in changeUsedCertificate', error);
    throw error;
  }
}

// Orders
export const addOrder = async (order: Order ) => {
  try {
    const responseUser = await axiosInstance.get(`/users?id=${order.userId}`);
    if (responseUser.data.length === 0) {
      throw new Error('Пользователь не найден');
    }
    const user = responseUser.data[0];
    const cartItemsDb = order.cartItems.map((cartItem : CartItem) => {
      return {
        productId: cartItem.product.id,
        isChecked: cartItem.isChecked,
        quantity: cartItem.quantity
      }
    })
    //use OrderDbAdd because json.server make unique id by himself
    const newOrder: OrderDbAdd = {
      userId: order.userId,
      cartItems: cartItemsDb,
      total: order.total,
      totalWithDiscount: order.totalWithDiscount,
      discount: order.discount,
      promocodeDiscount: order.promocodeDiscount,
      promocodePercent: order.promocodePercent,
      promocodeId: order.promocodeId, 
      certificateDiscount: order.certificateDiscount,
      deliveryCost: order.deliveryCost,
      certificateId: order.certificateId,
      recipient: order.recipient,
    }
    //make response that create order in orders/
    const responseOrder = await axiosInstance.post('/orders', newOrder);
    const createdOrderId  = responseOrder.data.id;

    //make response that create order in users/{userId}/orders
    //save id order only
    const updatedOrders = Array.isArray(user.orders) ? [...user.orders, createdOrderId] : [createdOrderId];
    await axiosInstance.patch(`/users/${user.id}`, { orders: updatedOrders });

    //change field used for promo + sertificate if exist
    if(order.promocodeId) await changeUsedPromo(order.promocodeId)
    if(order.certificateId) await changeUsedCertificate(order.certificateId)

    return responseOrder.data;
  } catch (error: any) {
    console.error('error in addOrder', error);
    throw error;
  }
};

export const getOrdersByUserId = async (userId: string) => {
  try {
    const responseUser = await axiosInstance.get(`/users/${userId}`);
    if (responseUser.data.length === 0) {
      throw new Error('Пользователь не найден');
    }
    const userOrdersId = responseUser.data[0].orders
    if (!userOrdersId || userOrdersId.length === 0 ){
      return [];
    } 
    const orders = await getOrders()
    const userOrders = orders.filter((order: OrderDb)=>
      userOrdersId.includes(order.id)
    )
    return userOrders
  } catch (error: any) {
    console.error('error in getOrdersByUserId', error);
    throw error;
  }
};

export const getOrders = async () => {
  try {
    const response = await axiosInstance.get(`/orders`)
    const ordersWithCartItem = await Promise.all(
      response.data.map(async (order: OrderDb) => {
        const cartItems = await loadCartProducts(order.cartItems)
        return {
          ...order,
          cartItems: cartItems
        };
      })
    )
    return ordersWithCartItem
  } catch (error: any) {
    console.error('error in getOrders', error);
    throw error;
  }
};
