import axios from "axios";
import { API_CLIENT } from "@/shared/consts"
import { Cart, CartItemDb } from "./cartTypes";
import { getProductsById } from "@/_old-version/services/api";
import { getItemsCount } from "./getItemsCount";


const axiosInstance = axios.create(API_CLIENT);

export const initialCart : Cart = {
  items: [],
  itemsCount: 0
} 

export const getCart = async (userId: string, isOnlyCheckedItems: boolean = false) => {
  try {
    const response = await axiosInstance.get(`/users?id=${userId}`);
    if (response.data.length === 0) {
      throw new Error('Пользователь не найден');
    }
    const user = response.data[0];
    if (!user.cart) return initialCart
    const cartItems = await loadCartProducts(user.cart)
    const cartItemsWithCount = {
      items: cartItems, 
      itemsCount: getItemsCount(cartItems)
    } as Cart

    if(isOnlyCheckedItems){
      return{
        ...cartItemsWithCount,
        items: cartItemsWithCount.items.filter((el) => el.isChecked === true),
      } as Cart
    }
    return cartItemsWithCount

  } catch (error: any) {
    console.error('error in getCart', error);
    throw error;
  }
};

export const loadCartProducts = async (cartItems: CartItemDb[]) => {
  try {
    const productIds = cartItems.map(item => item.productId);
    const products = await getProductsById(productIds);
    
    const cartWithProducts = cartItems.map(cartItem => {
      const product = products.find(p => p.id === cartItem.productId);
      if (!product) throw new Error(`Product with id ${cartItem.productId} not found`);
      return {
        product,
        quantity: cartItem.quantity,
        isChecked: cartItem.isChecked
      };
    });

    return cartWithProducts;
  } catch (error) {
    console.error('Error loading cart products:', error);
    throw error;
  }
};

export const addToCart = async (userId: string, productId: string) => {
  try {
    const response = await axiosInstance.get(`/users?id=${userId}`);
    if (response.data.length === 0) throw new Error('Пользователь не найден');
    const user = response.data[0];
    const cart = user.cart || [];
    
    const existingItem = cart.find((item: CartItemDb) => item.productId === productId);
    if (existingItem) existingItem.quantity += 1;
    else cart.push({ productId, quantity: 1, isChecked: true })
    
    const updateResponse = await axiosInstance.patch(`/users/${user.id}`, { cart })
    const cartItems = await loadCartProducts(updateResponse.data.cart)

    const cartItemsWithCount = {
      items: cartItems, 
      itemsCount: getItemsCount(cartItems)
    } as Cart

    return cartItemsWithCount
  } catch (error: any) {
    console.error('error in addToCart', error);
    throw error;
  }
};

export const removeFromCart = async (userId: string, productId: string) => {
  try {
    const response = await axiosInstance.get(`/users?id=${userId}`);
    if (response.data.length === 0) {
      throw new Error('Пользователь не найден');
    }
    const user = response.data[0];
    const cart = (user.cart || []).filter((item: CartItemDb) => item.productId !== productId);
    
    const updateResponse = await axiosInstance.patch(`/users/${user.id}`, { cart });
    const cartItems = await loadCartProducts(updateResponse.data.cart)

    const cartItemsWithCount = {
      items: cartItems, 
      itemsCount: getItemsCount(updateResponse.data.cart)
    } as Cart

    return cartItemsWithCount
  } catch (error: any) {
    console.error('error in removeFromCart', error);
    throw error;
  }
};

export const updateCartItemQuantity = async (userId: string, productId: string, quantity: number) => {
  try {
    const response = await axiosInstance.get(`/users?id=${userId}`);
    if (response.data.length === 0) {
      throw new Error('Пользователь не найден');
    }
    const user = response.data[0];
    const cart = user.cart || [];
    
    const item = cart.find((item: CartItemDb) => item.productId === productId);
    if (item) item.quantity = quantity

    const updateResponse = await axiosInstance.patch(`/users/${user.id}`, { cart });
    const cartItems = await loadCartProducts(updateResponse.data.cart)

    const cartItemsWithCount = {
      items: cartItems, 
      itemsCount: getItemsCount(cartItems)
    } as Cart

    return cartItemsWithCount
  } catch (error: any) {
    console.error('error in updateCartItemQuantity', error);
    throw error;
  }
};

export const changeCheckCartItem = async (userId: string, productId: string) => {
  try {
    const response = await axiosInstance.get(`/users?id=${userId}`)
    if (response.data.length === 0) {
      throw new Error('Пользователь не найден');
    }
    const user = response.data[0];
    const cart = user.cart || [];
    const updatedCartDb = cart.map((item: CartItemDb) => {
      if (item.productId === productId) {
        return { 
          ...item, 
          isChecked: !item.isChecked
        };
      }
      return item;
    });

    const updateResponse = await axiosInstance.patch(`/users/${userId}`, { cart: updatedCartDb });
    const cartItems = await loadCartProducts(updateResponse.data.cart)

    const cartItemsWithCount = {
      items: cartItems, 
      itemsCount: getItemsCount(cartItems)
    } as Cart

    return cartItemsWithCount
  } catch (error) {
    console.error('error in checkCartItem', error);
    throw error;
  }
};

export const clearCart = async (userId: string) => {
  try {
    const response = await axiosInstance.get(`/users?id=${userId}`);
    if (response.data.length === 0) {
      throw new Error('Пользователь не найден');
    }
    const user = response.data[0];
    
    await axiosInstance.patch(`/users/${user.id}`, { cart: [] });
    
    return initialCart
  } catch (error: any) {
    console.error('error in clearCart', error);
    throw error;
  }
};