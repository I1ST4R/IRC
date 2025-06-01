import axios from 'axios';
import {FilterParams} from './types'
import {CartItem} from './types'
import {LikedItem} from './types'
import { recipientInterface } from './types';
import { User, LoginData, RegisterData } from '@/entity/users/types';

const API_URL = 'http://localhost:3001';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Auth
export const login = async (data: LoginData) => {
  try {
    const response = await axiosInstance.get<User[]>('/users');
    const users = Object.values(response.data);
    const user = users.find(u => u.login === data.login);
    
    if (!user) {
      throw new Error('Пользователь не найден');
    }
    
    if (user.password !== data.password) {
      throw new Error('Неверный пароль');
    }
    
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword as User;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
};

export const register = async (data: RegisterData) => {
  try {
    const existingByLogin = await axiosInstance.get<User[]>(`/users?login=${data.login}`);
    if (existingByLogin.data.length > 0) {
      throw new Error('Такой логин уже существует');
    }
    const existingByEmail = await axiosInstance.get<User[]>(`/users?email=${data.email}`);
    if (existingByEmail.data.length > 0) {
      throw new Error('Такой email уже существует');
    }

    const response = await axiosInstance.post<User>('/users', data);
    const { password, ...userWithoutPassword } = response.data;
    return userWithoutPassword as User;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
};

export const checkAuth = async (userId: string) => {
  try {
    const response = await axiosInstance.get<User[]>(`/users?id=${userId}`);
    if (response.data.length === 0) {
      throw new Error('Пользователь не найден');
    }
    const user = response.data[0];
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword as User;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
};

// Products
export const getProducts = async (page: number, params?: FilterParams) => {
  const response = await axiosInstance.get('/products');
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
  const response = await axiosInstance.get(`/products/${productId}`);
  return response.data;
};

// Categories
export const getCategories = async () => {
  const response = await axiosInstance.get('/productCategories');
  return response.data;
};

// Cart
export const getCart = async (userId: string) => {
  try {
    const response = await axiosInstance.get(`/users?id=${userId}`);
    if (response.data.length === 0) {
      throw new Error('Пользователь не найден');
    }
    const user = response.data[0];
    if (!user.cart) {
      const updateResponse = await axiosInstance.patch(`/users/${user.id}`, { cart: [] });
      return updateResponse.data.cart;
    }
    return user.cart;
  } catch (error: any) {
    console.error('Error in getCart:', error);
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
};

export const addToCart = async (userId: string, productId: string) => {
  try {
    const response = await axiosInstance.get(`/users?id=${userId}`);
    if (response.data.length === 0) {
      throw new Error('Пользователь не найден');
    }
    const user = response.data[0];
    const cart = user.cart || [];
    
    const existingItem = cart.find((item: CartItem) => item.productId === productId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ productId, quantity: 1 });
    }
    
    const updateResponse = await axiosInstance.patch(`/users/${user.id}`, { cart });
    return updateResponse.data.cart;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
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
    const cart = (user.cart || []).filter((item: CartItem) => item.productId !== productId);
    
    const updateResponse = await axiosInstance.patch(`/users/${user.id}`, { cart });
    return updateResponse.data.cart;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
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
    
    const item = cart.find((item: CartItem) => item.productId === productId);
    if (item) {
      item.quantity = quantity;
    }
    
    const updateResponse = await axiosInstance.patch(`/users/${user.id}`, { cart });
    return updateResponse.data.cart;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
};

// Liked
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
    return user.liked;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
};

export const addToLiked = async (userId: string, productId: string) => {
  try {
    const response = await axiosInstance.get(`/users?id=${userId}`);
    if (response.data.length === 0) {
      throw new Error('Пользователь не найден');
    }
    const user = response.data[0];
    const liked = user.liked || [];
    
    const existingItem = liked.find((item: LikedItem) => item.productId === productId);
    if (!existingItem) {
      liked.push({ productId });
    }
    
    const updateResponse = await axiosInstance.patch(`/users/${user.id}`, { liked });
    return updateResponse.data.liked;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
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
    const liked = (user.liked || []).filter((item: LikedItem) => item.productId !== productId);
    
    const updateResponse = await axiosInstance.patch(`/users/${user.id}`, { liked });
    return updateResponse.data.liked;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
};

// Promo
export const validatePromo = async (code: string) => {
  try {
    const response = await axiosInstance.get(`/promo?code=${code}`);
    if (response.data && response.data.length > 0) {
      return { valid: true, code: response.data[0].code, discount: response.data[0].discount };
    }
    return { valid: false };
  } catch (error) {
    console.error('Error validating promo:', error);
    throw error;
  }
};

// Certificates
export const validateCertificate = async (code: string) => {
  try {
    const response = await axiosInstance.get(`/certificates?code=${code}`);
    if (response.data && response.data.length > 0) {
      return { valid: true, code: response.data[0].code, amount: response.data[0].amount };
    }
    return { valid: false };
  } catch (error) {
    console.error('Error validating certificate:', error);
    throw error;
  }
};

// Orders
export const addOrder = async (userId: string, recipient: recipientInterface) => {
  try {
    const user = await axiosInstance.get(`/users/${userId}`);
    const cart = user.data.cart || [];
    
    const newOrder = {
      userId,
      recipient,
      cart,
      createDate: new Date().toISOString(),
      status: 'new'
    }
    
    const response = await axiosInstance.post('/orders', newOrder);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const getOrder = async (userId: string) => {
  try {
    const responseUser = await axiosInstance.get(`/users?id=${userId}`);
    if (responseUser.data.length === 0) {
      throw new Error('Пользователь не найден');
    }
    else {
      const responseOrder = await axiosInstance.get(`/orders?userId=${userId}`)
      return responseOrder.data;
    }
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
};

export const calculateCartTotals = async (userId: string) => {
  try {
    console.log('Calculating cart totals for user:', userId);
    const cartData = await getCart(userId);
    console.log('Cart data:', cartData);
    const { products } = await getProducts(1);
    console.log('Products:', products);
    
    const totals = cartData.reduce((acc: {
      total: number;
      totalWithoutDiscount: number;
      totalDiscount: number;
      itemsCount: number;
    }, item: CartItem) => {
      const product = products.find((p: any) => p.id === item.productId);
      console.log('Processing item:', item, 'Found product:', product);
      if (!product) return acc;
      
      const itemTotal = product.price * item.quantity;
      const itemTotalWithoutDiscount = (product.prevPrice || product.price) * item.quantity;
      const itemDiscount = itemTotalWithoutDiscount - itemTotal;
      
      return {
        total: acc.total + itemTotal,
        totalWithoutDiscount: acc.totalWithoutDiscount + itemTotalWithoutDiscount,
        totalDiscount: acc.totalDiscount + itemDiscount,
        itemsCount: acc.itemsCount + item.quantity
      };
    }, { total: 0, totalWithoutDiscount: 0, totalDiscount: 0, itemsCount: 0 });

    console.log('Calculated totals:', totals);
    return totals;
  } catch (error) {
    console.error('Error calculating cart totals:', error);
    throw error;
  }
};

export const calculateOrderTotals = async (userId: string, promoCode?: string, certificateCode?: string) => {
  try {
    console.log('Calculating order totals for user:', userId, 'promo:', promoCode, 'certificate:', certificateCode);
    const cartTotals = await calculateCartTotals(userId);
    console.log('Cart totals:', cartTotals);
    let finalTotal = cartTotals.total;
    let promoDiscount = 0;
    let certificateDiscount = 0;

    if (promoCode) {
      const promo = await validatePromo(promoCode);
      console.log('Promo validation result:', promo);
      if (promo.valid && promo.code) {
        promoDiscount = Math.round(finalTotal * (promo.discount / 100));
        finalTotal -= promoDiscount;
      }
    }

    if (certificateCode) {
      const certificate = await validateCertificate(certificateCode);
      console.log('Certificate validation result:', certificate);
      if (certificate.valid && certificate.code) {
        certificateDiscount = Math.min(certificate.amount, finalTotal);
        finalTotal -= certificateDiscount;
      }
    }

    const result = {
      ...cartTotals,
      promoDiscount,
      certificateDiscount,
      finalTotal: Math.max(0, finalTotal)
    };
    console.log('Final order totals:', result);
    return result;
  } catch (error) {
    console.error('Error calculating order totals:', error);
    throw error;
  }
}; 