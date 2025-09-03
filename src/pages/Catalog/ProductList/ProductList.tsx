import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../_old-version/services/store";
import { Product as ProductComponent } from "../Product/Product";
import type { Product } from "../../../_old-version/entity/product/types";
import { useGetProductsQuery } from "@/entity/product/api";

interface ProductListProps {
  onAuthRequired?: () => void;
}

export const ProductList = ({ onAuthRequired }: ProductListProps) => {
  const filter = useSelector((state: RootState) => state.filter);
  const [page, setPage] = useState(1);
  
  const { data, isLoading, error } = useGetProductsQuery({ 
    page: page, 
    filter: filter.filterParams 
  });

  const products = data?.products || [];
  const hasMore = data?.hasMore || false;

  // Загрузить ещё
  const handleLoadMore = () => {
    if (!hasMore || isLoading) return;
    setPage(prev => prev + 1);
  };

  if (isLoading && page === 1) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Ошибка при загрузке продуктов</div>;
  }

  if (!products || products.length === 0) {
    if (isLoading) {
      return <div>Загрузка...</div>;
    }
    return <div>Продукты по запросу не найдены</div>;
  }

  return (
    <div className="product-list">
      <div className="product-list__container">
        {products.map((product: Product) => (
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
          disabled={isLoading}
        >
          {isLoading ? 'Загрузка...' : 'Загрузить ещё'}
        </button>
      )}
    </div>
  );
}; 