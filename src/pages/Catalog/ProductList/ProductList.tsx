import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../entity/products/products.slice";
import { RootState, AppDispatch } from "../../../main/store/store";
import { Product as ProductComponent } from "../Product/Product";
import type { Product } from "../../../entity/products/types";

export const ProductList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error, pagination } = useSelector((state: RootState) => state.products);
  const filter = useSelector((state: RootState) => state.filter);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  // Формируем параметры для запроса
  const getParams = useCallback((pageNum: number) => {
    const params: any = { 
      page: pageNum, 
      limit,
      price_gte: filter.priceRange?.min,
      price_lte: filter.priceRange?.max
    };
    
    if (filter.selectedTags && filter.selectedTags.length > 0) {
      params.tags = filter.selectedTags;
    }
    
    return params;
  }, [filter, limit]);

  // При изменении фильтра сбрасываем страницу и загружаем заново
  useEffect(() => {
    setCurrentPage(1);
    dispatch(fetchProducts(getParams(1)));
  }, [dispatch, filter, getParams]);

  // Загрузить ещё
  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    dispatch(fetchProducts(getParams(nextPage)));
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
            key={product.id}
            product={product}
          />
        ))}
      </div>
      {pagination.hasMore && (
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