import axios from 'axios';
import {FilterParams} from './types'
import {CartItem} from './types'

const API_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

//Products
export const getProducts = async (page: number, params?: FilterParams) => {
  const response = await api.get('/products');
  let filteredProducts = response.data;

  console.log('Filter params:', params);
  console.log('Initial products count:', filteredProducts.length);

  // Фильтрация по цене
  const minPrice = params?.minPrice;
  const maxPrice = params?.maxPrice;

  if (minPrice !== undefined) {
    filteredProducts = filteredProducts.filter((product: any) => product.price >= minPrice);
    console.log('After minPrice filter:', filteredProducts.length);
  }
  if (maxPrice !== undefined) {
    filteredProducts = filteredProducts.filter((product: any) => product.price <= maxPrice);
    console.log('After maxPrice filter:', filteredProducts.length);
  }

  // Фильтрация по тегам
  if (params?.tags && params.tags.length > 0) {
    console.log('Filtering by tags:', params.tags);
    
    // Группируем теги по категориям
    const tagsByCategory = params.tags.reduce((acc: { [key: string]: string[] }, tagString) => {
      const [categoryId] = tagString.split(',');
      if (!acc[categoryId]) {
        acc[categoryId] = [];
      }
      acc[categoryId].push(tagString);
      return acc;
    }, {});

    console.log('Tags grouped by category:', tagsByCategory);

    filteredProducts = filteredProducts.filter((product: any) => {
      // Проверяем, что продукт соответствует всем категориям (AND между категориями)
      return Object.entries(tagsByCategory).every(([categoryId, categoryTags]) => {
        // Проверяем, что продукт имеет хотя бы один тег из текущей категории (OR внутри категории)
        return categoryTags.some(selectedTag => 
          product.tags.some((productTag: string) => productTag === selectedTag)
        );
      });
    });

    console.log('After tags filter:', filteredProducts.length);
  }

  // Пагинация
  const paginatedProducts = filteredProducts.slice(0, page * 10);
  const hasMore = filteredProducts.length > page * 10;

  return {
    products: paginatedProducts,
    hasMore: hasMore 
  };
};

export const getProductById = async (productId?: string) => {
  const response = await api.get(`/products/${ productId }`);
  return response.data;
};

//Categories
export const getCategories = async () => {
  const response = await api.get('/productCategories');
  return response.data;
};

//Cart
export const getCart = async (userId: string) => {
  try {
    const response = await api.get(`/users/${userId}`);
    if (!response.data.cart) {
      await api.patch(`/users/${userId}`, { cart: [] });
      return [];
    }
    return response.data.cart;
  } catch (error) {
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