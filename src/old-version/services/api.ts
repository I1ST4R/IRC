import axios from 'axios';
import {FilterParams} from '@/entity/productFilter/types'
import {CartItem, CartItemDb} from '@/entity/cart/types'
import { LikedItemDb } from '@/entity/liked/types'
import { Order, OrderDb, OrderDbAdd, recipientInterface } from '@/entity/order/types';
import { User, LoginData, RegisterData } from '@/entity/users/types';
import { Product, ProductDb } from '@/entity/product/types';
import { Promo } from '@/entity/promo/types';
import { Certificate } from '@/entity/certificate/types';

const API_URL = 'http://localhost:3001';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

const initialUser: User = {
  id: localStorage.getItem('userId'),
  login: null,
  email: null,
  password: null,
  type: null,
  cart: [],
  liked: [],
  orders: []
};

// Auth
export const login = async (data: LoginData) => {
  try {
    const response = await axiosInstance.get<User[]>('/users');
    const users = Object.values(response.data);
    const user = users.find(u => u.login === data.login);

    if (!user) throw new Error('Пользователь не найден');
    
    if (user.password !== data.password) throw new Error('Неверный пароль');
    if( user.id ) localStorage.setItem('userId', user.id)
    return user as User;
  } catch (error: any) {
    console.error('error in login', error);
    throw error;
  }
};

export const logout = async () => {
  localStorage.removeItem('userId');
  return initialUser
}

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

    const userData = { ...data, type: "client" };

    const response = await axiosInstance.post<User>('/users', userData);
    if(response.data.id) localStorage.setItem('userId', response.data.id)
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

export const getUser = async () => {
  const userId = localStorage.getItem("userId")
  if(!userId) return initialUser
  const response = await axiosInstance.get<User[]>(`/users?id=${userId}`);

  if( response.data.length === 0){
    localStorage.removeItem("userId")
    return initialUser
  } 

  return response.data[0]
}

// Product
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

// Category
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
    const updatedItem = updatedCartDb.find((item: CartItemDb) => item.productId === productId);
    if (!updatedItem) throw new Error('Товар не найден в корзине');
    const [cartItem] = await loadCartProducts([updatedItem]);
    return cartItem;
  } catch (error) {
    console.error('error in checkCartItem', error);
    throw error;
  }
};

export const clearCart = async (userId: string) => {
  try {
    const response = await axiosInstance.put(`/users/${userId}/cart`, []);
    return response.data;
  } catch (error: any) {
    console.error('error in clearCart', error);
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

const initialPromo : Promo = {
  id: null,
  valid: false,
  code: null,
  discount: null 
}
export const validatePromo = async (code: string) => {
  try {
    const upperCode = code.toUpperCase();
    
    const response = await axiosInstance.get(`/promo?code=${upperCode}`);
    let promo = initialPromo
    if (response.data && response.data.length > 0 && !response.data[0].used) {
      promo = {
        id: response.data[0].id,
        valid: true, 
        code: response.data[0].code, 
        discount: response.data[0].discount 
      } 
      localStorage.setItem("promoId", promo.id ?? "")
      return promo
    }
    return promo;
  } catch (error: any) {
    console.error('error in validatePromo', error);
    throw error;
  }
};

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

export const getPromo = async () => {
  const promoId = localStorage.getItem("promoId")
  if(!promoId) return initialPromo
  const response = await axiosInstance.get<Promo[]>(`/promo?id=${promoId}`)
  if(response.data.length === 0) {
    localStorage.removeItem("promoId")
    return initialPromo
  }

  return response.data[0]
}

// Certificate

const initialCertificate: Certificate = {
  id: null,
  valid: false,
  code: null,
  amount: null
}
export const validateCertificate = async (code: string) => {
  try {
    const upperCode = code.toUpperCase();
    const response = await axiosInstance.get(`/certificates?code=${upperCode}`);
    let certificate = initialCertificate
    if (response.data && response.data.length > 0 && !response.data[0].used) {
      certificate = {
        id: response.data[0].id,
        valid: true,
        code: response.data[0].code,
        amount: response.data[0].amount
      };
      localStorage.setItem("certificateId", certificate.id ?? "")
      return certificate;
    }
    return certificate;
  } catch (error: any) {
    console.error('error in validateCertificate', error);
    throw error;
  }
};

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

export const getCertificate = async () => {
  const certificateId = localStorage.getItem("certificateId")
  if(!certificateId) return initialCertificate
  const response = await axiosInstance.get<Certificate[]>(`/certificates?id=${certificateId}`)

  if(response.data.length === 0) {
    localStorage.removeItem("certificateId")
    return initialCertificate
  }

  return response.data[0]
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
