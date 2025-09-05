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




// Promo
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
