import axios from "axios";
import { API_CLIENT } from "@/shared/consts"
import { LikedItemDb } from "./likedTypes";
import { getProductById, ProductT } from "@/modules/ProductList";


const axiosInstance = axios.create(API_CLIENT);

export const getLiked = async (userId: string) => {
  try {
    const response = await axiosInstance.get(`/users?id=${userId}`);
    if (response.data.length === 0) {
      throw new Error('Пользователь не найден');
    }
    const user = response.data[0];
    if (!user.liked) {
      await axiosInstance.patch(`/users/${user.id}`, { liked: [] });
      return [];
    }
    const products = await loadProducts(user.liked)
    return products 
  } catch (error: any) {
    console.error('error in getLiked', error);
    throw error;
  }
};

const loadProducts = (liked: LikedItemDb[]) => {
  try{
    const productIds = liked.map((item: LikedItemDb) => item.productId);
    const products = Promise.all(
      productIds.map((el) => getProductById(el))
    )
    return products
  } catch (error: any){
    throw error
  }
}

export const addToLiked = async (userId: string, productId: string) => {
  try {
    const response = await axiosInstance.get(`/users?id=${userId}`);
    if (response.data.length === 0) {
      throw new Error('Пользователь не найден');
    }
    const user = response.data[0];
    const liked = user.liked || [];
    
    const existingItem = liked.find((item: LikedItemDb) => item.productId === productId);
    if (!existingItem) liked.push({ productId })
    
    const updateResponse = await axiosInstance.patch(`/users/${user.id}`, { liked });
    return updateResponse.data.liked as ProductT[]
  } catch (error: any) {
    console.error('error in addToLiked', error);
    throw error;
  }
};

export const removeFromLiked = async (userId: string, productId: string) => {
  try {
    const response = await axiosInstance.get(`/users?id=${userId}`);
    if (response.data.length === 0) {
      throw new Error('Пользователь не найден');
    }
    const user = response.data[0];
    const liked = (user.liked || []).filter((item: LikedItemDb) => item.productId !== productId);
    
    const updateResponse = await axiosInstance.patch(`/users/${user.id}`, { liked });
    return updateResponse.data.liked as ProductT[];
  } catch (error: any) {
    console.error('error in removeFromLiked', error);
    throw error;
  }
};