import axios from "axios";
import { API_CLIENT } from "@/shared/consts";
import { FilterParams } from "../productFilter/productFilterTypes";
import { Product, ProductDb } from "./productTypes";
import { getTagsById } from "../tag/tagApi";

const axiosInstance = axios.create(API_CLIENT);

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
}; 

