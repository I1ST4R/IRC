import axios from 'axios';

const API_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export interface FilterParams {
  minPrice?: number;
  maxPrice?: number;
  lines?: string[];
  categories?: string[];
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export const getCategories = async () => {
  const response = await api.get('/productCategories');
  return response.data;
};

export const getProducts = async (params?: FilterParams) => {
  const response = await api.get('/products', { params });
  return response.data;
};

export const getCart = async (userId: string) => {
  try {
    console.log('Getting cart for user:', userId);
    const response = await api.get(`/users/${userId}`);
    console.log('Cart data:', response.data.cart);
    if (!response.data.cart) {
      // Если корзины нет, создаем пустую
      await api.patch(`/users/${userId}`, { cart: [] });
      return [];
    }
    return response.data.cart;
  } catch (error) {
    console.error('Error getting cart:', error);
    throw error;
  }
};

export const addToCart = async (userId: string, productId: string) => {
  try {
    const user = await api.get(`/users/${userId}`);
    const cart = user.data.cart || [];
    
    const existingItem = cart.find((item: CartItem) => item.productId === productId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ productId, quantity: 1 });
    }
    
    const response = await api.patch(`/users/${userId}`, { cart });
    return response.data.cart;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

export const removeFromCart = async (userId: string, productId: string) => {
  try {
    const user = await api.get(`/users/${userId}`);
    const cart = (user.data.cart || []).filter((item: CartItem) => item.productId !== productId);
    
    const response = await api.patch(`/users/${userId}`, { cart });
    return response.data.cart;
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw error;
  }
};

export const updateCartItemQuantity = async (userId: string, productId: string, quantity: number) => {
  try {
    const user = await api.get(`/users/${userId}`);
    const cart = user.data.cart || [];
    
    const item = cart.find((item: CartItem) => item.productId === productId);
    if (item) {
      item.quantity = quantity;
    }
    
    const response = await api.patch(`/users/${userId}`, { cart });
    return response.data.cart;
  } catch (error) {
    console.error('Error updating cart quantity:', error);
    throw error;
  }
};

export default api; 