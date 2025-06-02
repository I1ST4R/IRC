import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../entity/product/slice";
import { RootState, AppDispatch } from "../../../main/store";
import { Product as ProductComponent } from "../Product/Product";
import type { Product } from "../../../entity/product/types";

interface ProductListProps {
  onAuthRequired?: () => void;
}

export const ProductList = ({ onAuthRequired }: ProductListProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { 
    items, 
    loading, 
    error, 
    hasMore,
    currentPage,
    filters } = useSelector((state: RootState) => state.products);
  const filter = useSelector((state: RootState) => state.filter);
  const limit = 10;

  // Формируем параметры для запроса
  const getParams = useCallback((pageNum: number) => {
    const params: any = { 
      page: pageNum, 
      minPrice: filter.priceRange?.min,
      maxPrice: filter.priceRange?.max
    };
    
    if (filter.selectedTags && filter.selectedTags.length > 0) {
      params.tags = filter.selectedTags;
    }
    
    return params;
  }, [filter]);

  // При изменении фильтра сбрасываем страницу и загружаем заново
  useEffect(() => {
    const params = getParams(1);
    console.log('Dispatching with params:', params);
    dispatch(fetchProducts({ page: 1, filters: params }));
  }, [dispatch, filter, getParams]);

  // Загрузить ещё
  const handleLoadMore = () => {
    if (!hasMore || loading === 'pending') return;
    const nextPage = currentPage + 1;
    const params = getParams(nextPage);
    dispatch(fetchProducts({ page: nextPage, filters: params }));
  };

  if (loading === 'pending' && currentPage === 1) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!items || items.length === 0) {
    if (loading === 'pending') {
      return <div>Loading...</div>;
    }
    return <div>No products found</div>;
  }

  return (
    <div className="product-list">
      <div className="product-list__container">
        {items.map((product: Product) => (
          <ProductComponent
            key={`product-${product.id}`}
            product={product}
            onAuthRequired={onAuthRequired}
          />
        ))}
      </div>
      {hasMore && (
        <button 
          className="product-list__load-more" 
          onClick={handleLoadMore} 
          disabled={loading === 'pending'}
        >
          {loading === 'pending' ? 'Загрузка...' : 'Загрузить ещё'}
        </button>
      )}
    </div>
  );
}; 