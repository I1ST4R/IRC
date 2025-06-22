import axios from 'axios';
import {FilterParams} from '@/entity/productFilter/types'
import {CartItem, CartItemDb} from '@/entity/cart/types'
import { LikedItemDb } from '@/entity/liked/types'
import { recipientInterface } from '@/entity/order/types';
import { User, LoginData, RegisterData } from '@/entity/users/types';
import { Product, ProductDb } from '@/entity/product/types';

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
    console.error('error in login', error);
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
    console.error('error in register', error);
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
    console.error('error in checkAuth', error);
    throw error;
  }
};

// Products
export const getProducts = async (page: number, filter?: FilterParams) => {
  try {
    const response = await axiosInstance.get('/products');
    let filteredProducts = response.data;

    // Фильтрация по цене
    const priceMin = filter?.priceRange?.min
    const priceMax = filter?.priceRange?.max

    if (priceMin !== undefined) {
      filteredProducts = filteredProducts.filter((product: Product) => product.price >= priceMin);
    }
    if (priceMax !== undefined) {
      filteredProducts = filteredProducts.filter((product: Product) => product.price <= priceMax);
    }
    const allTags = await getTagsById(filter?.tagsId || []);
    const tagsByCategory = allTags.reduce((acc: { [categoryId: string]: string[] }, tag) => {
      if (!acc[tag.categoryId]) acc[tag.categoryId] = [];
      acc[tag.categoryId].push(tag.id);
      return acc;
    }, {});

    // Фильтрация по тегам
    if (filter?.tagsId && filter.tagsId.length > 0) {
      console.log('Filtering by tags:', filter.tagsId);

      filteredProducts = filteredProducts.filter((product : ProductDb) => {
        return Object.entries(tagsByCategory).every(([categoryId, categoryTags]) => {
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
    
    // Загружаем теги для всех продуктов
    const productsWithTags = await getProductsWithTags(paginatedProducts)

    return {
      products: productsWithTags,
      hasMore: hasMore 
    };
  } catch (error: any) {
    console.error('error in getProducts', error);
    throw error;
  }
};


const getProductsWithTags = async (products: ProductDb[]) => {
  try{
    const productsWithTags = await Promise.all(
      products.map(async (product: ProductDb) => {
        const productTags = await getTagsById(product.tags);
        return {
          ...product,
          tags: productTags
        };
      })
    );
    return productsWithTags;
  }catch (error: any) {
    console.error('error in getProductsWithTags', error);
    throw error;
  }
}

export const getProductById = async (productId: string) => {
  try{
    const response = await axiosInstance.get(`/products/${productId}`);
    const productWithTags = await getProductsWithTags([response.data]);
    return productWithTags[0];
  }catch (error: any) {
    console.error('error in getProductById', error);
    throw error;
  }
}; //возвращает продукт с подгруженными тэгами

export const getProductsById = async (productsId: string[]) => {
  return Promise.all(productsId.map(productId => getProductById(productId)));
};  //возвращает продукт с подгруженными тэгами

export const getTagById = async (tagId: string) => {
  try{
    const response = await axiosInstance.get(`/productTags/${tagId}`);
    return response.data;
  } catch (error: any) {
    console.error('error in getTagById', error);
    throw error;
  }
}

export const getTagsById = async (tagsId: string[]) => {
  return Promise.all(tagsId.map(tagId => getTagById(tagId)));
};

// Categories
export const getCategories = async () => {
  try{
    const response = await axiosInstance.get('/productCategories');
    return response.data;
  } catch (error: any) {
    console.error('error in getCategories', error);
    throw error;
  }
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
    const cartItems = await loadCartProducts(user.cart)

    return cartItems;
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
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ productId, quantity: 1, isChecked: true });
    }
    
     await axiosInstance.patch(`/users/${user.id}`, { cart });//меняем количество в бд
    return loadCartProducts(user.cart)// затем подгружаем корзину заново
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
    return updateResponse.data.cart;
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

    
    //меняем количество в бд
    await axiosInstance.patch(`/users/${user.id}`, { cart });
    return loadCartProducts(user.cart);// затем подгружаем корзину заново
  } catch (error: any) {
    console.error('error in updateCartItemQuantity', error);
    throw error;
  }
};

export const calculateCartTotals = async (userId: string) => {
  try {
    const cartData: CartItem[] = await getCart(userId);
    
    let totals = 0
    cartData.forEach((item) => {
      totals += item.quantity
    })
   
    return totals;
  } catch (error: any) {
    console.error('error in calculateCartTotals', error);
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
    await axiosInstance.patch(`/users/${userId}`, { cart: updatedCartDb });
    return loadCartProducts(user.cart);
  } catch (error) {
    console.error('error in checkCartItem', error);
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
    const productIds = user.liked.map((item: LikedItemDb) => item.productId);
    const products = await getProductsById(productIds)
    return products;
  } catch (error: any) {
    console.error('error in getLiked', error);
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
    
    const existingItem = liked.find((item: LikedItemDb) => item.productId === productId);
    if (!existingItem) {
      liked.push({ productId });
    }
    
    const updateResponse = await axiosInstance.patch(`/users/${user.id}`, { liked });
    return updateResponse.data.liked;
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
    return updateResponse.data.liked;
  } catch (error: any) {
    console.error('error in removeFromLiked', error);
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
  } catch (error: any) {
    console.error('error in validatePromo', error);
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
  } catch (error: any) {
    console.error('error in validateCertificate', error);
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
  } catch (error: any) {
    console.error('error in addOrder', error);
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
    console.error('error in getOrder', error);
    throw error;
  }
};

export const getOrders = async () => {
  try {
    const response = await axiosInstance.get(`/orders`)
    return response.data;
  } catch (error: any) {
    console.error('error in getOrders', error);
    throw error;
  }
};

// export const calculateOrderTotals = async (userId: string, promoCode?: string, certificateCode?: string) => {
//   try {
//     const cartTotals = await calculateCartTotals(userId);

//     if (!cartTotals) {
//       throw new Error('error: cartTotals is undefined');
//     }

//     let finalTotal = cartTotals.total;
//     let promoDiscount = 0;
//     let certificateDiscount = 0;

//     if (promoCode) {
//       const promo = await validatePromo(promoCode);
//       if (!promo) {
//         throw new Error('error: promo is undefined');
//       }
//       if (promo.valid && promo.code) {
//         promoDiscount = Math.round(finalTotal * (promo.discount / 100));
//         finalTotal -= promoDiscount;
//       }
//     }

//     if (certificateCode) {
//       const certificate = await validateCertificate(certificateCode);
//       if (!certificate) {
//         throw new Error('error: promo is undefined');
//       }
//       console.log('Certificate validation result:', certificate);
//       if (certificate.valid && certificate.code) {
//         certificateDiscount = Math.min(certificate.amount, finalTotal);
//         finalTotal -= certificateDiscount;
//       }
//     }

//     const result = {
//       ...cartTotals,
//       promoDiscount,
//       certificateDiscount,
//       finalTotal: Math.max(0, finalTotal)
//     };
//     console.log('Final order totals:', result);
//     return result;
//   } catch (error: any) {
//     console.error('error in calculateOrderTotals', error);
//     throw error;
//   }
// }; 