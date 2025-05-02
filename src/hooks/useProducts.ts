// hooks/useProducts.ts
import { useState, useEffect, useCallback } from 'react';
import { productApi } from '../services/api';
import { z } from 'zod';

// Определяем тип продукта на основе вашей схемы Zod
const ProductDtoSchema = z.object({
  id: z.string(),
  name: z.string(),
  releaseDate: z.string(),
  price: z.number(),
  prevPrice: z.number(),
  technology: z.string(),
  img: z.string(),
  tags: z.array(z.string())
});

type Product = z.infer<typeof ProductDtoSchema>;

interface UseProductsResult {
  products: Product[];
  loadMore: () => Promise<void>;
  hasMore: boolean;
  loading: boolean;
  error: string | null;
}

export const useProducts = (): UseProductsResult => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = useCallback(async (): Promise<void> => {
    if (!hasMore || loading) return;

    setLoading(true);
    setError(null);

    try {
      const { products: newProducts, hasMore: more } = await productApi.getProducts(page);

      // Валидируем полученные данные
      const validatedProducts = ProductDtoSchema.array().parse(newProducts);

      setProducts(prev => [...prev, ...validatedProducts]);
      setHasMore(more);
      setPage(prev => prev + 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка при загрузке товаров');
    } finally {
      setLoading(false);
    }
  }, [page, hasMore, loading]);

  // Первоначальная загрузка
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return {
    products,
    loadMore: loadProducts,
    hasMore,
    loading,
    error
  };
};