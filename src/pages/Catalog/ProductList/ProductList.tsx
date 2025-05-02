import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store";
import { fetchProducts } from "../../../products/products.slice";
import { Product } from "../Product/Product";

export const ProductList = () => {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.products);
  const filter = useAppSelector((state) => state.filter);

  useEffect(() => {
    const params: any = {};

    // Добавляем параметры цены
    if (filter.priceRange) {
      params.price_gte = filter.priceRange.min;
      params.price_lte = filter.priceRange.max;
    }

    // Добавляем параметры линеек
    if (filter.selectedLines.length > 0) {
      params.lines = filter.selectedLines;
    }

    // Добавляем параметры категорий
    if (filter.selectedCategories.length > 0) {
      params.categories = filter.selectedCategories;
    }

    dispatch(fetchProducts(params));
  }, [dispatch, filter]);

  if (loading === 'pending') {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!items || items.length === 0) {
    return <div>No products found</div>;
  }

  // Фильтруем продукты по тегам и категориям
  const filteredProducts = items.filter(product => {
    // Если нет выбранных линеек и категорий, показываем все продукты
    if (filter.selectedLines.length === 0 && filter.selectedCategories.length === 0) return true;

    // Проверяем теги линеек
    const hasSelectedLine = filter.selectedLines.length === 0 || 
      product.tags.some(tag => filter.selectedLines.includes(tag));

    // Проверяем категории
    const hasSelectedCategory = filter.selectedCategories.length === 0 ||
      product.tags.some(tag => filter.selectedCategories.includes(tag));

    // Продукт должен соответствовать хотя бы одному выбранному фильтру
    return hasSelectedLine && hasSelectedCategory;
  });

  return (
    <div className="product-list">
      <div className="product-list__container">
        {filteredProducts.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}; 