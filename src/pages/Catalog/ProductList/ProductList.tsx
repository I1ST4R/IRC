import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../entity/products/products.slice";
import { RootState, AppDispatch } from "../../../main/store/store";
import { Product as ProductComponent } from "../Product/Product";
import type { Product } from "../../../entity/products/types";

export const ProductList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector((state: RootState) => state.products);
  const filter = useSelector((state: RootState) => state.filter);

  useEffect(() => {
    const params: any = {};

    // Добавляем параметры цены
    if (filter.priceRange) {
      params.price_gte = filter.priceRange.min;
      params.price_lte = filter.priceRange.max;
    }

    // Добавляем параметры тегов
    if (filter.selectedTags.length > 0) {
      params.tags = filter.selectedTags;
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

  // Фильтруем продукты по тегам
  const filteredProducts = items.filter((product: Product) => {
    // Если нет выбранных тегов, показываем все продукты
    if (filter.selectedTags.length === 0) return true;

    // Проверяем, что продукт содержит хотя бы один выбранный тег
    return filter.selectedTags.some(selectedTag => 
      product.tags.some((productTag: { categoryId: string; tagId: string }) => 
        productTag.categoryId === selectedTag.categoryId && 
        productTag.tagId === selectedTag.tagId
      )
    );
  });

  return (
    <div className="product-list">
      <div className="product-list__container">
        {filteredProducts.map((product: Product) => (
          <ProductComponent key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}; 